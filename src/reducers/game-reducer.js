import {
  MOVE_RIGHT, MOVE_LEFT, MOVE_DOWN, ROTATE,
  PAUSE, RESUME, RESTART, GAME_OVER
} from '../actions'

import {
  defaultState,
  nextRotation,
  canMoveTo,
  addBlockToGrid,
  checkRows
} from '../utils'


const gameReducer = (state = defaultState(), action) => {
  const { shape, grid, x, y, rotation, nextShape, score, isRunning } = state

  switch(action.type) {
    case ROTATE:
      const newRotation = nextRotation(shape, rotation)
      if (canMoveTo(shape, grid, x, y, newRotation)) {
        return { ...state, rotation: newRotation }
      }
      return state

    case MOVE_RIGHT:
      // check if moving right is possible by calling canMoveTo() with new x
      if (canMoveTo(shape, grid, x + 1, y, rotation)) {
        return { ...state, x: x + 1 }
      }
      return state

    case MOVE_LEFT:
      // check if moving left is possible by calling canMoveTo() with new x
      if (canMoveTo(shape, grid, x - 1, y, rotation)) {
        return { ...state, x: x - 1 }
      }
      return state

    case MOVE_DOWN:
      // get the next potential y position
      const maybeY = y + 1

      // check if the current block can move here
      if (canMoveTo(shape, grid, x, maybeY, rotation)) {
        // if the block can be moved, move it
        return { ...state, y: maybeY }
      }

      // if the block cannot be moved, place the block
      const { newGrid, gameOver } = addBlockToGrid(shape, grid, x, y, rotation)

      // if the block is placed over the top of the grid, game over
      if (gameOver) {
        const newState = { ...state }
        newState.shape = 0
        newState.grid = newGrid
        return { ...state, gameOver: true }
      }

      // reset some things to start a new shape/block
      const newState = defaultState()
      newState.grid = newGrid
      newState.shape = nextShape
      newState.score = score
      newState.isRunning = isRunning

      // TODO: check and set level based on the score
      // update the score based on if rows were completed or not
      newState.score = score + checkRows(newGrid)
      return newState

    case RESUME:
      return { ...state, isRunning: true }

    case PAUSE:
      return { ...state, isRunning: false }

    case GAME_OVER:

      return state

    case RESTART:
      return defaultState()

    default:
      return state
  }
}

export default gameReducer
