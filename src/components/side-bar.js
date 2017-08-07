import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import Waypoint from 'react-waypoint'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import { breakPoints } from '../utils/style-utils'
import { fonts, colors } from '../styles/common-variables'

const _ = {
  get,
}

const ifSafari = () => {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('safari')) {
    if (ua.includes('chrome')) {
      return false
    }
    return true
  }
  return false
}

// right: calc((100% - 1024px)/2 + 1px);
const Container = styled.div`
  font-size: ${fonts.size.base};
  position: fixed;
  color: ${colors.primaryColor};
  z-index: 2;
  right: ${props => (props.isSafari ? '30px' : '10px')};
  top: 93px;
  @media (max-width: 1050px) {
    right: ${props => (props.isSafari ? '21px' : '1px')};
  }
  @media (max-width: ${breakPoints.mobileMaxWidth}) {
    display: none;
  }
`

// writing-mode: vertical-rl;
// letter-spacing: 2px;
const SectionButton = styled.div`
  margin-bottom: 18px;
  padding-top: 2px;
  padding-bottom: 2px;
  &:hover {
    cursor: pointer;
  }
  color: ${props => (props.highlight ? 'white' : `${colors.primaryColor}`)};
  background: ${props => (props.highlight ? `${colors.primaryColor}` : 'none')};
`

const SingleWord = styled.div`
  display: block;
  margin: 2px 3px;
  padding: 0;
  font-weight: 500;
  line-height: 14px;
`

class Anchors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSection: this.props.IdLabelList[0].id,
    }
    this.changeHighlight = this._changeHighlight.bind(this)
    this.scrollTo = this._scrollTo.bind(this)
  }

  _changeHighlight(currentSection) {
    this.setState({
      currentSection,
    })
  }

  _scrollTo(moduleId, e) {
    e.preventDefault()
    const node = this.props.moduleMap[moduleId]
    const offsetTop = moduleId === this.props.IdLabelList[0].id ? node.offsetTop + 278 : node.offsetTop
    if (node) {
      return smoothScroll(offsetTop)
    }
    return null
  }

  render() {
    const AssembleWord = (words) => {
      return words.split('').map((word) => {
        return (
          <SingleWord key={`single_word_${word}`}>
            {word}
          </SingleWord>
        )
      })
    }
    const navBarSections = this.props.IdLabelList.map((idLabelObj, index) => {
      const moduleId = _.get(idLabelObj, 'id', `module_${index}`)
      const moduleLabel = _.get(idLabelObj, 'label', `moduleLabel_${index}`)
      return (
        <SectionButton
          highlight={moduleId === this.state.currentSection}
          onClick={(e) => { this.scrollTo(moduleId, e) }}
          key={`SectionButton_${moduleId}`}
        >
          {AssembleWord(moduleLabel)}
        </SectionButton>
      )
    })
    return (
      <div>
        { navBarSections }
      </div>
    )
  }
}

Anchors.defaultProps = {
  moduleMap: {},
  IdLabelList: [],
}

Anchors.propTypes = {
  moduleMap: PropTypes.object,
  IdLabelList: PropTypes.array,
}

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSafari: false,
    }
    this.handleOnEnter = this._handleOnEnter.bind(this)
    this.handleOnLeave = this._handleOnLeave.bind(this)
    // moduleId to Module
    this.moduleMap = {}
    this.currentSection = ''
    this.previousSection = ''
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      if (ifSafari()) {
        this.setState({
          isSafari: true,
        })
      }
    }
  }

  componentWillUnmount() {
    this.moduleMap = {}
  }

  _handleOnEnter(nextSection) {
    this.anchorsNode.changeHighlight(nextSection)
    this.previousSection = this.currentSection
    this.currentSection = nextSection
  }

  _handleOnLeave(onLeaveSection) {
    if (onLeaveSection === this.currentSection) {
      this.currentSection = this.previousSection
      this.anchorsNode.changeHighlight(this.previousSection)
      this.previousSection = onLeaveSection
    }
  }

  render() {
    const { children } = this.props
    let modules = children
    const IdLabelList = []
    if (children && !Array.isArray(children)) {
      modules = [children]
    }
    if (this.currentSection === '') {
      this.currentSection = _.get(modules[0], 'props.moduleId', 'module_01')
    }
    const webSiteContent = modules.map((singleModule, index) => {
      const moduleId = _.get(singleModule, 'props.moduleId', `module_${index}`)
      const moduleLabel = _.get(singleModule, 'props.moduleLabel', `moduleLabel_${index}`)
      IdLabelList.push({
        id: moduleId,
        label: moduleLabel,
      })
      return (
        <Waypoint
          key={`Single_Module_${moduleId}`}
          onLeave={() => { this.handleOnLeave(moduleId) }}
          onEnter={() => { this.handleOnEnter(moduleId) }}
          fireOnRapidScroll
          topOffset="4%"
          bottomOffset={(index + 1) === modules.length ? '50%' : '95%'}
        >
          <div
            id={moduleId}
            ref={(node) => { this.moduleMap[moduleId] = node }}
          >
            {singleModule}
          </div>
        </Waypoint>
      )
    })

    return (
      <div>
        <Container
          isSafari={this.state.isSafari}
        >
          <Anchors
            ref={(node) => { this.anchorsNode = node }}
            moduleMap={this.moduleMap}
            IdLabelList={IdLabelList}
          />
        </Container>
        {webSiteContent}
      </div>
    )
  }
}

SideBar.defaultProps = {
  children: [],
}

SideBar.propTypes = {
  children: PropTypes.array,
}

export default SideBar
