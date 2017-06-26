import React from 'react'
import CategoryName from './common-utils/category-name'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { fonts } from '../styles/common-variables'
import { truncate } from '../utils/style-utils'

const _ = {
  get,
}

const tabletMaxWidth = '1023px'
const tabletMidWidth = '916px'
const tabletMinWidth = '761px'
const mobileMaxWidth = '600px'
const mobileMidWidth = '550px'
const mobileMinWidth = '414px'

const LatestContainer = styled.div`
  background-color: #f2f2f2;
  display: flex;
  padding: 30px 47px;
  overflow-x: hidden;
  justify-content: space-between;
  @media (max-width: ${tabletMidWidth}) {
    padding: 30px 34px;
  }
  @media (max-width: 480px) {
    padding: 30px 16px;
  }
`
const ItemFrame = styled.div`
  width: 130px;
  height: auto;
  padding: 0;
  margin-left: 30px;
  &:first-child {
    margin: 0;
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
  height: 90px;
  background: ${props => (props.background ? `url(${props.background})` : 'backgroun-image')};
  background-size: cover;
  background-position: center;
  display: block;
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
  width: 128px;
  margin: 0 auto;
  overflow: hidden;
`

const Category = styled(CategoryName)`
  height: 16px;
  line-height: 1.33;
  margin-top: 13px;
  margin-bottom: 3px;
`
const Title = styled.div`
  width: 128px;
  height: auto;
  font-size: ${fonts.size.medium};
  font-weight: ${fonts.weight.semiBold};
  color: #4a4949;
  ${truncate('relative', 1.5, 4, '#f1f1f1', 'left')}
`

class Latest extends React.PureComponent {
  render() {
    const latestItems = this.props.data.map((item) => {
      return (
        <ItemFrame
          key={_.get(item, 'id')}
        >
          <Image background={_.get(item, 'hero_image.resized_targets.mobile.url', '')} />
          <ContentFrame>
            <Category>
              {_.get(item, 'categories[0].name', '')}
            </Category>
            <Title>
              {_.get(item, 'title', '')}
            </Title>
          </ContentFrame>
        </ItemFrame>
      )
    })

    return (
      <LatestContainer>
        {latestItems}
      </LatestContainer>
    )
  }
}

Latest.defaultProps = {
  data: [],
}

Latest.propTypes = {
  data: PropTypes.array,
}

export default connect()(Latest)
