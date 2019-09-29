import execa from 'execa';
import {
  betterOption,
  enchantScripts,
  EnchantScriptsP,
  runInOrder,
  tryRunInOrder,
  runAll,
} from '.';

type Expected = { failed: boolean };

const okBase: [EnchantScriptsP, Expected] = [
  {
    script: ['echo ok'],
    opt: {
      name: '',
      description: '',
    },
  },
  {
    failed: false,
  },
];

const errBase: [EnchantScriptsP, Expected] = [
  {
    script: [''],
    opt: {
      name: '',
      description: '',
    },
  },
  {
    failed: true,
  },
];

const data: [EnchantScriptsP, Expected][] = [
  okBase,
  [...okBase, ...okBase] as [EnchantScriptsP, Expected],
  [{ ...okBase[0], ...betterOption }, okBase[1]],
  [{ ...okBase[0], ...betterOption }, okBase[1]],
  errBase,
  [...errBase, ...errBase] as [EnchantScriptsP, Expected],
  [{ ...errBase[0], ...betterOption }, errBase[1]],
  [{ ...errBase[0], ...betterOption }, errBase[1]],
  [...okBase, ...errBase] as [EnchantScriptsP, Expected],
  [...errBase, ...okBase] as [EnchantScriptsP, Expected],
];

describe.each(data)('enchantScripts', (script, expected) => {
  it('1', async () => {
    const r = await enchantScripts([script]);
    r.forEach(res => expect(res.failed).toBe(expected.failed));
  });

  it('2', async () => {
    const r = await enchantScripts([script], { isFinishNotify: false });
    r.forEach(res => expect(res.failed).toBe(expected.failed));
  });
});

describe.each(data)('runInOrder', (script, expected) => {
  it('1_', async () => {
    const r = await runInOrder(new Set([script]));
    r.forEach(res => expect(res.failed).toBe(expected.failed));
  });
});

describe.each(data)('tryRunInOrder', (script, expected) => {
  it('1__', async () => {
    try {
      const r = await tryRunInOrder(new Set([script]));
      r.forEach(res => expect(res.failed).toBe(expected.failed));
    } catch (e) {
      expect(e.customeData[0].failed).toEqual(expected.failed);
    }
  });
});

describe.each(data)('runAll', (script, expected) => {
  it('1___', async () => {
    const r = await runAll(new Set([script]));
    r.forEach(res =>
      expect(((res as unknown) as execa.ExecaReturnValue<Buffer>).failed).toBe(
        expected.failed
      )
    );
  });
});

describe('enchantScripts err', () => {
  it('1', async () => {
    try {
      await enchantScripts([errBase[0], okBase[0]], { isForce: false });
    } catch (e) {
      expect(e.customeData[0].command).toBe('');
    }
  });
});

describe('betterOption', () => {
  it('1', () => {
    expect(betterOption).toBeDefined();
  });
});
