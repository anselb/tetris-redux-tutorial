// random returns a random integer between min and max, inclusive
export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
