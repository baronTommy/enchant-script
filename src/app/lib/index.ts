export const nothing = () => {};

// eslint-disable-next-line no-magic-numbers
export const rundomeSpinnerCount = (min = 10, max = 30) =>
  min + Math.floor(Math.random() * max);

// eslint-disable-next-line
export const consoleReport = (...r: any[]) => r.map(item => console.table(item))
