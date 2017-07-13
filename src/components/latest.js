import CategoryName from './common-utils/category-name'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import ContentWrapper from './common-utils/section-content-wrapper'
import TRLink from './common-utils/twreporter-link'
import { fonts, headerPadding } from '../styles/common-variables'
import { truncate } from '../utils/style-utils'

const _ = {
  get,
}

const desktopMidWidth = '1300px'
const desktopMinWidth = '1140px'
const tabletMaxWidth = '1023px'
const tabletMidWidth = '916px'
const tabletMinWidth = '761px'
const mobileMaxWidth = '600px'
const mobileMidWidth = '550px'
const mobileMinWidth = '414px'

const Container = styled.div`
  background-color: #f2f2f2;
`

const ContentContainer = ContentWrapper.extend`
  display: flex;
  padding: 30px ${headerPadding.desktop};
  overflow-x: hidden;
  justify-content: space-between;
  @media (max-width: ${tabletMidWidth}) {
    padding: 30px ${headerPadding.tablet};
  }
  @media (max-width: ${tabletMidWidth}) {
    padding: 30px ${headerPadding.tablet};
  }
  @media (max-width: ${mobileMidWidth}) {
    padding: 30px ${headerPadding.mobile};
  }
`
const ItemFrame = styled.div`
  width: 200px;
  padding: 0;
  margin-left: 30px;
  &:first-child {
    margin: 0;
  }
  @media (max-width: ${desktopMinWidth}) {
    width: 130px;
  }
  @media (max-width: ${tabletMaxWidth}) {
    width: 159px;
    margin-left: 20px;
    &:nth-child(6) {
      display: none;
    }
  }
  @media (max-width: ${tabletMidWidth}) {
    width: 189px;
    &:nth-child(5) {
      display: none;
    }
  }
  @media (max-width: ${tabletMinWidth}) {
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
  @media (max-width: ${desktopMidWidth}) {
    height: 110px;
  }
  @media (max-width: ${desktopMinWidth}) {
    height: 90px;
  }
  @media (max-width: ${tabletMaxWidth}) {
    height: 100px;
  }
  @media (max-width: ${tabletMidWidth}) {
    height: 110px;
  }
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

class Latest extends React.PureComponent {
  render() {
    const latestItems = this.props.data.map((item) => {
      const href = `a/${_.get(item, 'slug', 'error')}`
      const style = _.get(item, 'style', '')
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
        <ContentContainer>
          {latestItems}
        </ContentContainer>
      </Container>
    )
  }
}

Latest.defaultProps = {
  data: [],
}

Latest.propTypes = {
  data: PropTypes.array,
}

export default Latest
