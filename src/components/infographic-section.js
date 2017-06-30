import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import MobileListBase from './common-utils/mobile-list'
import PropTypes from 'prop-types'
import React from 'react'
import Section from './common-utils/section'
import SectionName from './common-utils/section-name'
import TRLink from './common-utils/twreporter-link'
import get from 'lodash/get'
import sectionStrings from '../constants/section-strings'
import styled from 'styled-components'
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
const desktopWidth = '1445px'

const Container = styled.div`
  background-color: #f2f2f2;
`

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

  @media (min-width: ${desktopWidth}) {
    margin-top: -282px;
  }

`

const MobileList = MobileListBase.extend`
  margin-bottom: 39px;
`

const Item = styled.div`
  max-width: 430px;
  transition: 300ms all linear;
  &:first-child {
    margin-right: 30px;
  }

  &:last-child {
    margin-left: 30px;
  }

  @media( max-width: ${desktopWidth}) {
    max-width: 290px;
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

  @media (min-width: ${oneColumnWidth}) {
    &:hover {
      box-shadow: 10px 10px 15px grey;
    }
  }
`
const WordBlock = styled.div`
  background-color: #fff;
  width: 430px;
  min-height: 115px;
  padding: 8px 20px 15px 12px;

  @media( max-width: ${desktopWidth}) {
    max-width: 290px;
  }

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
  width: 430px;
  height: ${(props) => { return props.isPortrait ? '596px' : '282px' }};

  @media( max-width: ${desktopWidth}) {
    max-width: 290px;
    height: ${(props) => { return props.isPortrait ? '390px' : '190px' }};
  }

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
    const { title, imgObj, isPortrait, slug } = this.props
    const href = `i/${slug}`
    return (
      <Item>
        <TRLink href={href} noTxtDec >
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
        </TRLink>
      </Item>
    )
  }
}

Infographic.defaultProps = {
  title: '',
  imgObj: {},
  isPortrait: false,
  slug: '',
}

Infographic.propTypes = {
  title: PropTypes.string,
  imgObj: PropTypes.object,
  isPortrait: PropTypes.bool,
  slug: PropTypes.string,
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
          slug={_.get(item, 'slug')}
        />
      )
    })

    return (
      <Container>
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
      </Container>
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
