import ContentWrapper from './common-utils/section-content-wrapper'
import LogoDesktop from '../static/logo-desktop.svg'
import LogoMobile from '../static/logo-mobile.svg'
import React from 'react'
import styled from 'styled-components'
import SearchBox from './search-box'
import TRLink from './common-utils/twreporter-link'
import { breakPoints, finalMedia } from '../utils/style-utils'

export const headerPadding = {
  desktop: '47px',
  tablet: '34px',
  mobile: '16px',
}

const mobileWidth = breakPoints.mobileMaxWidth

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

class Header extends React.PureComponent {
  render() {
    return (
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
    )
  }
}

export default Header
