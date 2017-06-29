import React from 'react'
import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import MobileListBase from './common-utils/mobile-list'
import PropTypes from 'prop-types'
import Section from './common-utils/section'
import SectionName from './common-utils/section-name'
import fieldNames from '../constants/redux-state-fields'
import get from 'lodash/get'
import sectionStrings from '../constants/section-strings'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { fonts } from '../styles/common-variables'
import { getImageSrcSet } from '../utils/image-processor'
import { truncate } from '../utils/style-utils'

const _ = {
  get,
}

// If window is less than oneColumnWidth,
// there will be only one column. Default is three columns.
const oneColumnWidth = '700px'
const tabletWidth = '929px'

const UpperList = styled.div`
  list-style-type: none;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: ${oneColumnWidth}) {
    display: none;
  }
`

const LowerList = UpperList.extend`
  align-items: flex-end;

  @media (max-width: ${tabletWidth}) and (min-width: ${oneColumnWidth}) {
    margin-top: -130px;
    margin-bottom: 51px;
  }

  @media (min-width: ${tabletWidth}) {
    margin-top: -170px;
    margin-bottom: 59px;
  }
`

const MobileList = MobileListBase.extend`
  margin-bottom: 39px;
`

const Item = styled.div`
  max-width: 290px;
  &:first-child {
    margin-right: 30px;
  }

  &:last-child {
    margin-left: 30px;
  }
  @media (max-width: ${tabletWidth}) {
    max-width: 220px;
    &:first-child {
      margin-right: 20px;
    }

    &:last-child {
      margin-left: 20px;
    }
  }

  @media (max-width: ${oneColumnWidth}) {
    max-width: 100%;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`
const WordBlock = styled.div`
  background-color: #fff;
  width: 300px;
  min-height: 115px;
  padding: 8px 20px 15px 12px;

  @media (max-width: ${tabletWidth}) {
    margin: 0 auto;
    width: 220px;
  }

  @media (max-width: ${oneColumnWidth}) {
    width: 100%;
    height: 100%;
  }
`

const Title = styled.h3`
  margin: 0;
  font-weight: ${fonts.weight.medium};
  font-size: ${fonts.size.title.base};
  color: #4a4a4a;
  @media (min-width: ${tabletWidth}) {
    ${truncate('relative', 1.4, 2, '#fff')};
  }

  @media (max-width: ${tabletWidth}) and (min-width: ${oneColumnWidth}) {
    font-size: 16px;
    ${truncate('relative', 1.4, 3, '#fff')};
  }
`

const ImgFrame = styled.div`
  position: relative;
  cursor: pointer;
  width: 300px;
  height: ${(props) => { return props.isPortrait ? '390px' : '190px' }};

  @media (max-width: ${tabletWidth}) {
    margin: 0 auto;
    width: 220px;
    height: ${(props) => { return props.isPortrait ? '290px' : '145px' }};
  }

  @media (max-width: ${oneColumnWidth}) {
    width: 100%;
    height: 186px;
  }
`

const More = styled.div`
  text-align: center;
`

class Infographic extends React.PureComponent {
  render() {
    const { title, imgObj, isPortrait } = this.props

    return (
      <Item>
        <ImgFrame
          isPortrait={isPortrait}
        >
          <ImgWrapper
            alt={_.get(imgObj, 'description')}
            src={_.get(imgObj, 'resized_targets.mobile.url')}
            srcSet={getImageSrcSet(imgObj)}
          />
        </ImgFrame>
        <WordBlock>
          <CategoryName>{sectionStrings.infographic}</CategoryName>
          <Title>{title}</Title>
        </WordBlock>
      </Item>
    )
  }
}

Infographic.defaultProps = {
  title: '',
  imgObj: {},
  isPortrait: false,
}

Infographic.propTypes = {
  title: PropTypes.string,
  imgObj: PropTypes.object,
  isPortrait: PropTypes.bool,
}

class InfographicSection extends React.PureComponent {
  render() {
    const { items } = this.props
    const listNumber = 3

    const postComps = items.slice(0, 6).map((item, index) => {
      return (
        <Infographic
          key={_.get(item, 'id')}
          category={_.get(item, 'categories.[0].name')}
          imgObj={_.get(item, 'hero_image')}
          title={_.get(item, 'title')}
          isPortrait={index === 0 || index === 4 || index === 5}
        />
      )
    })

    return (
      <Section
        mobileWidth={oneColumnWidth}
      >
        <SectionName
          mobileWidth={oneColumnWidth}
        >
          <span>{sectionStrings.infographic}</span>
        </SectionName>
        <UpperList>
          {postComps.slice(0, listNumber)}
        </UpperList>
        <LowerList>
          {postComps.slice(listNumber, listNumber * 2)}
        </LowerList>
        <MobileList
          maxWidth={oneColumnWidth}
        >
          <MobileFlexSwipeable.SwipableFlexItems
            mobileWidth={oneColumnWidth}
            maxSwipableItems={5}
            alignItems="flex-start"
          >
            {postComps}
          </MobileFlexSwipeable.SwipableFlexItems>
        </MobileList>
        <More><BottomLink text="更多多媒體新聞" isDarkBg /></More>
      </Section>
    )
  }
}

InfographicSection.defaultProps = {
  items: [],
}

InfographicSection.propTypes = {
  items: PropTypes.array,
}

export default InfographicSection
