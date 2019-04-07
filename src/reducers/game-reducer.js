import {
  MOVE_RIGHT, MOVE_LEFT, MOVE_DOWN, ROTATE,
  PAUSE, RESUME, RESTART, GAME_OVER
} from '../actions'

import {
  defaultState,
  randomShape,
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
      const newGrid = addBlockToGrid(shape, grid, x, y, rotation)
      // reset some things to start a new shape/block
      const newState = defaultState()
      newState.grid = newGrid
      newState.shape = nextShape
      newState.nextShape = randomShape()
      newState.score = score
      newState.isRunning = isRunning

      // if the block cannot be moved into a valid position, game over
      if (!canMoveTo(nextShape, newGrid, 0, 4, 0)) {
        console.log("Game should be over...")
        newState.shape = 0
        return { ...state, gameOver: true }
      }

      // Update the score based on if rows were completed or not
      newState.score = score + checkRows(newGrid)
      return newState

    case RESUME:
      return { ...state, isRunning: true }

    case PAUSE:
      return { ...state, isRunning: false }

    case GAME_OVER:

      return state

    case RESTART:

      return state

    default:
      return state
  }
}

export default gameReducer
