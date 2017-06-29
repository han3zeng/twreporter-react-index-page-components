import types from '../constants/action-types'
import fieldNames from '../constants/redux-state-fields'
import get from 'lodash/get'
import map from 'lodash/map'
import merge from 'lodash/merge'

const _ = {
  get,
  map,
  merge,
}

function indexPage(state = {}, action = {}) {
  switch (action.type) {
    case types.GET_CONTENT_FOR_INDEX_PAGE: {
      // only store the post slugs,
      // the full content will be handled by entities reducer
      const latest = _.map(_.get(action, `payload.${fieldNames.latest}`), (post) => {
        return _.get(post, 'slug')
      })

      // only store the post slugs
      const editorPicks = _.map(_.get(action, `payload.${fieldNames.editorPicks}`), (post) => {
        return _.get(post, 'slug')
      })

      // only store the topic slug
      const latestTopic = _.get(action, `payload.${fieldNames.latestTopic}.slug`, '')

      // only store the post slugs
      const reviews = _.map(_.get(action, `payload.${fieldNames.reviews}`), (post) => {
        return _.get(post, 'slug')
      })

      return _.merge({}, state, {
        [fieldNames.latest]: latest,
        [fieldNames.editorPicks]: editorPicks,
        [fieldNames.latestTopic]: latestTopic,
        [fieldNames.reviews]: reviews,
      })
    }

    case types.GET_TOPICS_FOR_INDEX_PAGE: {
      return _.merge({}, state, {
        // only store the topic slugs
        [fieldNames.topics]: _.map(_.get(action, 'payload.items'), (item) => {
          return _.get(item, 'slug')
        }),
      })
    }

    case types.GET_PHOTOGRAPHY_POSTS_FOR_INDEX_PAGE: {
      return _.merge({}, state, {
        // only store the posts slugs
        [fieldNames.photographies]: _.map(_.get(action, 'payload.items'), (item) => {
          return _.get(item, 'slug')
        }),
      })
    }

    case types.GET_INFOGRAPHIC_POSTS_FOR_INDEX_PAGE: {
      return _.merge({}, state, {
        // only store the posts slugs
        [fieldNames.infographics]: _.map(_.get(action, 'payload.items'), (item) => {
          return _.get(item, 'slug')
        }),
      })
    }

    case types.GET_EDITOR_PICKED_POSTS: {
      return _.merge({}, state, {
        // only store the posts slugs
        [fieldNames.editorPicks]: _.map(_.get(action, 'payload.items'), (item) => {
          return _.get(item, 'slug')
        }),
      })
    }

    case types.START_TO_GET_INDEX_PAGE_CONTENT: {
      console.log(action.type)
      return state
    }

    case types.ERROR_TO_GET_INDEX_PAGE_CONTENT: {
      console.warn(`${action.type} : ${action.errorMsg.toString()}`)
      return state
    }

    default:
      return state
  }
}

export default indexPage
