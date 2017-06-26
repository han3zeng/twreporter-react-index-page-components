import styled from 'styled-components'

const Section = styled.div`
  position: relative;
  background-color: #f2f2f2;
  padding-top: 100px;
  padding-bottom: 80px;
  @media (max-width: ${(props) => { return props.mobileWidth }}) {
    padding-top: 30px;
    padding-bottom: 60px;
  }
`

export default Section
