import CategoryName from './common-utils/category-name'
import get from 'lodash/get'
import Header, { headerPadding } from './header'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import ContentWrapper from './common-utils/section-content-wrapper'
import TRLink from './common-utils/twreporter-link'
import { fonts } from '../styles/common-variables'
import { getHref } from '../utils/getHref'
import { truncate, breakPoints, finalMedia } from '../utils/style-utils'


const _ = {
  get,
}

const mobileMaxWidth = '600px'
const mobileMidWidth = '550px'
const mobileMinWidth = '414px'

const Container = styled.div`
  padding-top: 62px;
  background-color: #f2f2f2;
  position: relative;
`

const ContentContainer = ContentWrapper.extend`
  display: flex;
  padding: 30px ${headerPadding.desktop};
  overflow-x: hidden;
  justify-content: space-between;
  ${finalMedia.tablet`
    padding: 30px ${headerPadding.tablet};
  `}
  ${finalMedia.mobile`
    padding: 30px ${headerPadding.mobile};
  `}
`
const ItemFrame = styled.div`
  width: 200px;
  padding: 0;
  margin-left: 30px;
  &:first-child {
    margin: 0;
  }
  @media (max-width: ${breakPoints.tabletMaxWidth}) {
    width: 189px;
    margin-left: 20px;
    &:nth-child(6) {
      display: none;
    }
    &:nth-child(5) {
      display: none;
    }
  }
  @media (max-width: ${breakPoints.mobileMaxWidth}) {
    &:nth-child(4) {
      display: none;
    }
  }
  @media (max-width: ${mobileMaxWidth}) {
    width: 150px;
  }
  @media (max-width: ${mobileMidWidth}) {
    width: 200px;
    &:nth-child(3) {
      display: none;
    }
  }
`

const Image = styled.div`
  width: 100%;
  height: 128px;
  background: ${props => (props.background ? `url(${props.background})` : 'backgroun-image')};
  background-size: cover;
  background-position: center;
  display: block;
  ${finalMedia.desktop`
    height: 90px;
  `}
  ${finalMedia.tablet`
    height: 110px;
  `}
  @media (max-width: ${mobileMaxWidth}) {
    height: 100px;
  }
  @media (max-width: ${mobileMidWidth}) {
    height: 130px;
  }
  @media (max-width: ${mobileMinWidth}) {
    height: 110px;
  }
`

const ContentFrame = styled.div`
  width: 88%;
  margin: 0 auto;
`

const Category = styled(CategoryName)`
  height: 16px;
  line-height: 1.33;
  margin-top: 12px;
  margin-bottom: 4px;
`
const Title = styled.div`
  height: auto;
  font-size: ${fonts.size.medium};
  font-weight: ${fonts.weight.semiBold};
  color: #4a4949;
  ${truncate('relative', 1.5, 4, '#f1f1f1', 'left')}
`

const HeaderContainer = styled.div`
  width: 100%;
  background-color: white;
  ${(props) => {
    if (props.ifPinned) {
      return `
        position: absolute;
        bottom: 0;
      `
    }
    return `
      position: fixed;
      top: 0;
    `
  }};
  z-index: 2;
`

class LatestSection extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ifPinned: false,
    }
    this.latestSectionHeight = 278
    this.handleScroll = this._handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.latestSectionHeight = document.getElementById('latestSectionHeight').offsetHeight
  }

  _handleScroll(e) {
    if (e.srcElement.body.scrollTop >= this.latestSectionHeight) {
      this.setState({
        ifPinned: true,
      })
    } else {
      this.setState({
        ifPinned: false,
      })
    }
  }

  render() {
    const latestItems = this.props.data.map((item) => {
      const style = _.get(item, 'style', '')
      const href = getHref(_.get(item, 'slug', 'error'), style)
      return (
        <ItemFrame
          key={_.get(item, 'id')}
        >
          <TRLink
            href={href}
            redirect={style === 'interactive'}
          >
            <Image
              background={_.get(item, 'hero_image.resized_targets.mobile.url', '')}
            />
          </TRLink>
          <ContentFrame>
            <Category>
              {_.get(item, 'categories[0].name', '')}
            </Category>
            <TRLink
              href={href}
              redirect={style === 'interactive'}
            >
              <Title>{_.get(item, 'title', '')}</Title>
            </TRLink>
          </ContentFrame>
        </ItemFrame>
      )
    })

    return (
      <Container>
        <HeaderContainer ifPinned={this.state.ifPinned}>
          <Header />
        </HeaderContainer>
        <ContentContainer id="latestSectionHeight">
          {latestItems}
        </ContentContainer>
      </Container>
    )
  }
}

LatestSection.defaultProps = {
  data: [],
}

LatestSection.propTypes = {
  data: PropTypes.array,
}

export default LatestSection
