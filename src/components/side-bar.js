import PropTypes from 'prop-types'
import React from 'react'
import Waypoint from 'react-waypoint'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import { breakPoints } from '../utils/style-utils'
import { fonts, colors } from '../styles/common-variables'

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
      currentSection: props.curretSection,
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
    const offsetTop = moduleId === this.props.anchorsList[0] ? node.offsetTop + 278 : node.offsetTop
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
    const navBarSections = this.props.anchorsList.map((value) => {
      return (
        <SectionButton
          highlight={value === this.state.currentSection}
          onClick={(e) => { this.scrollTo(value, e) }}
          key={`SectionButton_${value}`}
        >
          {AssembleWord(this.props.moduleLabelObj[value])}
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
  moduleLabelObj: {},
  anchorsList: [],
  curretSection: '',
}

Anchors.propTypes = {
  moduleMap: PropTypes.object,
  moduleLabelObj: PropTypes.object,
  anchorsList: PropTypes.array,
  curretSection: PropTypes.string,
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
    // moduleId list
    this.anchorsList = []
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

    this.props.children.forEach((module) => {
      this.anchorsList.push(module.props.moduleId)
    })
    this.currentSection = this.anchorsList[0]
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
    const webSiteContent = this.props.children.map((singleModule, index) => {
      const { moduleId } = singleModule.props
      return (
        <Waypoint
          key={`Single_Module_${moduleId}`}
          onLeave={() => { this.handleOnLeave(moduleId) }}
          onEnter={() => { this.handleOnEnter(moduleId) }}
          fireOnRapidScroll
          topOffset="4%"
          bottomOffset={(index + 1) === this.props.children.length ? '50%' : '95%'}
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
            curretSection={this.anchorsList[0]}
            moduleMap={this.moduleMap}
            anchorsList={this.anchorsList}
            moduleLabelObj={this.props.moduleLabelObj}
          />
        </Container>
        {webSiteContent}
      </div>
    )
  }
}

SideBar.defaultProps = {
  children: [],
  moduleLabelObj: {},
}

SideBar.propTypes = {
  children: PropTypes.array,
  moduleLabelObj: PropTypes.object,
}

export default SideBar
