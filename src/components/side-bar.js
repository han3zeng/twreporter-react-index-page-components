import { Link } from 'react-router'
import PropTypes from 'prop-types'
import React from 'react'
import Waypoint from 'react-waypoint'
import sectionStrings from '../constants/section-strings'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import { fonts, colors } from '../styles/common-variables'
import { breakPoints } from '../utils/style-utils'

let isScrolling = false
const switchScrollState = () => {
  isScrolling = !isScrolling
}

const anchorsList = []
const moduleIdObj = {}
for (const key in sectionStrings) {
  if (Object.prototype.hasOwnProperty.call(sectionStrings, key)) {
    anchorsList.push(key)
    moduleIdObj[key] = key
  }
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

const SectionButton = styled.div`
  writing-mode: vertical-rl;
  letter-spacing: 2px;
  margin-bottom: 18px;
  padding: 3px 0;
  font-weight: 500;
  &:hover {
    cursor: pointer;
  }
  color: ${props => (props.highlight ? 'white' : `${colors.primaryColor}`)};
  background: ${props => (props.highlight ? `${colors.primaryColor}` : 'none')};
`

class Anchors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSection: props.curretSection,
    }
    this.changeHighlight = this._changeHighlight.bind(this)
    this.scrollTo = this._scrollTo.bind(this)
    this.enterScroll = this._enterScroll.bind(this)
  }

  _changeHighlight(currentSection) {
    this.setState({
      currentSection,
    })
    this.enterScroll(currentSection)
  }

  _enterScroll(moduleId) {
    const node = this.props.moduleMap[moduleId]
    const offsetTop = moduleId === 'editorPick' ? node.offsetTop + this.props.headerSectionHeight : node.offsetTop
    if (!isScrolling) {
      smoothScroll(offsetTop)
    }
  }

  _scrollTo(moduleId, e) {
    if (e) {
      e.preventDefault()
    }
    const node = this.props.moduleMap[moduleId]
    const offsetTop = moduleId === 'editorPick' ? node.offsetTop + this.props.headerSectionHeight : node.offsetTop
    switchScrollState()
    if (node) {
      return smoothScroll(offsetTop, undefined, switchScrollState)
    }
    return null
  }

  render() {
    const navBarSections = anchorsList.map((value) => {
      return (
        <Link
          to={`/#${value}`}
          key={`SectionButton_${value}`}
          onClick={(e) => { this.scrollTo(value, e) }}
        >
          <SectionButton
            highlight={value === this.state.currentSection}
          >
            {sectionStrings[value]}
          </SectionButton>
        </Link>
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
  curretSection: '',
  headerSectionHeight: 278,
}

Anchors.propTypes = {
  moduleMap: PropTypes.object,
  curretSection: PropTypes.string,
  headerSectionHeight: PropTypes.number,
}

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSafari: false,
    }
    this.handleOnEnter = this._handleOnEnter.bind(this)
    this.handleOnLeave = this._handleOnLeave.bind(this)
    this.handleOnEnterAuto = this._handleOnEnterAuto.bind(this)
    this.headerSectionHeight = 278
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
  componentDidMount() {
    this.headerSectionHeight = document.getElementById('headerSectionHeight').offsetHeight
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

  _handleOnEnterAuto(moduleId) {
    this.anchorsNode.changeHighlight(moduleId)
  }

  render() {
    const webSiteContent = this.props.children.map((singleModule, index) => {
      const { moduleId } = singleModule.props
      if (anchorsList.includes(moduleId)) {
        return (
          <Waypoint
            key={`Single_Module_${moduleId}`}
            onLeave={() => {}}
            onEnter={() => { this.handleOnEnterAuto(moduleId) }}
            fireOnRapidScroll
            topOffset="50%"
            bottomOffset={(index + 1) === this.props.children.length ? '19%' : '40%'}
          >
            <div
              id={moduleId}
              ref={(node) => { this.moduleMap[moduleId] = node }}
            >
              {singleModule}
            </div>
          </Waypoint>
        )
      }
      return <span key={`${moduleId}`} />
    })

    return (
      <div>
        <Container
          isSafari={this.state.isSafari}
        >
          <Anchors
            ref={(node) => { this.anchorsNode = node }}
            curretSection={anchorsList[0]}
            moduleMap={this.moduleMap}
            headerSectionHeight={this.headerSectionHeight}
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
export { moduleIdObj }
