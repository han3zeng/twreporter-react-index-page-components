/* eslint no-param-reassign: ["error", { "props": false }]*/
import clone from 'lodash/clone'
import fieldNames from '../constants/redux-state-fields'
import get from 'lodash/get'
import types from '../constants/action-types'
import merge from 'lodash/merge'

const _ = {
  get,
  clone,
  merge,
}

function putEntities(entityArr = [], entityMap, force = false) {
  let _entities = entityArr
  if (!Array.isArray(entityArr)) {
    _entities = [entityArr]
  }

  _entities.forEach((entity) => {
    if (!entity) {
      return
    }
    const slug = _.get(entity, 'slug')
    if (!Object.prototype.hasOwnProperty.call(entityMap, slug) || force) {
      entityMap[slug] = entity
    }
  })
}

function entities(state = {}, action = {}) {
  let postEntityMap
  let topicEntityMap
  let payload

  switch (action.type) {
    case types.GET_CONTENT_FOR_INDEX_PAGE: {
      // This will normalize the posts and topics.
      // EX:
      // action = {
      //  latest: [{
      //    slug: 'post_1'
      //    is_feature: false,
      //    style: 'article'
      //  }, {
      //    slug: 'post_2'
      //    is_feature: false,
      //    style: 'article'
      //  }],
      //  editor_picks: [{
      //    slug: 'post_3',
      //    is_feature: true
      //    style: 'article'
      //  }],
      //  reviews: [{
      //    slug: 'post_4',
      //    is_feature: false
      //    style: 'review'
      //  }],
      //  latest_topics: {
      //    slug: 'topic_1',
      //    relateds: [{
      //      slug: 'post_5'
      //      is_feature: false
      //      style: 'article'
      //    },{
      //      slug: 'post_6'
      //      is_feature: false
      //      style: 'article'
      //    }]
      //  }
      // }
      //
      // the result will be
      // {
      //   posts: {
      //    'post_1': {
      //      slug: 'post_1'
      //      is_feature: false,
      //      style: 'article'
      //    },
      //    'post_2': {
      //      slug: 'post_2'
      //      is_feature: false,
      //      style: 'article'
      //    },
      //    'post_3': {
      //      slug: 'post_3'
      //      is_feature: true,
      //      style: 'article'
      //    },
      //    'post_4': {
      //      slug: 'post_4'
      //      is_feature: false,
      //      style: 'review'
      //    },
      //    'post_5': {
      //      slug: 'post_5'
      //      is_feature: false,
      //      style: 'article'
      //    },
      //    'post_6': {
      //      slug: 'post_6'
      //      is_feature: false,
      //      style: 'article'
      //    },
      //   },
      //   topics: {
      //      'topic_1': {
      //        slug: 'topic_1',
      //        relateds: [ 'post_5', 'post_6']
      //      }
      //   }
      // }
      postEntityMap = _.clone(_.get(state, fieldNames.posts, {}))
      topicEntityMap = _.clone(_.get(state, fieldNames.topics, {}))

      putEntities(_.get(action, `payload.${fieldNames.latest}`, []), postEntityMap)
      putEntities(_.get(action, `payload.${fieldNames.editorPicks}`, []), postEntityMap)
      putEntities(_.get(action, `payload.${fieldNames.reviews}`, []), postEntityMap)


      const latestTopic = _.get(action, `payload.${fieldNames.latestTopic}`, {})
      const relatedPostsInTopic = _.get(latestTopic, fieldNames.relateds, [])
      latestTopic[fieldNames.relateds] = relatedPostsInTopic.map((post) => {
        return _.get(post, 'slug')
      })
      putEntities(relatedPostsInTopic, postEntityMap)

      putEntities(_.get(action, `payload.${fieldNames.latestTopic}`), topicEntityMap, true)

      return _.merge({}, state, {
        [fieldNames.posts]: postEntityMap,
        [fieldNames.topics]: topicEntityMap,
      })
    }

    case types.GET_TOPICS_FOR_INDEX_PAGE: {
      // existing topic entity map
      topicEntityMap = _.clone(_.get(state, fieldNames.topics, {}))

      // topics we get from api
      payload = action.payload

      putEntities(payload, topicEntityMap)

      return _.merge({}, state, {
        [fieldNames.topics]: topicEntityMap,
      })
    }

    case types.GET_PHOTOGRAPHY_POSTS_FOR_INDEX_PAGE:
    case types.GET_INFOGRAPHIC_POSTS_FOR_INDEX_PAGE: {
      // existing post entity map
      postEntityMap = _.clone(_.get(state, fieldNames.posts, {}))

      // topics we get from api
      payload = action.payload

      putEntities(payload, postEntityMap)

      return _.merge({}, state, {
        [fieldNames.posts]: postEntityMap,
      })
    }

    default:
      return state
  }
}

export default entities
