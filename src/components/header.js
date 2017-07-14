import ContentWrapper from './common-utils/section-content-wrapper'
import LogoDesktop from '../static/logo-desktop.svg'
import LogoMobile from '../static/logo-mobile.svg'
import React from 'react'
import styled from 'styled-components'
import SearchBox from './search-box'
import TRLink from './common-utils/twreporter-link'
// import Waypoint from 'react-waypoint'
import { headerPadding } from '../styles/common-variables'
import { breakPoints, finalMedia } from '../utils/style-utils'

const mobileWidth = breakPoints.mobileMaxWidth

const Container = styled.div`
  width: 100%;
  background-color: white;
  ${(props) => {
    if (props.ifPinned) {
      return `
        position: absolute;
        bottom: 0;
      `
    }
    return `
      position: fixed;
      top: 0;
    `
  }};
  z-index: 2;
`

const ContentContainer = ContentWrapper.extend`
  height: 62px;
  padding: 0 ${headerPadding.desktop} 0 ${headerPadding.desktop};

  ${finalMedia.tablet`
    padding: 0 ${headerPadding.tablet} 0 ${headerPadding.tablet};
  `}

  ${finalMedia.mobile`
    padding: 0 ${headerPadding.mobile} 0 ${headerPadding.mobile};
  `}
`

const LogoFrame = styled.div`
  height: 62px;
  display: flex;
  align-items: center;
  float: left;
`

const LogoDesktopContainer = styled.div`
  width: 220px;
  cursor: pointer;
  @media (max-width: ${mobileWidth}) {
    display: none;
  }
`

const LogoMobileContainer = styled.div`
  display: none;
  @media (max-width: ${mobileWidth}) {
    display: inline;
    width: 119px;
  }
`

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ifPinned: false,
    }
    this.headerSectionHeight = 278
    this.handleScroll = this._handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.headerSectionHeight = document.getElementById('headerSectionHeight').offsetHeight
  }

  _handleScroll(e) {
    if (e.srcElement.body.scrollTop >= this.headerSectionHeight) {
      this.setState({
        ifPinned: true,
      })
    } else {
      this.setState({
        ifPinned: false,
      })
    }
  }

  render() {
    return (
      <Container ifPinned={this.state.ifPinned}>
        <ContentContainer>
          <LogoFrame>
            <TRLink href={''}>
              <LogoDesktopContainer>
                <LogoDesktop width="220px" />
              </LogoDesktopContainer>
              <LogoMobileContainer>
                <LogoMobile width="119px" />
              </LogoMobileContainer>
            </TRLink>
          </LogoFrame>
          <SearchBox />
        </ContentContainer>
      </Container>
    )
  }
}

export default Header
