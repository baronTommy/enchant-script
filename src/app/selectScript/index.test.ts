import { selectScript } from '.';
import { scripts } from './lib/index.test';

describe('nothing', () => {
  it('1', done => {
    selectScript(scripts);
    done();
  });
});
