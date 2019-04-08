# Tetris using React and Redux

Learning React and Redux by following this [tutorial](https://www.makeschool.com/academy/track/react-redux-tetris-app-tutorial-o4s) to create Tetris.

## Notes
- If the block is moved over too far left or right before it becomes visible, the game over state is triggers.
- The GAME_OVER action and reducer is not used.
- In `grid-board.js`, `square` is passed in as a prop to grid square. While `grid-square.js` does not use this prop, it could be accessed later to be used for whatever.
- You can access the child of a React component by using `props.children` ([stackoverflow](https://stackoverflow.com/questions/40261679/react-access-elements-text)).

## TODO
- Speed up the falling of blocks as the score increases
- Add a level count based on the score
- Add the ability to save a block
- Remove the possibility of losing the game by clicking left or right too many times before the block falls down
- Hook up the controls to key input
