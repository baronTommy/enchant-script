import cliSpinners from 'cli-spinners';
import { getRandomSpinnersName, cliSpinner } from '.';

describe('getRandomSpinnersName', () => {
  it('1', () => {
    const r = getRandomSpinnersName();
    expect(cliSpinners[r]).toBeDefined();
  });
});

describe('cliSpinner', () => {
  const validTime = 2000;
  const sleep = () => new Promise(resolve => setTimeout(resolve, validTime));

  it('1', async () => {
    const r = getRandomSpinnersName();
    // eslint-disable-next-line no-magic-numbers
    const h = cliSpinner(r, 1);
    expect(h).toBeDefined();
    await sleep();
    clearInterval(h);
    expect(h).toBeDefined();
  });
});
