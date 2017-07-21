import get from 'lodash/get'
import { replaceStorageUrlPrefix } from './url-processor'

const screenSize = {
  smallScreenMinWidth: 480,
  smallScreenMaxWidth: 768,
  mediumScreenMaxWidth: 992,
  mediumScreenMinWidth: 769,
  largeScreenMinWidth: 993,
}

/**
 * Get image set as imgSrc attribute of <img> tag
 * @param {object} imgObj - Image object
 * @param {object} imgObj.desktop
 * @param {object} imgObj.tablet
 * @param {object} imgObj.mobile
 * @param {string} imgObj.desktop.url
 * @param {string} imgObj.tablet.url
 * @param {string} imgObj.mobile.url
 * @return {string} srcSet
 */
export const getImageSrcSet = (imgObj) => {
  if (!imgObj) {
    return undefined
  }
  const desktopSrc = replaceStorageUrlPrefix(get(imgObj, 'resized_targets.desktop.url'))
  const tabletSrc = replaceStorageUrlPrefix(get(imgObj, 'resized_targets.tablet.url'))
  const mobileSrc = replaceStorageUrlPrefix(get(imgObj, 'resized_targets.mobile.url'))
  return `${mobileSrc} ${screenSize.smallScreenMinWidth}w, ${tabletSrc} ${screenSize.mediumScreenMinWidth}w, ${desktopSrc} ${screenSize.largeScreenMinWidth}w`
}

