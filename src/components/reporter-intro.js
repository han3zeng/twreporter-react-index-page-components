import AboutAuthorIcon from '../static/about-author.svg'
import AboutDonateIcon from '../static/about-donate.svg'
import AboutSubscribeIcon from '../static/about-subscribe.svg'
import BottomLink from './common-utils/bottom-link'
import ReporterIcon from '../static/reporter-large.svg'
import React from 'react'
import SectionAnimationWrapper from './animations/section-animation-wrapper'
import SectionName from './common-utils/section-name'
import Section from './common-utils/section'
import appConfig from '../conf/app-config.json'
import sectionStrings from '../constants/section-strings'
import styled from 'styled-components'
import { centerBlock, finalMedia, breakPoints } from '../utils/style-utils'
import { colors, fonts } from '../styles/common-variables'
import { itemPlusPaddingWidthPct } from '../constants/mobile-mockup-specification'

const mobileWidth = breakPoints.mobileMaxWidth
const ContentContainer = Section.extend`
  position: relative;
  color: ${colors.textGrey};
  max-width: ${breakPoints.desktopMinWidth}
`

const TopContainer = styled.div`
  padding: 0 10px 100px 10px;
  ${centerBlock}
  font-size: ${fonts.size.medium};
  ${finalMedia.mobile`
    padding-left: 5%;
    padding-right: 5%;
  `}
  max-width: 500px;
  ${finalMedia.mobile`
    max-width: ${itemPlusPaddingWidthPct}%;
  `}
`

const ReporterIconWrapper = styled.div`
  ${centerBlock}
  margin-bottom: 30px;
  width: 38px;
`

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  padding: 0 4%;
  margin-top: 15px;
  ${finalMedia.mobile`
    flex: 1 100%;
    padding: 10px 9.5%;
  `}
`

const Item = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: space-around;
  text-align: center;
  width: 33%;
  margin: 10px 0;
  padding: 5px 3.6%;
  ${finalMedia.mobile`
    width: 100%;
    padding: 20px 20px;
  `}
`

const ItemTitle = styled.h3`
  font-size: ${fonts.size.xlarge};
  font-weight: ${fonts.weight.bold};
  ${finalMedia.mobile`
    margin: 6px;
  `}
  color: ${colors.textGrey};
`

const ItemIconContainer = styled.div`
  width: 82px;
  height: 82px;
  margin: 40px auto;
  ${finalMedia.mobile`
    width: 60px;
    height: 60px;
    order: -1;
    margin: 5px auto;
  `}
`

const ItemDescription = styled.div`
  line-height: 1.5;
  font-size: ${fonts.size.medium};
  ${finalMedia.mobile`
    flex: 1 100%;
    font-size: ${fonts.size.medium};
    line-height: 1.43;
    font-size: ${fonts.size.large};
  `}
`

const ItemLink = styled.div`
  margin: 7px;
  padding: 15px 5px;
`

class ReporterIntro extends React.PureComponent {
  render() {
    const authorHref = 'authors'
    const donationHref = 'https://twreporter.backme.tw/cashflow/checkout?project_id=175&reward_id=718'
    return (
      <ContentContainer
        mobileWidth={mobileWidth}
      >
        <SectionName
          mobileWidth={mobileWidth}
        >
          <span>{sectionStrings.donation}</span>
        </SectionName>
        <TopContainer>
          <ReporterIconWrapper>
            <ReporterIcon />
          </ReporterIconWrapper>
          <span itemProp="description">{appConfig.description}</span>
        </TopContainer>
        <FlexContainer>
          <Item>
            <ItemTitle>作者群</ItemTitle>
            <ItemIconContainer><AboutAuthorIcon /></ItemIconContainer>
            <ItemDescription>
              透過報導認識報導者們
            </ItemDescription>
            <ItemLink><BottomLink text="前往作者群" path={authorHref} /></ItemLink>
          </Item>
          <Item>
            <ItemTitle>贊助我們</ItemTitle>
            <ItemIconContainer>
              <AboutDonateIcon />
            </ItemIconContainer>
            <ItemDescription>
              您的支持，將成為《報導者》繼續追蹤真相的動力！
            </ItemDescription>
            <ItemLink><BottomLink text="前往贊助夥伴" path={donationHref} redirect target={'_blank'} /></ItemLink>
          </Item>
          <Item>
            <ItemTitle>訂閱</ItemTitle>
            <ItemIconContainer><AboutSubscribeIcon /></ItemIconContainer>
            <ItemDescription>
              即將推出  敬請期待
            </ItemDescription>
            <ItemLink />
          </Item>
        </FlexContainer>
      </ContentContainer>
    )
  }
}

export default SectionAnimationWrapper(ReporterIntro)
