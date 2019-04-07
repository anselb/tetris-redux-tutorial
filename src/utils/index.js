// random returns a random integer between min and max, inclusive
export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// gridDefault returns the default grid
export const gridDefault = () => {
  const rows = 18
  const cols = 10
  const array = []

  for(let row = 0; row < rows; row++) {
    const rowArr = []
    for(let col = 0; col < cols; col++) {
      rowArr.push(0)
    }
    array.push(rowArr)
  }

  return array
}

// randomShape returns index of random shape from 1 to the number of items in `shapes`
export const randomShape = () => {
  // skip the first item, which is an empty shape
  return random(1, shapes.length - 1)
}

// defaultState returns the default state for the game
export const defaultState = () => {
  return {
    // create an empty grid
    grid: gridDefault(),
    // get a new random shape
    shape: randomShape(),
    // set rotation of the shape to 0
    rotation: 0,
    // set the 'x' position of the shape to 5 and y to -4, which puts the shape
    // in the center of the grid, above the top
    x: 5,
    y: -4,
    // set the index of the next shape to a new random shape
    nextShape: randomShape(),
    // set game to currently running
    isRunning: true,
    // set the score to 0
    score: 0,
    // set the default speed
    speed: 1000,
    // set game to not over
    gameOver: false
  }
}

// nextRotation returns the next rotation for a shape
export const nextRotation = (shape, rotation) => {
  // rotation can't exceed the last index of the the rotations for the given shape
  return (rotation + 1) % shapes[shape].length
}

// canMoveTo returns a bool as to whether a shape can move to a given location
export const canMoveTo = (shape, grid, x, y, rotation) => {
  const currentShape = shapes[shape][rotation]
  // loop through all rows and cols of the shape
  for (let row = 0; row < currentShape.length; row++) {
    for (let col = 0; col < currentShape[row].length; col++) {
      // look for a 1 here (or anything other than a 0)
      if (currentShape[row][col] !== 0) {
        // x offset on grid
        const proposedX = col + x
        // y offset on grid
        const proposedY = row + y
        // if the shape is above the grid, go through each current col until row changes
        if (proposedY < 0) {
          continue
        }
        // identify the row that the shape would move into
        const possibleRow = grid[proposedY]
        // does the row exist
        if (possibleRow) {
          // check if this column in the row is undefined, if it's off the edges, 0, and empty
          if (possibleRow[proposedX] === undefined || possibleRow[proposedX] !== 0) {
            // if undefined or not 0 and it's occupied, we can't move here
            return false
          }
        } else {
          return false
        }
      }
    }
  }
  // all rows and cols have been checked with no problem
  return true
}

// addBlockToGrid adds current shape to grid array
export const addBlockToGrid = (shape, grid, x, y, rotation) => {
  // get the block array
  const block = shapes[shape][rotation];
  // copy the grid
  const newGrid = [...grid];
  // map the block onto the grid
  for (let row = 0; row < block.length; row++) {
    for (let col = 0; col < block[row].length; col++) {
      // look for the actual block, represented as a 1
      if (block[row][col]) {
        // set the grid block to the shape number for coloring
        newGrid[row + y][col + x] = shape;
      }
    }
  }
  return newGrid;
}

// checkRows checks for completed rows and scores points
export const checkRows = (grid) => {
  // points increase for each row completed simultaneously
  // i.e. 40 points for completing one row, 100 points for two rows, etc.
  const points = [0, 40, 100, 300, 1200]
  let completedRows = 0
  for (let row = 0; row < grid.length; row++) {
    // if an empty cell (0) cannot be indexed in the row, it must be complete
    if (grid[row].indexOf(0) === -1) {
      completedRows += 1
      // remove the row at the bottom
      grid.splice(row, 1)
      // add a new empty one at the top
      grid.unshift(Array(10).fill(0))
    }
  }
  return points[completedRows]
}

// shapes defines block shapes and their rotations as arrays.
export const shapes = [
  // none
  [[[0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]]],

  // I
  [[[0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]]],

  // T
  [[[0,0,0,0],
    [1,1,1,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [1,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]]],

  // L
  [[[0,0,0,0],
    [1,1,1,0],
    [1,0,0,0],
    [0,0,0,0]],

   [[1,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,0,1,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,0,0],
    [0,1,1,0],
    [0,0,0,0]]],

  // J
  [[[1,0,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,1,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,0,0,0],
    [1,1,1,0],
    [0,0,1,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,0,0],
    [1,1,0,0],
    [0,0,0,0]]],

  // Z
  [[[0,0,0,0],
    [1,1,0,0],
    [0,1,1,0],
    [0,0,0,0]],

   [[0,0,1,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]]],

  // S
  [[[0,0,0,0],
    [0,1,1,0],
    [1,1,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,1,0],
    [0,0,1,0],
    [0,0,0,0]]],

  // O
  [[[0,1,1,0],
    [0,1,1,0],
    [0,0,0,0],
    [0,0,0,0]]]
]
