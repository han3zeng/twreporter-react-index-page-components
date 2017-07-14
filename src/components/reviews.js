import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import get from 'lodash/get'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import MobileListUtils from './common-utils/mobile-list'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import SectionName from './common-utils/section-name'
import sectionStrings from '../constants/section-strings'
import Section from './common-utils/section'
import TRLink from './common-utils/twreporter-link'
import { fonts, colors } from '../styles/common-variables'
import { getImageSrcSet } from '../utils/image-processor'
import { getHref } from '../utils/getHref'
import { truncate, breakPoints, finalMedia } from '../utils/style-utils'

const _ = {
  get,
}

const tabletMaxWidth = '1023px'
const mobileWidth = breakPoints.mobileMaxWidth
const maxSwipableItems = 3
const moreText = '更多觀點文章'

const Container = Section.extend`
  background-color: white;
  @media(max-width: ${tabletMaxWidth}) {
    padding-top: 36px;
  }
`

const FlexBox = styled.div`
  display: flex;
  padding: 0 47px;
  justify-content: center;
  @media(max-width: ${tabletMaxWidth}) {
    padding: 0 35px;
  }
  @media(max-width: ${mobileWidth}) {
    display: none;
  }
`

const FlexItem = styled.div`
  width: 312px;
  &:nth-child(3) {
    margin-left: 30px;
  }
  &:nth-child(even) {
    margin-left: 30px;
  }
  ${finalMedia.desktop`
    width: 210px;
  `}

  ${finalMedia.tablet`
    width: 160px;
    &:nth-child(3) {
      margin-left: 10px;
    }
    &:nth-child(even) {
      margin-left: 10px;
    }
  `}
  ${finalMedia.mobile`
    margin-top: 10px;
    width: 100%;
  `}
`
const ImgFrame = styled.div`
  width: 100%;
  height: 202px;
  ${finalMedia.desktop`
    height: 138px;
  `}
  ${finalMedia.tablet`
    height: 102px;
  `}
  ${finalMedia.mobile`
    height: 198px;
  `}
`

const TextFrame = styled.div`
  margin: 12px auto 0 auto;
  width: 92%;
`

const Category = CategoryName.extend`
  line-height: 1.33;
  @media(max-width: ${mobileWidth}) {
    margin-top: 9px;
  }
`

const Title = styled.div`
  margin-top: 2px;
  font-size: ${fonts.size.title.base};
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
  ${finalMedia.tablet`
    width: 144px;
  `}
  color: ${colors.textGrey};
`

const Description = styled.div`
  margin-top: 8px;
  font-size: ${fonts.size.medium};
  color: ${colors.textGrey};
  ${finalMedia.tablet`
    width: 144px;
  `}
  ${truncate('relative', 1.5, 3, 'white')}
`

const More = styled.div`
  text-align: center;
  margin-top: 60px;
`

class Reviews extends React.PureComponent {
  render() {
    const { data, moreURI } = this.props
    const ReviewsItem = data.map((post) => {
      const style = _.get(post, 'style', '')
      const href = getHref(_.get(post, 'slug', 'error'), style)
      return (
        <FlexItem
          key={_.get(post, 'id')}
        >
          <TRLink href={href} redirect={style === 'interactive'}>
            <ImgFrame>
              <ImgWrapper
                alt={_.get(post, 'hero_image.description')}
                src={_.get(post, 'hero_image.resized_targets.mobile.url')}
                srcSet={getImageSrcSet(_.get(post, 'hero_image'))}
              />
            </ImgFrame>
          </TRLink>
          <TextFrame>
            <Category>
              {_.get(post, 'subtitle', '')}
            </Category>
            <TRLink href={href} redirect={style === 'interactive'}>
              <Title>
                {_.get(post, 'title', '')}
              </Title>
            </TRLink>
            <Description>
              {_.get(post, 'og_description', '')}
            </Description>
          </TextFrame>
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
          <span>{sectionStrings.review}</span>
        </SectionName>
        <FlexBox>
          {ReviewsItem}
        </FlexBox>
        <MobileListUtils
          maxWidth={mobileWidth}
        >
          <MobileFlexSwipeable.SwipableFlexItems
            alignItems={'flex-start'}
            mobileWidth={mobileWidth}
            maxSwipableItems={maxSwipableItems}
          >
            {ReviewsItem}
          </MobileFlexSwipeable.SwipableFlexItems>
        </MobileListUtils>
        <More>
          <BottomLink
            text={moreText}
            path={moreURI}
          />
        </More>
      </Container>
    )
  }
}

Reviews.defaultProps = {
  data: [],
  moreURI: '/categories/reviews',
}

Reviews.propTypes = {
  data: PropTypes.array,
  moreURI: PropTypes.string,
}

export default Reviews
