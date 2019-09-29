import { EnchantScriptsP } from '../...';
import { init } from '.';

export const scripts = new Set<EnchantScriptsP>();

scripts.add({
  script: ['echo ok'],
  opt: {
    name: 'ok',
    description: 'echo ok',
  },
});

describe('init', () => {
  it('1', () => {
    const { commands, scriptsChoices, commandChoices } = init();
    expect(commands).toBeDefined();
    expect(scriptsChoices(scripts)).toBeDefined();
    expect(commandChoices(commands)).toBeDefined();
  });
});
