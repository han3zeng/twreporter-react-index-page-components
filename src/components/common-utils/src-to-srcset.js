import React from 'react'

// after animation
class SrcToSrcset extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ifSrcset: false,
    }
    this.srcToSrcset = this._srcToSrcset.bind(this)
  }

  _srcToSrcset() {
    this.setState({
      ifSrcset: true,
    })
  }

}

export default SrcToSrcset
