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

  it('2', () => {
    const r = rundomeSpinnerCount(1);
    expect(typeof r === 'number').toBeTruthy();
  });

  it('3', () => {
    const r = rundomeSpinnerCount(1, 2);
    expect(typeof r === 'number').toBeTruthy();
  });
});

describe('consoleReport', () => {
  it('1', () => {
    const r = consoleReport('');
    expect(r).toEqual([undefined]);
  });
  it('2', () => {
    const r = consoleReport('', '');
    expect(r).toEqual([undefined, undefined]);
  });
});
