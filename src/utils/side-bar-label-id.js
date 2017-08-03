import sectionStrings from '../constants/section-strings'

const anchorsList = []
const moduleIdObj = {}
for (const key in sectionStrings) {
  if (Object.prototype.hasOwnProperty.call(sectionStrings, key)) {
    anchorsList.push(key)
    moduleIdObj[key] = key
  }
}

export { moduleIdObj, sectionStrings as moduleLabelObj }
