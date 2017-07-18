import ContentWrapper from './section-content-wrapper'

const Section = ContentWrapper.extend`
  position: relative;
  padding-top: 100px;
  padding-bottom: 80px;
  @media (max-width: ${(props) => { return props.mobileWidth }}) {
    padding-top: 30px;
    padding-bottom: 60px;
  }
`

export default Section
