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
    this.onAnimationFinish = this._onAnimationFinish.bind(this)
    this.ifInitialization = true
  }

  _startAnimation() {
    this.setState({
      startAnimation: true,
    })
  }

  _onAnimationFinish() {
    if (!this.ifInitialization && this.module.srcToSrcset) {
      this.module.srcToSrcset()
    } else {
      this.ifInitialization = false
    }
  }

  render() {
    return (
      <VelocityComponent
        animation={this.state.startAnimation ? { opacity: 1, marginTop: 0 } : { opacity: 0.5, marginTop: '50px' }}
        duration={680}
        complete={this.onAnimationFinish}
        runOnMount={false}
      >
        {React.cloneElement(this.props.children, { ref: (node) => { this.module = node } })}
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
