import { nothing, rundomeSpinnerCount, consoleReport } from '.';

describe('nothing', () => {
  it('1', () => {
    const r = nothing();
    expect(r).toBe(undefined);
  });
});

describe('rundomeSpinnerCount', () => {
  it('1', () => {
    const r = rundomeSpinnerCount();
    expect(typeof r === 'number').toBeTruthy();
  });
});

describe('consoleReport', () => {
  it('1', () => {
    const r = consoleReport('');
    expect(r).toEqual([undefined]);
  });
});
