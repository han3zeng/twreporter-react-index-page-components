import React from 'react'
import CategoryName from './common-utils/category-name'
import FadeInFadeOut from './animations/fadein-fadeout'
import get from 'lodash/get'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import PropTypes from 'prop-types'
import Swipeable from 'react-swipeable'
import SwipableMixin from './common-utils/swipable-mixin'
import styled from 'styled-components'
import Section from './common-utils/section'
import SectionName from './common-utils/section-name'
import sectionStrings from '../constants/section-strings'
import { fonts, colors } from '../styles/common-variables'
import { getImageSrcSet } from '../utils/image-processor'
import { itemWidthPct } from '../constants/mobile-mockup-specification'
import { truncate } from '../utils/style-utils'

const _ = {
  get,
}

const numberOfSwipableItems = 5
const mobileWidth = '721px'

const CarouselContainer = Section.extend`
  padding-top: 0;
  background: ${colors.sectionWhite};
  @media (min-width: ${mobileWidth}) {
    display: none;
  }
`

const TextFrame = styled.div`
  height: 230px;
  position: relative;
`

const Category = styled(CategoryName)`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 74px;
  text-align: center;
`

const Title = styled.div`
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: ${itemWidthPct}%;
  font-size: ${fonts.size.title.medium};
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.33;
  color: ${colors.textGrey};
  ${truncate('absolute', 1.33, 3, `${colors.sectionWhite}`, 'center')}
`

const Description = styled.div`
  top: 150px;
  left: 50%;
  font-size: ${fonts.size.base};
  transform: translateX(-50%);
  width: ${itemWidthPct}%;
  text-align: left;
  color: ${colors.textGrey};
  ${truncate('absolute', 1.43, 3, 'white')}
`

const ImgFrame = styled.div`
  height: 186px;
`

class EditorPicksMobile extends SwipableMixin {
  componentWillMount() {
    this.onSetMaxItems(numberOfSwipableItems)
  }

  render() {
    const onSwiping = (e, deltaX, deltaY, absX, absY) => {
      // In order to avoid slightly vibrating while swiping left and right,
      // we set a threshold to prevent scrolling.
      // 10 is the the threshold value we set after manually testing.
      if (absY < 10) {
        e.preventDefault()
      }
    }

    const ImageComp = (post) => {
      const { hero_image } = post
      return (
        <ImgFrame>
          <ImgWrapper
            alt={_.get(hero_image, 'description')}
            src={_.get(hero_image, 'resized_targets.mobile.url')}
            srcSet={getImageSrcSet(hero_image)}
          />
        </ImgFrame>
      )
    }

    const { data } = this.props
    const flexItems = data.map((post) => {
      return (
        <MobileFlexSwipeable.FlexItem
          key={_.get(post, 'id')}
          mobileWidth={mobileWidth}
        >
          {ImageComp(post)}
        </MobileFlexSwipeable.FlexItem>
      )
    })

    const textFrameContent = data.map((post, index) => {
      return (
        <FadeInFadeOut
          key={_.get(post, 'id')}
          isSelected={index === this.state.selected}
        >
          <Category>{_.get(post, 'categories[0].name', '')}</Category>
          <Title>{_.get(post, 'title', '')}</Title>
          <Description>{_.get(post, 'og_description', '')}</Description>
        </FadeInFadeOut>
      )
    })

    return (
      <CarouselContainer
        mobileWidth={mobileWidth}
      >
        <SectionName
          mobileWidth={mobileWidth}
        >
          <span>{sectionStrings.editorPick}</span>
        </SectionName>
        <TextFrame>
          {textFrameContent}
        </TextFrame>
        <Swipeable
          onSwipedRight={this.onSwipedRight}
          onSwipedLeft={this.onSwipedLeft}
          onSwiping={onSwiping}
        >
          <MobileFlexSwipeable.FlexList
            selected={this.state.selected}
            mobileWidth={mobileWidth}
          >
            {flexItems}
          </MobileFlexSwipeable.FlexList>
        </Swipeable>
      </CarouselContainer>
    )
  }
}

EditorPicksMobile.defaultProps = {
  data: [],
}

EditorPicksMobile.propTypes = {
  data: PropTypes.array,
}

export default EditorPicksMobile
