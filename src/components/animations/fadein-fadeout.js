import React from 'react'
import { VelocityComponent } from 'velocity-react'
import PropTypes from 'prop-types'

class FadeInFadeOut extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      onAnimate: false,
    }
    this.onAnimationFinish = this._onAnimationFinish.bind(this)
  }

  componentDidMount() {
    if (this.textField) {
      this.textField.style.display = 'inline'
    }
  }

  componentWillReceiveProps() {
    this.setState({
      onAnimate: true,
    })
  }
  _onAnimationFinish() {
    if (this.state.onAnimate) {
      this.setState({
        onAnimate: false,
      })
    }
  }

  render() {
    const { isSelected } = this.props
    return (
      <VelocityComponent
        animation={isSelected ? { opacity: 1 } : { opacity: 0 }}
        duration={500}
        complete={this.onAnimationFinish}
      >
        <div
          ref={(node) => {
            this.textField = node
          }}
          style={{
            display: 'none',
          }}
        >
          {this.props.children}
        </div>
      </VelocityComponent>
    )
  }
}

FadeInFadeOut.defaultProps = {
  isSelected: false,
  children: null,
}

FadeInFadeOut.propTypes = {
  isSelected: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
}

export default FadeInFadeOut
