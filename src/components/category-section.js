/* eslint-disable no-param-reassign */
import BottomLink from './common-utils/bottom-link'
import get from 'lodash/get'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import MobileListUtils from './common-utils/mobile-list'
import PropTypes from 'prop-types'
import React from 'react'
import Section from './common-utils/section'
import styled from 'styled-components'
import SectionName from './common-utils/section-name'
import sectionStrings from '../constants/section-strings'
import TRLink from './common-utils/twreporter-link'
import { breakPoints, finalMedia } from '../utils/style-utils'
import { getHref } from '../utils/getHref'
import { fonts, colors } from '../styles/common-variables'

const _ = {
  get,
}

// const desktopWidth = '1440px'
// const tabletWidth = '1024px'
const mobileWidth = breakPoints.mobileMaxWidth
const maxSwipableItems = 7
const backgroundColor = '#e2e2e2'

const Container = styled.div`
  background-color: ${backgroundColor};
`

const SectionWrapper = Section.extend`
  background-color: initial;
  padding-bottom: 10px;
`

const FlexBox = styled.div`
  display: flex;
  flex-wrap:wrap;
  width: 1002px;
  margin: 0 auto;
  justify-content: center;
  ${finalMedia.desktop`
    width: 690px;
  `}
  ${finalMedia.tablet`
    width: 690px;
  `}
  ${finalMedia.mobile`
    display: none;
  `}
`

const FlexItem = styled.div`
  background-color: white;
  position: relative;
  margin-bottom: 70px;
  padding-bottom: 20px;
  width: 314px;
  &:nth-child(3n+2) {
    margin-right: 30px;
    margin-left: 30px;
  }
  ${finalMedia.desktop`
    width: 210px;
  `}
  ${finalMedia.tablet`
    width: 210px;
  `}
  ${finalMedia.mobile`
    width: 100%;
    margin: 0 0 24px 0;
  `}
`

const ImgFrame = styled.div`
  height: 202px;
  ${finalMedia.desktop`
    height: 138px;
  `}
  ${finalMedia.tablet`
    height: 138px;
  `}
  ${finalMedia.mobile`
    height: 198px;
  `}
`

const CategoryName = styled.div`
  background-color: ${backgroundColor};
  width: 100%;
  color: ${colors.textGrey};
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.4;
  text-align: center;
  font-size: ${fonts.size.title.base};
  padding-bottom: 8px;
`

const TextFrame = styled.div`
  background: white;
  padding: 16px 0 20px 0;
  min-height: 94px;
`

const Title = styled.div`
  font-weight: ${fonts.weight.semiBold};
  font-size: ${fonts.size.title.base};
  color: ${colors.textGrey};
  line-height: 1.4;
  width: 92%;
  margin: 0 auto;
  @media (max-width: ${mobileWidth}) {
    width: 95%;
  }
`

const More = styled.div`
  position: absolute;
  left: 50%;
  bottom: -16px;
  padding-top: 16px;
  transform: translateX(-50%);
  text-align: center;
  width: 100%;
  background-color: ${backgroundColor};
  @media (max-width: ${mobileWidth}) {
    bottom: -24px;
  }
`

class Category extends React.PureComponent {
  render() {
    const items = this.props.data.map((item) => {
      const style = _.get(item, 'style', '')
      const href = getHref(_.get(item, 'slug', 'error'), style)
      return (
        <FlexItem
          key={_.get(item, 'id')}
        >
          <CategoryName>
            {_.get(item, 'listName')}
          </CategoryName>
          <TRLink href={href} redirect={style === 'interactive'}>
            <ImgFrame>
              <ImgWrapper
                alt={_.get(item, 'img.description')}
                src={_.get(item, 'img.src')}
              />
            </ImgFrame>
          </TRLink>
          <TextFrame>
            <TRLink href={href} redirect={style === 'interactive'}>
              <Title>
                {_.get(item, 'title')}
              </Title>
            </TRLink>
          </TextFrame>
          <More>
            <BottomLink
              text={`更多${_.get(item, 'listName')}`}
              path={_.get(item, 'moreURL')}
            />
          </More>
        </FlexItem>
      )
    })

    return (
      <Container>
        <SectionWrapper
          mobileWidth={mobileWidth}
        >
          <SectionName
            mobileWidth={mobileWidth}
          >
            <span>{sectionStrings.category}</span>
          </SectionName>
          <FlexBox>
            {items}
          </FlexBox>
          <MobileListUtils
            maxWidth={mobileWidth}
          >
            <MobileFlexSwipeable.SwipableFlexItems
              alignItems={'stretch'}
              mobileWidth={mobileWidth}
              maxSwipableItems={maxSwipableItems}
              categorySection
            >
              {items}
            </MobileFlexSwipeable.SwipableFlexItems>
          </MobileListUtils>
        </SectionWrapper>
      </Container>
    )
  }
}

Category.defaultProps = {
  data: [],
}

Category.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    img: PropTypes.shape({
      src: PropTypes.string,
      description: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
    listName: PropTypes.string.isRequired,
    moreURL: PropTypes.string.isRequired,
  })),
}

export default Category
