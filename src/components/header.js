import React from 'react'
import styled from 'styled-components'


const Frame = styled.div`
  width: 100%;
  height: 62px;
  border: 1px solid green;
`

class Header extends React.Component {
  render() {
    return (
      <Frame>this is header</Frame>
    )
  }
}

export default Header
