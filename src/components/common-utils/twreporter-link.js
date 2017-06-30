import styled from 'styled-components'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import React from 'react'

const Container = styled.a`
  cursor: ${props => (props.noCursor ? '' : 'pointer')};
  &:hover {
    text-decoration: ${props => (props.noTxtDec ? '' : 'underline')};
  }
`
const TRLink = (props) => {
  const { href, noTxtDec } = props
  return (
    <Link to={href}>
      <Container noTxtDec={noTxtDec} >
        {props.children}
      </Container>
    </Link>
  )
}

TRLink.defaultProps = {
  href: '',
  noTxtDec: null,
}

TRLink.propTypes = {
  href: PropTypes.string,
  noTxtDec: PropTypes.bool,
  children: PropTypes.any.isRequired,
}


export default TRLink
