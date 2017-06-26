import React from 'react'
import PropTypes from 'prop-types'
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

const Container = styled.div`
  font-size: ${fonts.size.base};
  position: fixed;
  right: calc((100% - 1024px)/2 + 1px);
  color: ${colors.primaryColor};
  z-index: 2;
  margin-top: 104px;
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
  margin-bottom: 15px;
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

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSection: '',
      previousSection: '',
    }
    this.handleOnEnter = this._handleOnEnter.bind(this)
    this.handleOnLeave = this._handleOnLeave.bind(this)
    this.moduleMap = {}
    this.scrollTo = this._scrollTo.bind(this)
  }

  componentWillUnmount() {
    this.moduleMap = {}
  }

  _handleOnEnter(nextSection) {
    const { currentSection } = this.state
    this.setState({
      currentSection: nextSection,
      previousSection: currentSection,
    })
  }

  _handleOnLeave(onLeaveSection) {
    const { currentSection, previousSection } = this.state
    if (onLeaveSection === currentSection) {
      this.setState({
        currentSection: previousSection,
        previousSection: onLeaveSection,
      })
    }
  }

  _scrollTo(moduleId) {
    const node = this.moduleMap[moduleId]
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
          onClick={() => { this.scrollTo(value) }}
        >
          <SectionButton
            highlight={value === this.state.currentSection}
          >
            {sectionStrings[value]}
          </SectionButton>
        </SectoinAnchor>
      )
    })
    const webSiteContent = this.props.children.map((singleModule, index) => {
      const { moduleId } = singleModule.props
      if (anchorsList.includes(moduleId)) {
        return (
          <Waypoint
            key={`Single_Module_${moduleId}`}
            onLeave={() => { this.handleOnLeave(moduleId) }}
            onEnter={(obj) => { this.handleOnEnter(moduleId, obj.previousPosition) }}
            fireOnRapidScroll
            topOffset="4%"
            bottomOffset={(index + 1) === this.props.children.length ? '50%' : '95%'}
          >
            <div
              id={moduleId}
              ref={(input) => { this.moduleMap[moduleId] = input }}
            >
              {singleModule}
            </div>
          </Waypoint>
        )
      }
      return <span />
    })

    return (
      <div>
        <Container>
          {navBarSections}
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
