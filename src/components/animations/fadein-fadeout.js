import { VelocityComponent } from 'velocity-react'
import PropTypes from 'prop-types'
import React from 'react'

class FadeInFadeOut extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      onAnimate: false,
    }
    this.onAnimationFinish = this._onAnimationFinish.bind(this)
  }

  componentDidMount() {
    if (this.Node && this.props.isSelected) {
      this.Node.style.display = 'inline'
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
    if (!this.props.isSelected) {
      this.Node.style.display = 'none'
    }
  }

  render() {
    const { isSelected } = this.props
    return (
      <VelocityComponent
        animation={
          isSelected
          ?
          (() => {
            if (this.Node) {
              this.Node.style.display = 'inline'
            }
            return { opacity: 1 }
          })()
          :
          { opacity: 0 }
        }
        duration={500}
        complete={this.onAnimationFinish}
      >
        <div
          ref={(node) => { this.Node = node }}
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
