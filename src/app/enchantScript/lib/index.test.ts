import { bL, CustomError } from '.';

describe('bL', () => {
  it('1', () => {
    const r = bL();
    expect(r).toBeDefined();
  });
});

describe('CustomError', () => {
  it('1', () => {
    try {
      throw new CustomError({ foo: 'bar' });
    } catch (e) {
      expect(e.customeData.foo).toBe('bar');
    }
  });
});
