import styled from 'styled-components'

const TruncatText = styled.div`
  /* hide text if it more than N lines  */
  overflow: hidden;
  /* for set '...' in absolute position */
  position: relative;
  /* use this value to count block height */
  line-height: ${(props) => {
    return props.lineHeight
  }};

  /* max-height = line-height (1.5) * lines max number (3) */
  max-height: ${(props) => {
    const { lineHeight, lines } = props
    return `${lineHeight * lines}em`
  }};
  /* fix problem when last visible word doesn't adjoin right side  */

  text-align: justify;
  /* place for '…' */
  margin-right: -1em;
  padding-right: 1em;
  &::before {
    /* points in the end */
    content: '…';
    /* absolute position */
    position: absolute;
    /* set position to right bottom corner of block */
    right: 0;
    bottom: 0;
  }                                                                                                                                                                                                  /* hide … if we have text, which is less than or equal to max lines */
  &::after {
    /* points in the end */
    content: '';
    /* absolute position */
    position: absolute;
    /* set position to right bottom corner of text */
    right: 0;
    /* set width and height */
    width: 1em;
    height: 1em;
    /* bg color = bg color under block */
    background-color: ${props => props.backgroundColor};
  }
`

export default TruncatText
