import React, { Component } from 'react'
import { connect } from 'react-redux'
import GridSquare from './grid-square'

import { shapes } from '../utils'

class NextBlock extends Component {

  makeGrid() {
    // deconstruct props into shape
    const { shape } = this.props
    // get the array for this shape first rotation
    const block = shapes[shape][0]

    // map the block to the grid
    return block.map((rowArray, row) => {
      return rowArray.map((square, col) => {
        // if there is not a 0, use the shape index
        const color = block[row][col] === 0 ? 0 : shape
        return <GridSquare key={`${row}${col}`} color={color} />
      })
    })
  }

  render () {
    return (
      <div className="next-block">
        {this.makeGrid()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shape: state.game.nextShape
  }
}

export default connect(mapStateToProps)(NextBlock)
