import PropTypes from 'prop-types'
import React from 'react'
import Waypoint from 'react-waypoint'
import sectionStrings from '../constants/section-strings'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import { fonts, colors } from '../styles/common-variables'

const anchorsList = []
const moduleIdObj = {}
for (const key in sectionStrings) {
  if (Object.prototype.hasOwnProperty.call(sectionStrings, key)) {
    anchorsList.push(key)
    moduleIdObj[key] = key
  }
}

// right: calc((100% - 1024px)/2 + 1px);
const Container = styled.div`
  font-size: ${fonts.size.base};
  position: fixed;
  color: ${colors.primaryColor};
  z-index: 2;
  right: 10px;
  margin-top: 93px;
  @media (max-width: 1038px) {
    right: 1px;
  }
  @media (max-width: 730px) {
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
const SectoinAnchor = styled.a`
  text-decoration: none;
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
    if (node) {
      return smoothScroll(node.offsetTop)
    }
    return null
  }

  render() {
    const navBarSections = anchorsList.map((value) => {
      return (
        <SectoinAnchor
          href={`#${value}`}
          key={`SectionButton_${value}`}
          onClick={(e) => { this.scrollTo(value, e) }}
        >
          <SectionButton
            highlight={value === this.state.currentSection}
          >
            {sectionStrings[value]}
          </SectionButton>
        </SectoinAnchor>
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
    this.handleOnEnter = this._handleOnEnter.bind(this)
    this.handleOnLeave = this._handleOnLeave.bind(this)
    this.moduleMap = {}
    this.currentSection = ''
    this.previousSection = ''
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
              {singleModule}
            </div>
          </Waypoint>
        )
      }
      return <span key={`${moduleId}`} />
    })

    return (
      <div>
        <Container>
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
