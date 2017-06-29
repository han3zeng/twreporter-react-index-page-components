/* global describe, context, it, afterEach */

/*
  Testing functions:
    fetchIndexPageContent
*/

'use strict'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import configureMockStore from 'redux-mock-store'
import fieldNames from '../../constants/redux-state-fields'
import formatUrl from '../../utils/form-api-url'
import nock from 'nock'
import postStyles from '../../constants/post-styles'
import thunk from 'redux-thunk'
import types from '../../constants/action-types'
import * as actions from '../index-page'

chai.use(chaiAsPromised)
const expect = chai.expect
const assert = chai.assert
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const post1 = {
  id: 'post-id-1',
  slug: 'post-slug-1',
}

const post2 = {
  id: 'post-id-2',
  slug: 'post-slug-2',
}

const post3 = {
  id: 'post-id-3',
  slug: 'post-slug-3',
}

const post4 = {
  id: 'post-id-4',
  slug: 'post-slug-4',
}

const fullTopic = {
  id: 'topic-id-1',
  slug: 'topic-slug-1',
  relateds: [post3, post4],
  full: true,
}

process.env.NODE_ENV = "development"

/* Fetch a full post, whose assets like relateds, leading_video ...etc are all complete,
 * @param {string} slug - slug of post
 */
/*
========= Testing fetchAFullPost ==========
*/
describe('Testing fetchIndexPageContent:', function () {
  afterEach(function () {
    nock.cleanAll()
  })
  context('Contents are already existed', () => {
    it('Should dispatch no actions and return Promise.resolve()', function () {
      const store = mockStore({
        [fieldNames.indexPage]: {
          [fieldNames.latest]: [post1, post2],
          [fieldNames.editorPicks]: [post3],
          [fieldNames.latestTopic]: fullTopic,
          [fieldNames.reviews]: [post4],
        }
      })
      store.dispatch(actions.fetchIndexPageContent())
      expect(store.getActions().length).to.equal(0) // no action is dispatched
      return expect(store.dispatch(actions.fetchIndexPageContent())).eventually.equal(undefined)
    })
  })
  context('Lacks of contents', () => {
    it('Should dispatch types.GET_CONTENT_FOR_INDEX_PAGE', () => {
      const store = mockStore()
      const mockApiResponse = {
        records: {
          [fieldNames.latest]: [post1, post2],
          [fieldNames.editorPicks]: [post3],
          [fieldNames.latestTopic]: [fullTopic],
          [fieldNames.reviews]: [post4],
        }
      }
      nock("http://localhost:8080")
        .get(encodeURI("/v1/index_page"))
        .reply(200, mockApiResponse)

      return store.dispatch(actions.fetchIndexPageContent())
        .then(function () {
          expect(store.getActions().length).to.equal(2)  // 2 actions: REQUEST && SUCCESS
          expect(store.getActions()[0].type).to.deep.equal(types.START_TO_GET_INDEX_PAGE_CONTENT)
          expect(store.getActions()[1].type).to.equal(types.GET_CONTENT_FOR_INDEX_PAGE)
          expect(store.getActions()[1].payload).to.deep.equal({
            [fieldNames.latest]: [post1, post2],
            [fieldNames.editorPicks]: [post3],
            [fieldNames.latestTopic]: fullTopic,
            [fieldNames.reviews]: [post4],
          })
        })
    })
  })
  context('If the api returns a failure', () => {
    it('Should dispatch types.ERROR_TO_GET_INDEX_PAGE_CONTENT', () => {
      const store = mockStore()
      nock("http://localhost:8080")
        .get("/v1/index_Page")
        .reply(404)

      return store.dispatch(actions.fetchIndexPageContent())
        .then(function () {
          expect(store.getActions().length).to.equal(2)  // 2 actions: REQUEST && FAILURE
          expect(store.getActions()[0].type).to.deep.equal(types.START_TO_GET_INDEX_PAGE_CONTENT)
          expect(store.getActions()[1].type).to.equal(types.ERROR_TO_GET_INDEX_PAGE_CONTENT)
          expect(store.getActions()[1].errorMsg).to.not.equal('')
        })
    })
  })
})
