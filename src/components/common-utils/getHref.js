export const getHref = (slug, style) => {
  if (style === 'interactive') {
    return `i/${slug}`
  }
  return `a/${slug}`
}
