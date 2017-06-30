import styled from 'styled-components'
import { contentMaxWidth } from '../../styles/common-variables'

const Section = styled.div`
  position: relative;
  padding-top: 100px;
  padding-bottom: 80px;
  margin: 0 auto;
  max-width: ${contentMaxWidth};
  @media (max-width: ${(props) => { return props.mobileWidth }}) {
    padding-top: 30px;
    padding-bottom: 60px;
  }
`

export default Section
