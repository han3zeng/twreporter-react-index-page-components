import styled from 'styled-components'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import React from 'react'

const Container = styled.div`
  cursor: ${props => (props.noCursor ? '' : 'pointer')};
  &:hover {
    text-decoration: ${props => (props.noTxtDec ? '' : 'underline')};
  }
`
const TRLink = (props) => {
  const { href, noTxtDec, target } = props
  const targetValue = target || '_self'
  return (
    <Link to={href} target={targetValue}>
      <Container noTxtDec={noTxtDec} >
        {props.children}
      </Container>
    </Link>
  )
}

TRLink.defaultProps = {
  href: '',
  noTxtDec: null,
  target: '',
}

TRLink.propTypes = {
  href: PropTypes.string,
  noTxtDec: PropTypes.bool,
  children: PropTypes.any.isRequired,
  target: PropTypes.string,
}


export default TRLink
