import React from 'react'
import styled from 'styled-components'
import SearchBox from './search-box'
import TRLink from './common-utils/twreporter-link'
import { headerPadding } from '../styles/common-variables'
import ContentWrapper from './common-utils/section-content-wrapper'

const LogoPath = '../static/logo-desk.png'
const mobileLogoPath = '../static/logo-mobile.svg'
const tabletWidth = '916px'
const mobileWidth = '550px'

const ContentContainer = ContentWrapper.extend`
  height: 62px;
  padding: 0 ${headerPadding.desktop} 0 ${headerPadding.desktop};
  @media (max-width: ${tabletWidth}) {
    padding: 0 ${headerPadding.tablet} 0 ${headerPadding.tablet};
  }
  @media (max-width: ${mobileWidth}) {
    padding: 0 ${headerPadding.mobile} 0 ${headerPadding.mobile};
  }
`

const LogoFrame = styled.div`
  height: 62px;
  display: flex;
  align-items: center;
  float: left;
`

const Logo = styled.div`
  width: 220px;
  height: 40px;
  background-image: url(${LogoPath});
  background-size: contain;
  @media (max-width: ${mobileWidth}) {
    background-image: url(${mobileLogoPath});
    background-size: contain;
    width: 119px;
    border: none;
  }
  &:hover {
    cursor: pointer;
  }
`

const Header = () => {
  return (
    <ContentContainer>
      <LogoFrame>
        <TRLink href={'/'}>
          <Logo />
        </TRLink>
      </LogoFrame>
      <SearchBox />
    </ContentContainer>
  )
}

export default Header
