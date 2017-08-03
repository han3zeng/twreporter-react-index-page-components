import AboutAuthorIcon from '../static/about-author.svg'
import AboutDonateIcon from '../static/about-donate.svg'
import AboutSubscribeIcon from '../static/about-subscribe.svg'
import BottomLink from './common-utils/bottom-link'
import ReporterIcon from '../static/reporter-large.svg'
import React from 'react'
import styled from 'styled-components'
import SectionName from './common-utils/section-name'
import sectionStrings from '../constants/section-strings'
import Section from './common-utils/section'
import appConfig from '../conf/app-config.json'
import { centerBlock, finalMedia, breakPoints } from '../utils/style-utils'
import { colors, fonts } from '../styles/common-variables'
import { itemPlusPaddingWidthPct } from '../constants/mobile-mockup-specification'

const mobileWidth = breakPoints.mobileMaxWidth
const ContentContainer = Section.extend`
  position: relative;
  color: ${colors.textGrey};
`

const TopContainer = styled.div`
  padding: 0 10px 5px 10px;
  ${centerBlock}
  font-size: ${fonts.size.medium};
  ${finalMedia.mobile`
    padding-left: 5%;
    padding-right: 5%;
  `}
  max-width: 660px;
  @media (max-width: ${breakPoints.desktopMaxWidth}) {
    max-width: 500px;
  }
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
  justify-content: space-around;
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
    // the outtest div is for animation scroll fadein
    // the fadein animation will manipulate the padding value of the outtest div,
    // by this manner, animation will not influence the layout of the module content
    return (
      <div>
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
            </Item>
          </FlexContainer>
        </ContentContainer>
      </div>
    )
  }
}

export default ReporterIntro
