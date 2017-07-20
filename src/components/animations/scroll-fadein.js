import { VelocityComponent } from 'velocity-react'
import PropTypes from 'prop-types'
import React from 'react'

class ScrollFadein extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startAnimation: false,
    }
    this.startAnimation = this._startAnimation.bind(this)
  }

  _startAnimation() {
    this.setState({
      startAnimation: true,
    })
  }

  render() {
    return (
      <VelocityComponent
        animation={this.state.startAnimation ? { opacity: 1, marginTop: 0 } : { opacity: 0, marginTop: '50px' }}
        duration={780}
        complete={this.onAnimationFinish}
      >
        {this.props.children}
      </VelocityComponent>
    )
  }
}

ScrollFadein.defaultProps = {
  children: null,
}

ScrollFadein.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
}

export default ScrollFadein
