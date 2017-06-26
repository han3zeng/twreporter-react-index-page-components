/** These strings are used for field key of redux state
 * Redux state will be like
 *  {
 *    index_page: {
 *      latest: [],
 *      editor_picks: [],
 *      latest_topic: [],
 *      reviews: [],
 *      topics: [],
 *      photographies: [],
 *      infographics: [],
 *    },
 *    entities: {
 *      posts: {},
 *      topics: {},
 *    }
 *  }
 *
 */

const indexPage = 'index_page'
const entities = 'entities'
const posts = 'posts'
const topics = 'topics'
const latestTopic = 'latest_topic'
const latest = 'latest'
const editorPicks = 'editor_picks'
const reviews = 'reviews'
const relateds = 'relateds'
const photographies = 'photography_section'
const infographics = 'infographic_section'


export default {
  indexPage,
  entities,
  latest,
  latestTopic,
  posts,
  topics,
  editorPicks,
  reviews,
  relateds,
  photographies,
  infographics,
}
