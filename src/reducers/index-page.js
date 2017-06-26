import types from '../constants/action-types'
import fieldNames from '../constants/redux-state-fields'
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  get,
  merge,
}

function indexPage(state = {}, action = {}) {
  switch (action.type) {
    case types.GET_CONTENT_FOR_INDEX_PAGE: {
      // only store the post slugs,
      // the full content will be handled by entities reducer
      const latest = _.get(action, `payload.${fieldNames.latest}`, []).map((post) => {
        return _.get(post, 'slug')
      })

      // only store the post slugs
      const editorPicks = _.get(action, `payload.${fieldNames.editorPicks}`, []).map((post) => {
        return _.get(post, 'slug')
      })

      // only store the topic slug
      const latestTopic = _.get(action, `payload.${fieldNames.latestTopic}.slug`, '')

      // only store the post slugs
      const reviews = _.get(action, `payload.${fieldNames.reviews}`, []).map((post) => {
        return _.get(post, 'slug')
      })

      return _.merge({}, state, {
        latest,
        [fieldNames.editorPicks]: editorPicks,
        [fieldNames.latestTopic]: latestTopic,
        reviews,
      })
    }

    case types.GET_TOPICS_FOR_INDEX_PAGE: {
      return _.merge({}, state, {
        // only store the topic slugs
        [fieldNames.topics]: action.payload.map((item) => {
          return _.get(item, 'slug')
        }),
      })
    }

    case types.GET_PHOTOGRAPHY_POSTS_FOR_INDEX_PAGE: {
      return _.merge({}, state, {
        // only store the posts slugs
        [fieldNames.photographies]: action.payload.map((item) => {
          return _.get(item, 'slug')
        }),
      })
    }

    case types.GET_INFOGRAPHIC_POSTS_FOR_INDEX_PAGE: {
      return _.merge({}, state, {
        // only store the posts slugs
        [fieldNames.infographics]: action.payload.map((item) => {
          return _.get(item, 'slug')
        }),
      })
    }

    case types.START_TO_GET_POSTS:
    case types.START_TO_GET_TOPICS:
    case types.START_TO_GET_INDEX_PAGE_CONTENT: {
      console.log(action.type)
      return state
    }

    case types.ERROR_TO_GET_POSTS:
    case types.ERROR_TO_GET_TOPICS:
    case types.ERROR_TO_GET_INDEX_PAGE_CONTENT: {
      console.warn(`${action.type} : ${action.errorMsg.toString()}`)
      return state
    }

    default:
      return state
  }
}

export default indexPage
