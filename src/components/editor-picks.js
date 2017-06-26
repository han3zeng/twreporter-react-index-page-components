import React from 'react'
import CategoryName from './common-utils/category-name'
import EditorPicksMobile from './editor-picks-mobile'
import FadeInFadeOut from './animations/fadein-fadeout'
import get from 'lodash/get'
import ImgWrapper from './common-utils/img-wrapper'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fonts, colors } from '../styles/common-variables'
import { getImageSrcSet } from '../utils/image-processor'
import { truncate } from '../utils/style-utils'

const _ = {
  get,
}

const CarouselContainer = styled.div`
  height: auto;
  position: relative;
  @media (max-width: 720px) {
    display: none;
  }
`

const FlexContainer = styled.div`
  position: relative;
  display: flex;
  height: 702px;
  align-items: center;
`

// FlexItem is for moving Title
const FlexItem = styled.div`
  flex: 0 0 20%;
  margin-right: 20%;
  margin-top: ${props => (props.middle ? '-530px' : '16px')};
  transform: ${props => (props.selected !== 0 ? `translateX(-${(props.selected - 1) * (200)}%)` : 'translateX(200%)')};
  transition: 500ms all linear;
  position: relative;
  cursor: pointer;
`

const ImgFrame = styled.div`
  position: absolute;
  width: 608px;
  height: 391px;
  left: 50%;
  top: 32%;
  transform: translateX(-50%);
  @media (max-width: 970px) {
    width: 459.2px;
    height: 295px;
  }
`

const Category = styled(CategoryName)`
  text-align: center;
  height: 16px;
  line-height: 16px;
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
  line-height: ${props => (props.middle ? '1.25em' : '1.5em')};
  max-height: ${props => (props.middle ? '2.5em' : '7.5em')};
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  @media (max-width: 970px) {
    width: ${props => (props.middle ? '450px' : '100px')};
  }
`
const Description = styled.div`
  font-size: ${fonts.size.base};
  width: 450px;
  top: ${props => (props.top ? props.top : '0')};
  left: ${props => (props.left ? props.left : '0')};
  color: ${colors.textGrey};
  transform: translateX(-50%);
  overflow: hidden;
  ${truncate('absolute', 1.43, 2, 'white')};
`

// this is a container
class EditorPicks extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: 1,
    }
    this.onShiftToLeft = this._onShiftToLeft.bind(this)
    this.onShiftToRight = this._onShiftToRight.bind(this)
    // this.redirectToPage = this._redirectToPage.bind(this)
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

    /*
  _redirectToPage() {

  }
  */

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
        const propsMap = {
          middle: false,
          onClick: () => {},
          arrow: 'pre',
        }
        if (i === this.state.selected - 1) {
          propsMap.onClick = this.onShiftToRight
        } else if (i === this.state.selected) {
          propsMap.middle = true
          // propsMap.onClick = this.redirectToPage
          propsMap.onClick = () => {}
        } else if (i === this.state.selected + 1) {
          propsMap.onClick = this.onShiftToLeft
          propsMap.arrow = 'nex'
        }
        return (
          <FlexItem
            middle={propsMap.middle}
            selected={this.state.selected}
            onClick={propsMap.onClick}
            key={`key_${obj.title}`}
          >
            <Title middle={propsMap.middle}>
              <div>{ propsMap.middle ? getTruncate(obj.title) : obj.title }</div>
            </Title>
          </FlexItem>
        )
      })
    })()

    const Types = (() => {
      // type: left, middle, right. description: middle
      const propList = [
        {
          position: 'left',
          component: Category,
          propsForComponent: { top: '338px', left: '10%' },
          dataPath: 'categories[0].name',
        },
        {
          position: 'middle',
          component: Category,
          propsForComponent: { top: '60px', left: '50%' },
          dataPath: 'categories[0].name',
        },
        {
          position: 'right',
          middle: false,
          component: Category,
          propsForComponent: { top: '338px', left: '90%' },
          dataPath: 'categories[0].name',
        },
        {
          position: 'middle',
          component: Description,
          propsForComponent: { top: '174px', left: '50%' },
          dataPath: 'og_description',
        },
      ]

      return propList.map((theProp) => {
        return data.map((post, index) => {
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
              <theProp.component
                top={theProp.propsForComponent.top}
                left={theProp.propsForComponent.left}
              >
                {currentData}
              </theProp.component>
            </FadeInFadeOut>
          )
        })
      })
    })()

    const Images = data.map((post, index) => {
      const { hero_image } = post
      return (
        <FadeInFadeOut
          key={_.get(post, 'hero_image.id')}
          isSelected={index === this.state.selected}
        >
          <ImgFrame>
            <ImgWrapper
              alt={_.get(hero_image, 'description')}
              src={_.get(hero_image, 'resized_targets.tablet.url')}
              srcSet={getImageSrcSet(hero_image)}
            />
          </ImgFrame>
        </FadeInFadeOut>
      )
    })

    return (
      <div>
        <CarouselContainer>
          {Types}
          <FlexContainer>
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
