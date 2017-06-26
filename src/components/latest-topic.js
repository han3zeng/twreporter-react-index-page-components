import React from 'react'
import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import get from 'lodash/get'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import MobileListUtils from './common-utils/mobile-list'
import PropTypes from 'prop-types'
import strings from '../constants/strings'
import styled from 'styled-components'
import Section from './common-utils/section'
import SectionName from './common-utils/section-name'
import sectionStrings from '../constants/section-strings'
import { connect } from 'react-redux'
import { fonts, colors } from '../styles/common-variables'
import { getImageSrcSet } from '../utils/image-processor'
import { itemWidthPct } from '../constants/mobile-mockup-specification'
import { truncate } from '../utils/style-utils'

const _ = {
  get,
}

const categoryPrefix = strings.topic + strings.fullShapeDot
const moreText = '更多血淚漁場專題文章'
const mobileWidth = '730px'
const tabletWidth = '914px'

const Container = Section.extend`
  width: 100%;
  display: inline-block;
  text-align: center;
`

const TopicFrame = styled.div`
  width: 447px;
  margin: 0 auto;
  @media (max-width: ${mobileWidth}) {
    width: 100%;
  }
`

const Title = styled.div`
  width: 374px;
  font-size: ${fonts.size.title.large};
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.55;
  color: ${colors.textGrey};
  text-align: center;
  margin: 6px auto 0 auto;
  @media (max-width: ${mobileWidth}) {
    font-size: ${fonts.size.title.medium};
    width: ${itemWidthPct}%;
  }
`

const Description = styled.div`
  margin-top: 6px;
  width: 447px;
  font-size: ${fonts.size.large};
  line-height: 1.43;
  text-align: justify;
  color: ${colors.textGrey};
  @media (max-width: ${mobileWidth}) {
    width: ${itemWidthPct}%;
    margin: 6px auto 0 auto;
  }
`

// container for relateds FlexItem
const FlexBox = styled.div`
  margin-top: 48px;
  min-height: 335px;
  padding: 0 45px;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${mobileWidth}) {
    display: none;
  }
`

// container for each related articles
const FlexItem = styled.div`
  min-height: 335px;
  max-width: 290px;
  &:nth-child(2) {
    margin: 0 20px;
  }
  @media (max-width: ${tabletWidth}) {
    max-width: 219px;
  }

  @media (max-width: ${mobileWidth}) {
    max-width: 100%;
  }
`

const MobileList = MobileListUtils.extend`
  margin-top: 30px;
`

const RelatedsContentFrame = styled.div`
  width: 100%;
  height: auto;
  padding: 0 8px 0 8px;
`

const RelatedCategory = CategoryName.extend`
  text-align: left;
  margin: 6px 0;
`

const RelatedTitle = styled.div`
  height: auto;
  font-size: ${fonts.size.medium};
  font-weight: ${fonts.weight.semiBold};
  color: ${colors.textGrey};
  @media (max-width: ${tabletWidth}) {
    width: 100%;
  }
  ${truncate('relative', 1.5, 2, '#f2f2f2')};
`

const RelatedDescription = styled.div`
  margin-top: 6px;
  height: auto;
  font-size: ${fonts.size.base};
  line-height: 20px;
  color: ${colors.textGrey};
  ${truncate('relative', 1.43, 3, '#f2f2f2')};
  @media (max-width: ${tabletWidth}) {
    width: 100%;
  }
`
const MoreFrame = styled.div`
  margin: 60px auto 0 auto;
  @media (max-width: ${mobileWidth}) {
    margin: 40px auto 0 auto;
  }
`

const ImgFrame = styled.div`
  height: 186px;
`

class LatestTopic extends React.PureComponent {
  render() {
    const { data } = this.props
    const maxSwipableItems = 2
    const relateds = _.get(data, 'relateds', []).slice(0, 3).map((post) => {
      return (
        <FlexItem
          key={_.get(post, 'id')}
          mobileWidth={mobileWidth}
        >
          <ImgFrame>
            <ImgWrapper
              alt={_.get(post, 'hero_image.description')}
              src={_.get(post, 'hero_image.resized_targets.mobile.url')}
              srcSet={getImageSrcSet(_.get(post, 'hero_image'))}
            />
          </ImgFrame>
          <RelatedsContentFrame>
            <RelatedCategory>
              {`${categoryPrefix}${_.get(data, 'topic_name', '')}`}
            </RelatedCategory>
            <RelatedTitle>
              {_.get(post, 'title', '')}
            </RelatedTitle>
            <RelatedDescription>
              {_.get(post, 'og_description', '')}
            </RelatedDescription>
          </RelatedsContentFrame>
        </FlexItem>
      )
    })

    return (
      <Container
        mobileWidth={mobileWidth}
      >
        <SectionName
          mobileWidth={mobileWidth}
        >
          <span>{sectionStrings.latestTopic}</span>
        </SectionName>
        <TopicFrame>
          <CategoryName>{`${categoryPrefix}${_.get(data, 'topic_name', '')}`}</CategoryName>
          <Title>{_.get(data, 'title', '')}</Title>
          <Description>{_.get(data, 'og_description', '')}</Description>
        </TopicFrame>
        <FlexBox>
          {relateds}
        </FlexBox>
        <MobileList
          maxWidth={mobileWidth}
        >
          <MobileFlexSwipeable.SwipableFlexItems
            mobileWidth={mobileWidth}
            maxSwipableItems={maxSwipableItems}
          >
            {relateds}
          </MobileFlexSwipeable.SwipableFlexItems>
        </MobileList>
        <MoreFrame>
          <BottomLink
            text={moreText}
          />
        </MoreFrame>
      </Container>
    )
  }
}

LatestTopic.defaultProps = {
  data: {},
}

LatestTopic.propTypes = {
  data: PropTypes.object,
}

export default connect()(LatestTopic)
