import React from 'react'

class SwipableMixin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
    }
    this.maxSwipableItems = 0
    this.onSwipedRight = this._onSwipedRight.bind(this)
    this.onSwipedLeft = this._onSwipedLeft.bind(this)
    this.onSetMaxItems = this._onSetMaxItems.bind(this)
  }

  _onSwipedLeft() {
    const { selected } = this.state
    if (selected < this.maxSwipableItems) {
      this.setState({
        selected: selected + 1,
      })
    }
  }

  _onSwipedRight() {
    const { selected } = this.state
    if (selected > 0) {
      this.setState({
        selected: selected - 1,
      })
    }
  }

  _onSetMaxItems(num) {
    this.maxSwipableItems = num
  }
}

export default SwipableMixin
