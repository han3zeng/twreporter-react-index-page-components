// import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import PropTypes from 'prop-types'
import React from 'react'
import SectionName from './common-utils/section-name'
import TRLink from './common-utils/twreporter-link'
import Waypoint from 'react-waypoint'
import categoryStrings from '../constants/category-strings'
import get from 'lodash/get'
import sectionStrings from '../constants/section-strings'
import styled from 'styled-components'
import { fonts } from '../styles/common-variables'
import { getImageSrcSet } from '../utils/image-processor'

const _ = {
  get,
}

// If window is less than oneColumnWidth,
// there will be only one column. Default is two columns.
const oneColumnWidth = 700
const tabletWidth = 928
const desktopMinWidth = 1445

const Section = styled.div`
  position: relative;
  background-color: ${(props) => { return props.isAutoHover ? '#fff' : '#08192d' }};
  padding-bottom: ${(props) => { return props.isAutoHover ? '40px' : '80px' }};
  padding-top: 100px;

  @media (max-width: ${oneColumnWidth}px) {
    padding-top: 0px;
  }
`

const Listing = styled.ul`
  padding-left: 0px;
  max-width: 1344px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 60px;

  @media (max-width: ${desktopMinWidth}px) {
    max-width: 928px;
  }

  @media (max-width: ${tabletWidth}px) {
    max-width: 700px;
  }

  @media (max-width: ${oneColumnWidth}px) {
    padding-top: 0px;
    padding-bottom: 40px;
    max-width: 100%;
  }
`

const Item = styled.li`
  max-width: 672px;
  display: inline-block;
  vertical-align: bottom;

  @media (max-width: ${desktopMinWidth}px) {
    max-width: 464px;
  }

  @media (max-width: ${tabletWidth}px) {
    max-width: 349px;
  }

  @media (max-width: ${oneColumnWidth}px) {
    max-width: 100%;
    width: 100%;
    height: 100%;
    display: block;
  }
`
const Title = styled.div`
  position: absolute;
  color: #fff;
  font-size: ${fonts.size.title.base};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.5;
  text-align: justify;
  font-weight: ${fonts.weight.medium};
`

const Img = styled.div`
  position: relative;
  width: 672px;
  height: 450px;

  @media (max-width: ${desktopMinWidth}px) {
    width: 464px;
    height: 310px;
  }

  @media (max-width: ${tabletWidth}px) {
    margin: 0 auto;
    width: 350px;
    height: 234px;
  }

  @media (max-width: ${oneColumnWidth}px) {
    width: 100%;
    height: 100%;
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: ${(props) => {
    return props.isHover ? 1 : 0
  }};
  transition: .5s ease;
  background-color: rgba(21, 54, 84, 0.7);

  @media (min-width: ${oneColumnWidth}px) {
    &:hover {
      opacity: 1;
    }
  }
`

  /*
const More = styled.div`
  text-align: center;
`
*/

class Photography extends React.PureComponent {
  render() {
    const { title, imgObj, isHover, slug } = this.props
    const href = `a/${slug}`
    return (
      <Item>
        <TRLink href={href}>
          <Img>
            <ImgWrapper
              alt={_.get(imgObj, 'description')}
              src={_.get(imgObj, 'resized_targets.mobile.url')}
              srcSet={getImageSrcSet(imgObj)}
            >
              <Overlay
                isHover={isHover}
              >
                <Title>
                  <CategoryName>
                    {categoryStrings.photography}
                  </CategoryName>
                  {title}
                </Title>
              </Overlay>
            </ImgWrapper>
          </Img>
        </TRLink>
      </Item>
    )
  }
}

Photography.defaultProps = {
  title: '',
  imgObj: {},
  isHover: false,
  slug: '',
}

Photography.propTypes = {
  title: PropTypes.string,
  imgObj: PropTypes.object,
  isHover: PropTypes.bool,
  slug: PropTypes.string,
}

class PhotographySection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eleTouchViewportTop: -1,
      // when the width size is less than oneColumnWidth,
      // we assume the device is mobile,
      // so enable auto hovering.
      isAutoHover: false,
    }

    this.itemsToShow = 4
    this.onLeave = this._onElementTouchViewportTop.bind(this, -1)
    this.onEnters = []
    this.onEnter = this._onElementTouchViewportTop.bind(this)
  }

  componentDidMount() {
    // fetch the posts in advance
    this._checkViewportWidth()

    let resizeTimeout
    function resizeThrottler() {
      const _checkViewportWidth = this._checkViewportWidth.bind(this)
      // ignore resize events as long as an actualResizeHandler execution is in the queue
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null
          _checkViewportWidth()
          // The _checkViewportWidth will execute at a rate of 15fps
        }, 500)
      }
    }

    // add resize event listener
    window.addEventListener('resize', resizeThrottler.bind(this), false)
  }

  _checkViewportWidth() {
    const innerW = _.get(window, 'innerWidth', oneColumnWidth)
    this.setState({
      isAutoHover: innerW < oneColumnWidth,
    })
  }

  _onElementTouchViewportTop(index) {
    if (this.state.isAutoHover) {
      this.setState({
        eleTouchViewportTop: index,
      })
    }
  }

  render() {
    const { items } = this.props
    const { eleTouchViewportTop, isAutoHover } = this.state

    const postComps = items.slice(0, this.itemsToShow).map((item, index) => {
      const imgObj = _.get(item, 'hero_image') || _.get(item, 'og_image')
      let isHover = false
      if (isAutoHover) {
        isHover = eleTouchViewportTop === index
      }
      return (
        <Waypoint
          key={_.get(item, 'id')}
          onEnter={() => { this.onEnter(index) }}
          topOffset="8%"
          bottomOffset="90%"
        >
          <span>
            <Photography
              title={_.get(item, 'title')}
              imgObj={imgObj}
              isHover={isHover}
              slug={_.get(item, 'slug')}
            />
          </span>
        </Waypoint>
      )
    }, this)

    return (
      <Waypoint
        key={'section_check_point'}
        onLeave={this.onLeave}
      >
        <div>
          <Section
            isAutoHover={isAutoHover}
          >
            <SectionName
              mobileWidth={`${oneColumnWidth}px`}
            >
              <span>{sectionStrings.photography}</span>
            </SectionName>
            <Listing>
              {postComps}
            </Listing>
            {/* <More><BottomLink text="更多影像新聞" isDarkBg path="photography" /></More>*/}
          </Section>
        </div>
      </Waypoint>
    )
  }
}

PhotographySection.defaultProps = {
  items: [],
}

PhotographySection.propTypes = {
  items: PropTypes.array,
}

export default PhotographySection
