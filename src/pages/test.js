/* global React*/
import styled from 'styled-components'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'
import Header from '../components/header'

const Container = styled.div`
  width 100%;
  max-width: 1024px;
  margin: 0 auto;
  background-color: white;
  border: 1px solid black;
  overflow: hidden;
`

class Test extends React.Component {
  render() {
    return (
      <Container>
        <Header />
      </Container>
    )
  }
}

export default withRedux(initStore)(Test)
