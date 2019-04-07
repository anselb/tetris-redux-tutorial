import React, { Component } from 'react'
import { connect } from 'react-redux'
import GridSquare from './grid-square'

import { moveDown } from '../actions'
import { shapes } from '../utils'

class GridBoard extends Component {

  makeGrid() {
    // deconstruct properties from props
    const { grid, shape, rotation, x, y } = this.props
    // get the block which is the current shape the player is controlling
    const block = shapes[shape][rotation]
    const blockColor = shape
    // map rows
    return grid.map((rowArray, row) => {
      // map columns
      return rowArray.map((square, col) => {
        // find the block x and y on the shape grid by subtracting the x and y
        // from the col and the row to get the position of the upper left
        // corner of the block array as if it was superimposed over the main grid
        const blockX = col - x
        const blockY = row - y
        let color = square
        // map current falling block to grid
        // for any squares that fall on the grid we need to look at the block
        // array and see if there is a 1 in this case we use the block color
        if (blockX >= 0 && blockX < block.length && blockY >= 0 && blockY < block.length) {
          color = block[blockY][blockX] === 0 ? color : blockColor
        }
        // generate unique key for every block
        const k = row * grid[0].length + col;
        // generate a grid square
        return <GridSquare
                key={k}
                square={square}
                color={color}
              >{square}</GridSquare>
      })
    })
  }

  // render the array of Grid Squares from makeGrid()
  render () {
    return (
      <div className='grid-board'>
        {this.makeGrid()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    grid: state.game.grid,
    shape: state.game.shape,
    rotation: state.game.rotation,
    x: state.game.x,
    y: state.game.y,
    speed: state.game.speed,
    isRunning: state.game.isRunning
  }
}

const mapDispatchToProps = () => {
  return {
    moveDown
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(GridBoard)
