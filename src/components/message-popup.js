import React, { Component } from 'react'
import { connect } from 'react-redux'

class MessagePopup extends Component {

  render() {
    const { isRunning, gameOver } = this.props

    return (
      <div className={`message-popup ${isRunning && !gameOver ? 'hidden' : ''}`}>
        <h1>{ gameOver ? 'Game Over' : 'Paused'}</h1>
        <p>{ gameOver ? 'Click "Restart" to try again' : 'Click "Play" to resume'}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isRunning: state.game.isRunning,
    gameOver: state.game.gameOver
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(MessagePopup)
