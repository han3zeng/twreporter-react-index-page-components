import styled from 'styled-components'
import { finalMedia, breakPoints } from '../../utils/style-utils'

const Section = styled.div`
  position: relative;
  padding-top: 100px;
  padding-bottom: 80px;
  margin: 0 auto;
  max-width: ${breakPoints.overDesktopMinWidth};
  ${finalMedia.desktop`
    max-width: ${breakPoints.desktopMinWidth};
  `}
  ${finalMedia.tablet`
    max-width: ${breakPoints.tabletMinWidth};
  `}
  ${finalMedia.mobile`
    max-width: ${breakPoints.mobileMaxWidth};
  `}
  @media (max-width: ${(props) => { return props.mobileWidth }}) {
    padding-top: 30px;
    padding-bottom: 60px;
  }
`

export default Section
