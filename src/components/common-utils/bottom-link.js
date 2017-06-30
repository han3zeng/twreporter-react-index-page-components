import LinkIcon from '../../static/link-arrow.svg'
import { Link } from 'react-router'
import DarkBgIcon from '../../static/link-arrow-darkbg.svg'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { colors, fonts } from '../../styles/common-variables'

const Wrapper = styled.div`
  font-size: ${fonts.size.base};
  color: ${(props) => { return props.isDarkBg ? colors.lightBlue : colors.blue }};
  cursor: pointer;

  > span {
    padding-right: 7px;
  }
  svg {
    width: 7px;
    margin-bottom: -1px;
    transition: 0.3s all ease-out;
  }
  &:hover {
    > svg {
      transform: translateX(8px);
    }
  }
`

const BottomLink = (props) => {
  return (
    <Wrapper
      isDarkBg={props.isDarkBg}
    >
      <Link to={props.path}><span>{props.text}</span></Link>
      {props.isDarkBg ? <LinkIcon /> : <DarkBgIcon />}
    </Wrapper>
  )
}

BottomLink.propTypes = {
  isDarkBg: PropTypes.bool,
  text: PropTypes.string.isRequired,
  path: PropTypes.string,
}

BottomLink.defaultProps = {
  isDarkBg: false,
  path: '',
}

export default BottomLink
