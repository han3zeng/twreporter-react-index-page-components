import indexPage from './index-page'
import entities from './entities'
import fieldNames from '../constants/redux-state-fields'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  [fieldNames.indexPage]: indexPage,
  entities,
})

export default rootReducer
