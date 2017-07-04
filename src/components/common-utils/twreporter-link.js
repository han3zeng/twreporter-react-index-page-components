import styled from 'styled-components'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import React from 'react'
import { colors } from '../../styles/common-variables'

const Container = styled.div`
  cursor: ${props => (props.noCursor ? '' : 'pointer')};
  &:hover {
    text-decoration: ${props => (props.noTxtDec ? '' : 'underline')};
  }
  color: ${props => (props.visitedColor ? props.visitedColor : colors.textGrey)};
`

const A = styled.a`
  text-decoration: none;
`

// noTxtDec = noTextDecoration
const TRLink = (props) => {
  const { href, noTxtDec, target, redirect, visitedColor } = props
  if (redirect) {
    return (
      <A href={href} target={target} rel="noreferrer noopener">
        <Container noTxtDec={noTxtDec} visitedColor={visitedColor}>
          {props.children}
        </Container>
      </A>
    )
  }
  return (
    <Link to={`/${href}`}>
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
