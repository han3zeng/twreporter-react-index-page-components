/* global React*/
import EditorPicks from '../components/editor-picks'
import Header from '../components/header'
import InfographicSection from '../components/infographic-section'
import Latest from '../components/latest'
import LatestTopic from '../components/latest-topic'
import Reviews from '../components/reviews'
import PhotographySection from '../components/photography-section'
import ReporterIntro from '../components/reporter-intro'
import TopicsSection from '../components/topics-section'
import clone from 'lodash/clone'
import fieldNames from '../constants/redux-state-fields'
import get from 'lodash/get'
import set from 'lodash/set'
import styled from 'styled-components'
import withRedux from 'next-redux-wrapper'
import { fetchIndexPageContent } from '../actions/index-page'
import { fetchTopicsOnIndexPage } from '../actions/topics'
import { fetchPhotographyPostsOnIndexPage, fetchInfographicPostsOnIndexPage } from '../actions/posts'
import { initStore } from '../store'
import SideBar, { moduleIdObj } from '../components/side-bar'

const _ = {
  clone,
  get,
  set,
}

const Container = styled.div`
  width 100%;
  max-width: 1024px;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
`

const FirstModuleWrapper = styled.div`
  hegight: auto;
`

const denormalizePosts = (slugs, entities) => {
  const posts = slugs.map((slug) => {
    return _.clone(entities[slug])
  })

  return posts
}

const denormalizeTopics = (topicSlugs, topicEntities, postEntities) => {
  let slugs = topicSlugs
  if (!Array.isArray(topicSlugs)) {
    slugs = [topicSlugs]
  }
  const topics = slugs.map((slug) => {
    const topic = _.clone(topicEntities[slug])
    const relatedSlugs = _.get(topic, fieldNames.relateds, [])
    const relateds = denormalizePosts(relatedSlugs, postEntities)
    _.set(topic, fieldNames.relateds, relateds)
    return topic
  })

  return topics
}

class Homepage extends React.Component {
  static async getInitialProps({ store }) {
    await fetchIndexPageContent()(store.dispatch, store.getState)
    await fetchTopicsOnIndexPage()(store.dispatch, store.getState)
    await fetchPhotographyPostsOnIndexPage()(store.dispatch, store.getState)
    await fetchInfographicPostsOnIndexPage()(store.dispatch, store.getState)

    const state = store.getState()
    const indexPageState = _.get(state, fieldNames.indexPage, {})

    // get post entities
    const postEntities = _.get(state, `${fieldNames.entities}.${fieldNames.posts}`, {})

    // get topic entities
    const topicEntities = _.get(state, `${fieldNames.entities}.${fieldNames.topics}`, {})

    // restore the posts
    const latest = denormalizePosts(_.get(indexPageState, fieldNames.latest, []), postEntities)
    const editorPicks = denormalizePosts(_.get(indexPageState, fieldNames.editorPicks, []), postEntities)
    const reviews = denormalizePosts(_.get(indexPageState, fieldNames.reviews, []), postEntities)
    const photoPosts = denormalizePosts(_.get(indexPageState, fieldNames.photographies, []), postEntities)
    const infoPosts = denormalizePosts(_.get(indexPageState, fieldNames.infographics, []), postEntities)

    // restore the topics
    const latestTopic = _.get(denormalizeTopics(_.get(indexPageState, fieldNames.latestTopic, []), topicEntities, postEntities), 0, {})
    const topics = denormalizeTopics(_.get(indexPageState, fieldNames.topics, []), topicEntities, postEntities)

    return {
      [fieldNames.latest]: latest,
      [fieldNames.editorPicks]: editorPicks,
      [fieldNames.latestTopic]: latestTopic,
      [fieldNames.reviews]: reviews,
      [fieldNames.topics]: topics,
      [fieldNames.photographies]: photoPosts,
      [fieldNames.infographics]: infoPosts,
    }
  }

  render() {
    return (
      <Container>
        <SideBar>
          <FirstModuleWrapper
            moduleId={moduleIdObj.editorPick}
          >
            <Header />
            <Latest data={this.props[fieldNames.latest]} />
            <EditorPicks data={this.props[fieldNames.editorPicks]} />
          </FirstModuleWrapper>
          <LatestTopic
            data={this.props[fieldNames.latestTopic]}
            moduleId={moduleIdObj.latestTopic}
          />
          <Reviews
            data={this.props[fieldNames.reviews]}
            moduleId={moduleIdObj.review}
          />
          <TopicsSection
            moduleId={moduleIdObj.topic}
          />
          <PhotographySection
            moduleId={moduleIdObj.photography}
            items={this.props[fieldNames.photographies]}
          />
          <InfographicSection
            moduleId={moduleIdObj.infographic}
            items={this.props[fieldNames.infographics]}
          />
          <ReporterIntro
            moduleId={moduleIdObj.donation}
          />
        </SideBar>
      </Container>
    )
  }
}

export default withRedux(initStore)(Homepage)
