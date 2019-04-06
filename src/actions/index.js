export const
  PAUSE = "PAUSE",
  RESUME = "RESUME",
  MOVE_LEFT = "MOVE_LEFT",
  MOVE_RIGHT = "MOVE_RIGHT",
  ROTATE = "ROTATE",
  MOVE_DOWN = "MOVE_DOWN",
  GAME_OVER = "GAME_OVER",
  RESTART = "RESTART"

export const moveRight = () => {
  return { type: MOVE_RIGHT }
}

export const moveLeft = () => {
  return { type: MOVE_LEFT }
}

export const rotate = () => {
  return { type: ROTATE }
}

export const moveDown = () => {
  return { type: MOVE_DOWN }
}

export const pause = () => {
  return { type: PAUSE }
}

export const resume = () => {
  return { type: RESUME }
}

export const restart = () => {
  return { type: RESTART }
}
