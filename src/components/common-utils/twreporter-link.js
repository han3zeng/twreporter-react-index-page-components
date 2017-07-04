import styled from 'styled-components'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import React from 'react'

const Container = styled.div`
  cursor: ${props => (props.noCursor ? '' : 'pointer')};
  &:hover {
    text-decoration: ${props => (props.noTxtDec ? '' : 'underline')};
  }
  color: ${props => (props.visitedColor ? props.visitedColor : 'black')};
`

const A = styled.a`
  text-decoration: none;
`

const TRLink = (props) => {
  const { href, noTxtDec, target, redirect, visitedColor } = props
  const targetValue = target || '_self'
  if (redirect) {
    return (
      <A href={href} target={targetValue} rel="noreferrer noopener">
        <Container noTxtDec={noTxtDec} visitedColor={visitedColor}>
          {props.children}
        </Container>
      </A>
    )
  }
  return (
    <Link to={`/${href}`} target={targetValue}>
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
  redirect: false,
  visitedColor: '',
}

TRLink.propTypes = {
  href: PropTypes.string,
  noTxtDec: PropTypes.bool,
  children: PropTypes.any.isRequired,
  target: PropTypes.string,
  redirect: PropTypes.bool,
  visitedColor: PropTypes.string,
}


export default TRLink
