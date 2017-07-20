import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import HoverEffect from './hover-effect'
// import { colors } from '../../styles/common-variables'
import { Link } from 'react-router'

const A = styled.a`
  text-decoration: none;
`

// noTxtDec = noTextDecoration
const TRLink = (props) => {
  const { href, redirect, codeHover } = props
  if (redirect) {
    return (
      <A href={`https://www.twreporter.org/${href}`} target="_blank" rel="noreferrer noopener">
        <HoverEffect codeHover={codeHover}>
          {props.children}
        </HoverEffect>
      </A>
    )
  }
  return (
    <Link to={`/${href}`}>
      <HoverEffect codeHover={codeHover}>
        {props.children}
      </HoverEffect>
    </Link>
  )
}

TRLink.defaultProps = {
  href: '',
  redirect: false,
  codeHover: false,
}

TRLink.propTypes = {
  href: PropTypes.string,
  codeHover: PropTypes.bool,
  children: PropTypes.any.isRequired,
  redirect: PropTypes.bool,
}


export default TRLink
