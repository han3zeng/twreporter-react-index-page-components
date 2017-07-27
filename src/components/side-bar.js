import PropTypes from 'prop-types'
import React from 'react'
import Waypoint from 'react-waypoint'
import sectionStrings from '../constants/section-strings'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import ScrollFadein from './animations/scroll-fadein'
import { breakPoints } from '../utils/style-utils'
import { fonts, colors } from '../styles/common-variables'
import { Link } from 'react-router'

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
    const offsetTop = moduleId === anchorsList[0] ? node.offsetTop + 278 : node.offsetTop
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
            {AssembleWord(sectionStrings[value])}
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
}

Anchors.propTypes = {
  moduleMap: PropTypes.object,
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
    this.handleOnFadeIn = this._handleOnFadeIn.bind(this)
    this.moduleMap = {}
    this.fadeInSectionMap = {}
    this.currentSection = anchorsList[0]
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
    this.fadeInSectionMap = {}
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

  _handleOnFadeIn(upComingSection) {
    if (upComingSection !== anchorsList[0]) {
      this.fadeInSectionMap[upComingSection].startAnimation()
    }
  }

  render() {
    const webSiteContent = this.props.children.map((singleModule, index) => {
      const { moduleId } = singleModule.props
      if (anchorsList.includes(moduleId)) {
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
              <Waypoint
                onEnter={() => { this.handleOnFadeIn(moduleId) }}
                fireOnRapidScroll
                topOffset="80%"
                bottomOffset="19%"
              >
                { moduleId === anchorsList[0] ?
                  <div>
                    {singleModule}
                  </div>
                  :
                  <div>
                    <ScrollFadein
                      ref={(node) => { this.fadeInSectionMap[moduleId] = node }}
                      moduleId={moduleId}
                    >
                      {singleModule}
                    </ScrollFadein>
                  </div>
                }
              </Waypoint>
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
