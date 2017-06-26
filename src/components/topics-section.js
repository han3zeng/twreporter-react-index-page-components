import React from 'react'
import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import MobileList from './common-utils/mobile-list'
import PropTypes from 'prop-types'
import Section from './common-utils/section'
import SectionName from './common-utils/section-name'
import TruncatText from './truncat-text'
import fieldNames from '../constants/redux-state-fields'
import strings from '../constants/strings'
import sectionStrings from '../constants/section-strings'
import get from 'lodash/get'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { fetchTopicsOnIndexPage } from '../actions/topics'
import { fonts } from '../styles/common-variables'
import { getImageSrcSet } from '../utils/image-processor'
import { media } from '../utils/style-utils'

const _ = {
  get,
}

// If window is less than oneColumnWidth,
// there will be only one column.
const oneColumnWidth = '600px'

const List = styled.div`
  list-style-type: none;
  padding: 0px;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  @media (max-width: ${oneColumnWidth}) {
    display: none;
  }
`

const Item = styled.div`
  padding-bottom: 60px;
  max-width: 369px;

  &:nth-child(odd) {
    margin-right: 32px;
  }
  &:nth-child(even) {
    margin-right: 0px;
  }

  ${media.tablet`
    max-width: 280px;

    &:nth-child(odd) {
      margin-right: 20px;
    }`
  }

  @media (max-width: ${oneColumnWidth}) {
    max-width: 100%;
    &:nth-child(odd) {
      margin-right: 0px;
    }
  }
`

const TopicName = CategoryName.extend`
  text-align: center;
`

const Title = styled.div`
  cursor: pointer;
  line-height: 1.25;
  text-align: center;
  color: #4a4a4a;
  font-weight: 600;
  font-size: ${fonts.size.title.large};
  margin-bottom: 15px;
  margin-top: 4px;

  @media (max-width: ${oneColumnWidth}) {
    font-size: ${fonts.size.title.medium};
  }
`

const Img = styled.div`
  cursor: pointer;
  width: 369px;
  height: 247px;
  margin: 0 auto;

  ${media.tablet`
    width: 280px;
    height: 186px;
  `}

  @media (max-width: ${oneColumnWidth}) {
    width: 100%;
  }
`

const Desc = styled.div`
  cursor: pointer;
  margin: 15px auto 0 auto;
  max-width: 323px;
  height: 140px;
  font-size: ${fonts.size.medium};
  p {
    margin: 0;
    text-align: justify;
  }

  ${media.tablet`
    max-width: 240px;
  `}

  @media (max-width: ${oneColumnWidth}) {
    max-width: 100%;
    height: 208px;
    font-size: ${fonts.size.large};
  }
`

const More = styled.div`
  text-align: center;
`

class Topic extends React.PureComponent {
  render() {
    const { title, topicName, desc, imgObj } = this.props

    return (
      <Item>
        <TopicName>{`${strings.topic}${strings.fullShapeDot}${topicName}`}</TopicName>
        <Title>{title}</Title>
        <Img>
          <ImgWrapper
            src={_.get(imgObj, 'resized_targets.mobile.url')}
            alt={_.get(imgObj, 'description')}
            srcSet={getImageSrcSet(imgObj)}
          />
        </Img>
        <Desc>
          <TruncatText
            backgroundColor={'#f2f2f2'}
            lines={7}
            lineHeight={1.43}
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </Desc>
      </Item>
    )
  }
}

Topic.defaultProps = {
  title: '',
  topicName: '',
  desc: '',
  imgObj: {},
}

Topic.propTypes = {
  title: PropTypes.string,
  topicName: PropTypes.string,
  desc: PropTypes.string,
  imgObj: PropTypes.object,
}

class TopicsSection extends React.PureComponent {
  componentWillMount() {
    this.props.fetchTopicsOnIndexPage()
  }

  render() {
    const totalTopics = 4
    const { items } = this.props
    const topicComps = items.map((item) => {
      const desc = _.get(item, 'og_description')
      const imgObj = _.get(item, 'hero_image') || _.get(item, 'og_image')
      return (
        <Topic
          key={_.get(item, 'id')}
          title={_.get(item, 'title')}
          topicName={_.get(item, 'topic_name')}
          desc={desc}
          imgObj={imgObj}
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
          <span>{sectionStrings.topic}</span>
        </SectionName>
        <List>
          {topicComps}
        </List>
        <MobileList
          maxWidth={oneColumnWidth}
        >
          <MobileFlexSwipeable.SwipableFlexItems
            mobileWidth={oneColumnWidth}
            maxSwipableItems={totalTopics - 1}
          >
            {topicComps}
          </MobileFlexSwipeable.SwipableFlexItems>
        </MobileList>
        <More><BottomLink text="更多報導者專題" /></More>
      </Section>
    )
  }
}

TopicsSection.defaultProps = {
  items: [],
  fetchTopicsOnIndexPage: () => {},
}

TopicsSection.propTypes = {
  items: PropTypes.array,
  fetchTopicsOnIndexPage: PropTypes.func,
}

function mapStateToProps(state) {
  let topicSlugs = _.get(state, `${fieldNames.indexPage}.${fieldNames.topics}`, [])
  const entities = _.get(state, `entities.${fieldNames.topics}`, {})

  topicSlugs = topicSlugs.map((slug) => {
    return entities[slug]
  })

  return {
    items: topicSlugs,
  }
}

export default connect(mapStateToProps, { fetchTopicsOnIndexPage })(TopicsSection)
