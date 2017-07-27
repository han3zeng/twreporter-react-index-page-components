import CategoryName from './common-utils/category-name'
import ContentWrapper from './common-utils/section-content-wrapper'
import EditorPicksMobile from './editor-picks-mobile'
import FadeInFadeOut from './animations/fadein-fadeout'
import get from 'lodash/get'
import ImgWrapper from './common-utils/img-wrapper'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import TRLink from './common-utils/twreporter-link'
import { VelocityComponent } from 'velocity-react'
import { fonts, colors } from '../styles/common-variables'
import { getImageSrcSet } from '../utils/image-processor'
import { getHref } from '../utils/getHref'
import { truncate, breakPoints, finalMedia } from '../utils/style-utils'

const OVER_DESKTOP = 'OVERDESKTOP'
const BELOW_DESKTOP = 'BELOWDESKTOP'

const getScreenObj = () => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth <= 1439) {
      return {
        marginTop: '-540px',
        screenType: BELOW_DESKTOP,
      }
    }
  }
  return {
    marginTop: '-770px',
    screenType: OVER_DESKTOP,
  }
}

const _ = {
  get,
}

const CarouselContainer = ContentWrapper.extend`
  position: relative;
  @media (max-width: ${breakPoints.mobileMaxWidth}) {
    display: none;
  }
`

const FlexContainer = styled.div`
  position: relative;
  display: flex;
  height: 932px;
  align-items: center;
  @media (max-width: ${breakPoints.desktopMaxWidth}) {
    height: 702px;
  }
`

// FlexItem is for moving Title
// transform: ${props => (props.selected !== 0 ? `translateX(-${(props.selected - 1) * (200)}%)` : 'translateX(200%)')};
// transition: 500ms transform linear, 500ms margin-top linear;
// margin-top: ${props => (props.middle ? '-770px' : '16px')};
// @media (max-width: ${breakPoints.desktopMaxWidth}) {
//   margin-top: ${props => (props.middle ? '-540px' : '16px')};
// }
// transition: 500ms margin-top ease-in;
const FlexItem = styled.div`
  flex: 0 0 20%;
  margin-right: 20%;
  position: relative;
  cursor: pointer;
`

const ImgFrame = styled.div`
  cursor: pointer;
  position: absolute;
  width: 886px;
  height: 570px;
  left: 50%;
  top: 236px;
  transform: translateX(-50%);
  ${finalMedia.desktop`
    width: 608px;
    height: 391px;
  `}
  ${finalMedia.tablet`
    width: 459.2px;
    height: 295px;
  `}
`

const SideCategory = CategoryName.extend`
  text-align: center;
  height: 16px;
  line-height: 1.33;
  position: absolute;
  width: auto;
  transform: translateX(-50%);
  text-align: center;
  width: 161px;
  height: 16px;
  top: 453px;
  left: ${props => (props.left ? props.left : '0')};
  @media (max-width: ${breakPoints.desktopMaxWidth}) {
    top: 338px;
  }
`

const MiddleCategory = CategoryName.extend`
  text-align: center;
  height: 16px;
  line-height: 1.33;
  position: absolute;
  top: ${props => (props.top ? props.top : '0')};
  left: ${props => (props.left ? props.left : '0')};
  width: auto;
  transform: translateX(-50%);
  text-align: center;
  width: 161px;
  height: 16px;
`

const Title = styled.div`
  font-size: ${props => (props.middle ? `${fonts.size.title.large}` : `${fonts.size.medium}`)};
  font-weight: ${fonts.weight.semiBold};
  color: ${colors.textGrey};
  width: ${props => (props.middle ? '450px' : '150px')};
  position: absolute;
  text-align: center;
  line-height: ${props => (props.middle ? '1.25' : '1.25')};
  max-height: ${props => (props.middle ? '2.5' : '7.5')};
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  @media (max-width: ${breakPoints.tabletMaxWidth}) {
    width: ${props => (props.middle ? '450px' : '100px')};
  }
`
const Description = styled.div`
  position: absolute;
  font-size: ${fonts.size.medium};
  width: 450px;
  top: ${props => (props.top ? props.top : '0')};
  left: ${props => (props.left ? props.left : '0')};
  color: ${colors.textGrey};
  transform: translateX(-50%);
  ${truncate('absolute', 1.43, 2, 'white')};
  @media (min-width: ${breakPoints.tabletMinWidth}) {
    ${props => (props.ifHover ? 'opacity: 0.7' : '')};
  }
  z-index: 2;
`

const HoverEffect = styled.div`
  cursor: pointer;
  text-decoration: none;
  color: ${colors.textGrey};
  @media (min-width: ${breakPoints.tabletMinWidth}) {
    ${props => (props.ifHover ? 'opacity: 0.7' : 'opacity: 1')};
  }
`

// this is a container
class EditorPicks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 1,
      ifHover: false,
      marginTop: getScreenObj().marginTop,
    }
    this.onShiftToLeft = this._onShiftToLeft.bind(this)
    this.onShiftToRight = this._onShiftToRight.bind(this)
    this.handleOnMouseEnter = this._handleOnMouseEnter.bind(this)
    this.handleOnMouseLeave = this._handleOnMouseLeave.bind(this)
    this.handleOnResize = this._handleOnResize.bind(this)
    this.prescreenType = getScreenObj().screenType
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleOnResize, false)
  }

  _handleOnResize() {
    if (this.prescreenType !== getScreenObj().screenType) {
      this.setState({
        marginTop: getScreenObj().marginTop,
      })
      this.prescreenType = getScreenObj().screenType
    }
  }

  _onShiftToLeft() {
    if (this.state.selected + 1 < this.props.data.length) {
      this.setState({
        selected: this.state.selected + 1,
      })
    }
  }

  _onShiftToRight() {
    if (this.state.selected > 0) {
      this.setState({
        selected: this.state.selected - 1,
      })
    }
  }

  _handleOnMouseEnter() {
    this.setState({
      ifHover: true,
    })
  }

  _handleOnMouseLeave() {
    this.setState({
      ifHover: false,
    })
  }

  render() {
    const { data } = this.props
    const getTruncate = (title) => {
      if (title.length > 28) {
        return `${title.slice(0, 26)}...`
      }
      return title
    }
    const FlexItems = (() => {
      return data.map((obj, i) => {
        const style = _.get(obj, 'style', '')
        const href = getHref(_.get(obj, 'slug', 'error'), style)
        const propsMap = {
          middle: false,
          onClick: () => {},
        }
        if (i === this.state.selected - 1) {
          propsMap.onClick = this.onShiftToRight
        } else if (i === this.state.selected) {
          propsMap.middle = true
          propsMap.onClick = () => {}
        } else if (i === this.state.selected + 1) {
          propsMap.onClick = this.onShiftToLeft
        }
        return (
          <VelocityComponent
            key={`key_${obj.title}`}
            animation={{
              translateX: this.state.selected !== 0 ? `-${(this.state.selected - 1) * (200)}%` : '200%',
              marginTop: propsMap.middle ? `${this.state.marginTop}` : '16px',
            }}
            duration={500}
            runOnMount={false}
            easing="ease-in"
          >
            <FlexItem
              middle={propsMap.middle}
              selected={this.state.selected}
              onClick={() => { propsMap.onClick(`a/${_.get(obj, 'slug', 'error')}`) }}
            >
              { i === this.state.selected ?
                <TRLink href={href} redirect={style === 'interactive'} plain>
                  <HoverEffect ifHover={this.state.ifHover}>
                    <Title
                      middle={propsMap.middle}
                      onMouseOver={this.handleOnMouseEnter}
                      onMouseLeave={this.handleOnMouseLeave}
                    >
                      <div>{ propsMap.middle ? getTruncate(obj.title) : obj.title }</div>
                    </Title>
                  </HoverEffect>
                </TRLink>
              :
                <Title middle={propsMap.middle}>
                  <div>{ propsMap.middle ? getTruncate(obj.title) : obj.title }</div>
                </Title>
              }
            </FlexItem>
          </VelocityComponent>
        )
      })
    })()

    const Types = (() => {
      // type: left, middle, right. description: middle
      const propList = [
        {
          position: 'left',
          component: SideCategory,
          propsForComponent: { top: null, left: '10%' },
          dataPath: 'categories[0].name',
        },
        {
          position: 'middle',
          component: MiddleCategory,
          propsForComponent: { top: '60px', left: '50%' },
          dataPath: 'categories[0].name',
        },
        {
          position: 'right',
          middle: false,
          component: SideCategory,
          propsForComponent: { top: null, left: '90%' },
          dataPath: 'categories[0].name',
        },
        {
          position: 'middle',
          component: Description,
          propsForComponent: { top: '171px', left: '50%' },
          dataPath: 'og_description',
        },
      ]

      return propList.map((theProp) => {
        return data.map((post, index) => {
          const style = _.get(post, 'style', '')
          const href = getHref(_.get(post, 'slug', 'error'), style)
          const currentData = _.get(post, theProp.dataPath, '')
          const selectDataToShow = {
            left: this.state.selected - 1,
            middle: this.state.selected,
            right: this.state.selected + 1,
          }
          return (
            <FadeInFadeOut
              key={_.get(post, 'id')}
              isSelected={index === selectDataToShow[theProp.position]}
            >
              { theProp.dataPath === 'og_description' ?
                <TRLink href={href} redirect={style === 'interactive'} plain>
                  <theProp.component
                    ifHover={this.state.ifHover}
                    top={theProp.propsForComponent.top}
                    left={theProp.propsForComponent.left}
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                  >
                    {currentData}
                  </theProp.component>
                </TRLink>
                :
                <theProp.component
                  top={theProp.propsForComponent.top}
                  left={theProp.propsForComponent.left}
                >
                  {currentData}
                </theProp.component>
              }
            </FadeInFadeOut>
          )
        })
      })
    })()

    const Images = data.map((post, index) => {
      const { hero_image } = post
      const style = _.get(post, 'style', '')
      const href = getHref(_.get(post, 'slug', 'error'), style)
      return (
        <FadeInFadeOut
          key={_.get(post, 'hero_image.id')}
          isSelected={index === this.state.selected}
        >
          <TRLink href={href} redirect={style === 'interactive'} plain>
            <HoverEffect ifHover={this.state.ifHover}>
              <ImgFrame
                onMouseEnter={this.handleOnMouseEnter}
                onMouseLeave={this.handleOnMouseLeave}
              >
                <ImgWrapper
                  alt={_.get(hero_image, 'description')}
                  src={_.get(hero_image, 'resized_targets.tiny.url')}
                  srcSet={getImageSrcSet(hero_image)}
                />
              </ImgFrame>
            </HoverEffect>
          </TRLink>
        </FadeInFadeOut>
      )
    })

    return (
      <div>
        <CarouselContainer>
          <FlexContainer>
            {Types}
            {Images}
            {FlexItems}
          </FlexContainer>
        </CarouselContainer>
        <EditorPicksMobile data={this.props.data} />
      </div>
    )
  }
}

EditorPicks.defaultProps = {
  data: [],
}

EditorPicks.propTypes = {
  data: PropTypes.array,
}

export default EditorPicks
