import styled from 'styled-components'
import { colors } from '../../styles/common-variables'

const HoverEffect = styled.div`
  cursor: pointer;
  text-decoration: none;
  color: ${colors.textGrey};
  transition: 200ms opacity linear;
  ${(props) => {
    if (props.codeHover) {
      return 'opacity: 0.7;'
    }
    return `
      opacity: 1;
      &:hover {
        opacity: 0.7;
      }
    `
  }};
`
export default HoverEffect
