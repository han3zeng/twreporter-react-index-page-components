

import { css } from 'styled-components'

export const centerBlock = `
  margin-left: auto;
  margin-right: auto;
`

export const media = {
  mobile: (...args) => css`
    @media (max-width: 414px) {
      ${css(...args)}
    }
  `,
  iPhone5: (...args) => css`
    @media (max-width: 320px) {
      ${css(...args)}
    }
  `,
  iPhone6: (...args) => css`
    @media (max-width: 375px) {
      ${css(...args)}
    }
  `,
  iPhone6Plus: (...args) => css`
    @media (max-width: 414px) {
      ${css(...args)}
    }
  `,
  largeMobile: (...args) => css`
    @media (max-width: 650px) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (max-width: 768px) {
      ${css(...args)}
    }
  `,
}

export const breakPoints = {
  overDesktopMinWidth: '1440px',
  desktopMaxWidth: '1439px',
  desktopMinWidth: '1024px',
  tabletMaxWidth: '1023px',
  tabletMinWidth: '768px',
  mobileMaxWidth: '767px',
}

export const finalMedia = {
  mobile: (...args) => css`
    @media (max-width: ${breakPoints.mobileMaxWidth}) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (min-width: ${breakPoints.tabletMinWidth}) and (max-width: ${breakPoints.tabletMaxWidth}) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (min-width: ${breakPoints.desktopMinWidth}) and (max-width: ${breakPoints.desktopMaxWidth}) {
      ${css(...args)}
    }
  `,
  overDesktop: (...args) => css`
    @media (min-width: ${breakPoints.overDesktopMinWidth}) {
      ${css(...args)}
    }
  `,
}

/**
* @prop {string} position - postion of the content div
* @prop {number} lineHeight - line-height
* @prop {number} numberOfLine - number of line that you need in div
* @prop {string} backgroundColor - background
* @prop {string} textAlign - text-align
**/
export function truncate(position, lineHeight, numberOfLine, backgroundColor, textAlign) {
  const maxHeight = lineHeight * numberOfLine
  const textAlignValue = textAlign || 'justify'
  return `
    overflow: hidden;
    position: ${position};
    line-height: ${lineHeight}em;
    max-height: ${maxHeight}em;
    text-align: ${textAlignValue};
    margin-right: -1em;
    padding-right: 1em;
    &::before {
      content: '...';
      position: absolute;
      right: 0;
      bottom: 0;
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      width: 1em;
      height: 1em;
      margin-top: 0.25em;
      background: ${backgroundColor};
    }
  `
}
