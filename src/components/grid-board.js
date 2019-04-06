import React, { Component } from 'react'
import GridSquare from './grid-square'

class GridBoard extends Component {

  // generates an array of 18 arrays, each containing 10 Grid Squares
  makeGrid() {
    const grid = []
    for (let row = 0; row < 18; row ++) {
      grid.push([])
      for (let col = 0; col < 10; col ++) {
        grid[row].push(<GridSquare key={`${col}${row}`} color="0" />)
      }
    }

    return grid
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

export default GridBoard
