import styled from 'styled-components'
import { fonts } from '../../styles/common-variables'

const SectionName = styled.div`
  display: none;
  @media (max-width: ${props => props.mobileWidth}) {
    display: block;
    font-size: ${fonts.size.small};
    position: absolute;
    letter-spacing: 0.4px;
    z-index: 3;
    top: -8px;
    left: 0;
    right: 0;
    text-align: center;
    >span {
      color: #fff;
      padding-left: 5px;
      padding-right: 5px;
      background-color: #c3000b;
    }
  }
`

export default SectionName
