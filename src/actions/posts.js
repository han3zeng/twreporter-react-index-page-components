
import axios from 'axios'
// lodash
import get from 'lodash/get'
import types from '../constants/action-types'
import fieldNames from '../constants/redux-state-fields'
import apiEndpoints from '../constants/api-endpoints'
import formAPIURL from '../utils/form-api-url'
import postStyles from '../constants/post-styles'

const _ = {
  get,
}

/**
 * fetchPhotographyPostsOnIndexPage
 * This function will fetch 10 latest posts with photography style,
 * It's specifically made for index page
 */
export function fetchPhotographyPostsOnIndexPage() {
  return (dispatch, getState) => {
    const state = getState()
    const posts = _.get(state, `${fieldNames.indexPage}.${fieldNames.photographies}`, [])
    if (Array.isArray(posts) && posts.length > 0) {
      return null
    }

    const path = `${apiEndpoints.posts}?where={"style":"${postStyles.photography}"}&limit=10`

    // Start to get topics
    dispatch({
      type: types.START_TO_GET_POSTS,
    })

    return axios.get(formAPIURL(path))
      .then((response) => {
        const items = _.get(response, 'data.records', [])
        return dispatch({
          type: types.GET_PHOTOGRAPHY_POSTS_FOR_INDEX_PAGE,
          payload: items,
        })
      })
      .catch((error) => {
        // Error to get topics
        return dispatch({
          type: types.ERROR_TO_GET_POSTS,
          errorMsg: error.toString(),
        })
      })
  }
}

/**
 * fetchPhotographyPostsOnIndexPage
 * This function will fetch 10 latest posts with photography style,
 * It's specifically made for index page
 */
export function fetchInfographicPostsOnIndexPage() {
  return (dispatch, getState) => {
    const state = getState()
    const posts = _.get(state, `${fieldNames.indexPage}.${fieldNames.infographics}`, [])
    if (Array.isArray(posts) && posts.length > 0) {
      return null
    }

    const path = `${apiEndpoints.posts}?where={"style":"${postStyles.infographic}"}&limit=10`

    // Start to get topics
    dispatch({
      type: types.START_TO_GET_POSTS,
    })

    return axios.get(formAPIURL(path))
      .then((response) => {
        const items = _.get(response, 'data.records', [])
        return dispatch({
          type: types.GET_INFOGRAPHIC_POSTS_FOR_INDEX_PAGE,
          payload: items,
        })
      })
      .catch((error) => {
        // Error to get topics
        return dispatch({
          type: types.ERROR_TO_GET_POSTS,
          errorMsg: error.toString(),
        })
      })
  }
}
