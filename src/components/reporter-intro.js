import AboutAuthorIcon from '../static/about-author.svg'
import AboutDonateIcon from '../static/about-donate.svg'
import AboutSubscribeIcon from '../static/about-subscribe.svg'
import BottomLink from './common-utils/bottom-link'
import React from 'react'
import ReporterIcon from '../static/reporter-large.svg'
import styled from 'styled-components'
import SectionName from './common-utils/section-name'
import sectionStrings from '../constants/section-strings'
import appConfig from '../conf/app-config.json'
import { centerBlock, media } from '../utils/style-utils'
import { colors, fonts } from '../styles/common-variables'

const mobileWidth = '730px'

const Section = styled.div`
  position: relative;
  margin: 65px 8px;
  color: ${colors.textGrey};
`

const TopContainer = styled.div`
  max-width: 500px;
  padding: 25px 10px 5px 10px;
  padding-top: 25px;
  ${centerBlock}
  font-size: ${fonts.size.medium};
  ${media.largeMobile`
    padding-left: 10%;
    padding-right: 10%;
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
  ${media.largeMobile`
    flex: 1 100%;
    padding: 10px 14.5%;
  `}
`

const Item = styled.div`
  display: flex;
  flex-direction:column;
  text-align: center;
  width: 33%;
  margin: 10px 0;
  padding: 5px 3.6%;
  ${media.largeMobile`
    width: 100%;
    padding: 20px 20px;
  `}
`

const ItemTitle = styled.h3`
  font-size: ${fonts.size.xlarge};
  font-weight: ${fonts.weight.bold};
  ${media.largeMobile`
    margin: 6px;
  `}
`

const ItemIconContainer = styled.div`
  width: 82px;
  height: 82px;
  margin: 40px auto;
  ${media.largeMobile`
    width: 60px;
    height: 60px;
    order: -1;
    margin: 5px auto;
  `}
`

const ItemDescription = styled.div`
  line-height: 1.5;
  font-size: ${fonts.size.medium};
  ${media.largeMobile`
    flex: 1 100%;
    font-size: ${fonts.size.medium};
    line-height: 1.43;
  `}
  ${media.mobile`
    font-size: ${fonts.size.large};
  `}
`

const ItemLink = styled.a`
  margin: 7px;
  padding: 15px 5px;
`

class ReporterIntro extends React.Component {

  render() {
    return (
      <Section>
        <SectionName
          mobileWidth={mobileWidth}
        >
          <span>{sectionStrings.donation}</span>
        </SectionName>
        <TopContainer>
          <ReporterIconWrapper>
            <ReporterIcon />
          </ReporterIconWrapper>
          <span itemProp="description">{appConfig.intro}</span>
        </TopContainer>
        <FlexContainer>
          <Item>
            <ItemTitle>作者群</ItemTitle>
            <ItemIconContainer><AboutAuthorIcon /></ItemIconContainer>
            <ItemDescription>
              果八現程使無生數我考書天然體朋可話的別想著地面指
            </ItemDescription>
            <ItemLink><BottomLink text="告治共經賽為" /></ItemLink>
          </Item>
          <Item>
            <ItemTitle>訂閱</ItemTitle>
            <ItemIconContainer><AboutSubscribeIcon /></ItemIconContainer>
            <ItemDescription>
              COMING SOON 敬請期待
            </ItemDescription>
          </Item>
          <Item>
            <ItemTitle>贊助我們</ItemTitle>
            <ItemIconContainer><AboutDonateIcon /></ItemIconContainer>
            <ItemDescription>
              果八現程使無生數我考書天然體朋可話的別想著地面指
            </ItemDescription>
            <ItemLink><BottomLink text="無生數我考書" /></ItemLink>
          </Item>
        </FlexContainer>
      </Section>
    )
  }
}

export default ReporterIntro
