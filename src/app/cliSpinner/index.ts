import cliSpinners from 'cli-spinners';
import readline from 'readline';

export const cliSpinner = (
  p: cliSpinners.SpinnerName,
  length: number,
  prefix = ''
) => {
  const spinner = cliSpinners[p];
  // eslint-disable-next-line no-magic-numbers
  let i = 0;

  return setInterval(() => {
    const { frames } = spinner;
    // eslint-disable-next-line no-magic-numbers
    readline.cursorTo(process.stdout, 0);

    // eslint-disable-next-line no-magic-numbers
    i += 1;

    process.stdout.write(`${prefix}:`);

    for (var j = 0; j < length; j++) {
      process.stdout.write(`${frames[i % frames.length]}`);
    }
  }, spinner.interval);
};

export const getRandomSpinnersName = (): cliSpinners.SpinnerName => {
  const keys = Object.keys(cliSpinners);
  return keys[
    Math.floor(Math.random() * keys.length)
  ] as cliSpinners.SpinnerName;
};
