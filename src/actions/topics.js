
import axios from 'axios'
// lodash
import get from 'lodash/get'
import types from '../constants/action-types'
import fieldNames from '../constants/redux-state-fields'
import apiEndpoints from '../constants/api-endpoints'
import formAPIURL from '../utils/form-api-url'

const _ = {
  get,
}

/**
 * fetchTopicsOnIndexPage
 * This function will fetch the 2 to 5 latest topics.
 * It's specifically made for index page
 */
export function fetchTopicsOnIndexPage() {
  return (dispatch, getState) => {
    const state = getState()
    const topics = _.get(state, `${fieldNames.indexPage}.${fieldNames.topics}`, [])
    if (Array.isArray(topics) && topics.length > 0) {
      return null
    }

    const path = `${apiEndpoints.topics}?offset=1&limit=4`

    // Start to get topics
    dispatch({
      type: types.START_TO_GET_TOPICS,
    })

    return axios.get(formAPIURL(path))
      .then((response) => {
        const items = _.get(response, 'data.records', [])
        return dispatch({
          type: types.GET_TOPICS_FOR_INDEX_PAGE,
          payload: items,
        })
      })
      .catch((error) => {
        // Error to get topics
        return dispatch({
          type: types.ERROR_TO_GET_TOPICS,
          errorMsg: error.toString(),
        })
      })
  }
}
