import axios from 'axios'
import { apiConfig } from '../config'
import { API_SERVER_REQ, API_SERVER_REQ_SUCCESS, API_SERVER_REQ_FAIL } from './types'

axios.defaults.baseURL = `${apiConfig.API_PROTOCOL}://${apiConfig.API_HOST}:${apiConfig.API_PORT}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

export function request(inWhichProcess) {
  return {
    type: API_SERVER_REQ,
    payload: inWhichProcess,
  }
}

export function success(inWhichProcess) {
  return {
    type: API_SERVER_REQ_SUCCESS,
    payload: inWhichProcess,
  }
}

export function error(err) {
  return {
    type: API_SERVER_REQ_FAIL,
    payload: { process: 'Error occurs during api request', err },
  }
}

export function firstFourModules() {
  return (dispatch) => {
    dispatch(request('requet first four modules'))
    return new Promise((resolve, reject) => {
      axios.get('/v1/index_page')
      .then((response) => {
        dispatch(success('request first four modules successfully'))
        resolve(response.data.records)
      })
      .catch((err) => {
        dispatch(error(err))
        reject()
      })
    })
  }
}
