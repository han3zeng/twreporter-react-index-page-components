// import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import MobileList from './common-utils/mobile-list'
import PropTypes from 'prop-types'
import React from 'react'
import Section from './common-utils/section'
import SectionName from './common-utils/section-name'
import TruncatText from './truncat-text'
import TRLink from './common-utils/twreporter-link'
import strings from '../constants/strings'
import sectionStrings from '../constants/section-strings'
import get from 'lodash/get'
import styled from 'styled-components'
import { breakPoints, finalMedia } from '../utils/style-utils'
import { fonts, colors } from '../styles/common-variables'
import { getImageSrcSet } from '../utils/image-processor'

const _ = {
  get,
}

// If window is less than oneColumnWidth,
// there will be only one column.
const oneColumnWidth = breakPoints.mobileMaxWidth

const Container = styled.div`
  background-color: #f2f2f2;
`
const List = styled.div`
  list-style-type: none;
  padding: 0px;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;

  ${finalMedia.mobile`
    display: none;
  `}
`

const Item = styled.div`
  padding-bottom: 60px;
  max-width: 544px;
  &:nth-child(odd) {
    margin-right: 32px;
  }
  &:nth-child(even) {
    margin-right: 0px;
  }

  ${finalMedia.desktop`
    max-width: 369px;
  `}

  ${finalMedia.tablet`
    max-width: 280px;

    &:nth-child(odd) {
      margin-right: 20px;
    }
  `}

  ${finalMedia.mobile`
    max-width: 100%;
    &:nth-child(odd) {
      margin-right: 0px;
    }
  `}
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

  ${finalMedia.mobile`
    font-size: ${fonts.size.title.medium};
  `}
`

const Img = styled.div`
  height: 364px;
  margin: 0 auto;
  ${finalMedia.desktop`
    height: 247px;
  `}

  ${finalMedia.tablet`
    height: 186px;
  `}

  ${finalMedia.mobile`
    height: 186px;
  `}
`

const Desc = styled.div`
  margin: 15px auto 0 auto;
  max-width: 504px;
  height: 140px;
  font-size: ${fonts.size.medium};
  p {
    margin: 0;
    text-align: justify;
  }
  color: ${colors.textGrey};

  ${finalMedia.desktop`
    max-width: 323px;
  `}

  ${finalMedia.tablet`
    max-width: 240px;
  `}

  ${finalMedia.mobile`
    max-width: 100%;
    height: 208px;
    font-size: ${fonts.size.large};
  `}
`

  /*
const More = styled.div`
  text-align: center;
`
*/

class Topic extends React.PureComponent {
  render() {
    const { title, topicName, desc, imgObj, slug } = this.props
    const href = `topics/${slug}`
    return (
      <Item>
        <TopicName>{`${strings.topic}${strings.fullShapeDot}${topicName}`}</TopicName>
        <TRLink href={href}>
          <Title>
            {title}
          </Title>
        </TRLink>
        <TRLink href={href}>
          <Img>
            <ImgWrapper
              src={_.get(imgObj, 'resized_targets.mobile.url')}
              alt={_.get(imgObj, 'description')}
              srcSet={getImageSrcSet(imgObj)}
            />
          </Img>
        </TRLink>
        <Desc>
          <TruncatText
            backgroundColor={'#f2f2f2'}
            lines={7}
            lineHeight={1.5}
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
  slug: '',
}

Topic.propTypes = {
  title: PropTypes.string,
  topicName: PropTypes.string,
  desc: PropTypes.string,
  imgObj: PropTypes.object,
  slug: PropTypes.string,
}

class TopicsSection extends React.PureComponent {
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
          slug={_.get(item, 'slug')}
          style={_.get(item, 'style', '')}
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
          {/* <More><BottomLink text="更多報導者專題" path="moretopicssection" /></More>*/}
        </Section>
      </Container>
    )
  }
}

TopicsSection.defaultProps = {
  items: [],
}

TopicsSection.propTypes = {
  items: PropTypes.array,
}

export default TopicsSection
