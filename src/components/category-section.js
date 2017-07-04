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
import { fonts, colors } from '../styles/common-variables'

const _ = {
  get,
}

const mobileWidth = '730px'
const maxSwipableItems = 7

const Container = styled.div`
  background-color: #e2e2e2;
`

const SectionWrapper = Section.extend`
  background-color: initial;
  padding-bottom: 10px;
`

const FlexBox = styled.div`
  display: flex;
  flex-wrap:wrap;
  width: 690px;
  margin: 0 auto;
  justify-content: center;
  @media (max-width: ${mobileWidth}) {
    display: none;
  }
`

const FlexItem = styled.div`
  width: 210px;
  margin-bottom: 70px;
  &:nth-child(3n+2) {
    margin-right: 30px;
    margin-left: 30px;
  }
  @media (max-width: ${mobileWidth}) {
    width: 100%;
    margin: 0 0 60px 0;
  }
`

const ImgFrame = styled.div`
  height: 138px;
  margin-top: 8px;
  @media (max-width: ${mobileWidth}) {
    height: 198px;
  }
`

const CategoryName = styled.div`
  color: ${colors.textGrey};
  font-weight: ${fonts.weight.medium};
  line-height: 1.4;
  text-align: center;
  font-size: ${fonts.size.title.base};
`

const Title = styled.div`
  font-weight: ${fonts.weight.medium};
  font-size: ${fonts.size.title.base};
  color: ${colors.textGrey};
  line-height: 1.4;
  width: 192px;
  margin: 16px auto 20px auto;
  @media (max-width: ${mobileWidth}) {
    width: 95%;
  }
`

const More = styled.div`
  margin: 16px auto 0 auto;
  text-align: center;
  @media (max-width: ${mobileWidth}) {
    margin-top: 40px;
  }
`

class Category extends React.PureComponent {
  render() {
    const items = this.props.data.map((item) => {
      const href = `/a/${_.get(item, 'slug')}`
      return (
        <FlexItem
          key={_.get(item, 'id')}
        >
          <CategoryName>
            {_.get(item, 'listName')}
          </CategoryName>
          <TRLink href={href}>
            <ImgFrame>
              <ImgWrapper
                alt={_.get(item, 'img.description')}
                src={_.get(item, 'img.src')}
              />
            </ImgFrame>
          </TRLink>
          <TRLink href={href}>
            <Title>
              {_.get(item, 'title')}
            </Title>
          </TRLink>
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
              alignItems={'flex-start'}
              mobileWidth={mobileWidth}
              maxSwipableItems={maxSwipableItems}
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
