import { VelocityComponent } from 'velocity-react'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Waypoint from 'react-waypoint'


const Background = styled.div`
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : '')};
`

class ScrollFadein extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startAnimation: false,
    }
    this.startAnimation = this._startAnimation.bind(this)
    this.onAnimationFinish = this._onAnimationFinish.bind(this)
    this.ifInitialization = true
  }

  _startAnimation() {
    this.setState({
      startAnimation: true,
    })
  }

  _onAnimationFinish() {
    if (!this.ifInitialization && typeof this.module.srcToSrcset === 'function') {
      this.module.srcToSrcset()
      return
    }
    this.ifInitialization = false
  }

  render() {
    return (
      <Background backgroundColor={this.props.backgroundColor}>
        <Waypoint
          onEnter={this.startAnimation}
          fireOnRapidScroll
          topOffset="80%"
          bottomOffset="19%"
        >
          <div>
            <VelocityComponent
              animation={this.state.startAnimation ? { opacity: 1, paddingTop: 0 } : { opacity: 0.5, paddingTop: '50px' }}
              duration={680}
              complete={this.onAnimationFinish}
              runOnMount={false}
            >
              {React.cloneElement(this.props.children, { ref: (node) => { this.module = node } })}
            </VelocityComponent>
          </div>
        </Waypoint>
      </Background>
    )
  }
}

ScrollFadein.defaultProps = {
  backgroundColor: '',
}

ScrollFadein.propTypes = {
  children: PropTypes.element.isRequired,
  backgroundColor: PropTypes.string,
}

export default ScrollFadein
