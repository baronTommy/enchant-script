import execa from 'execa';
import notifier from 'node-notifier';
import signale from 'signale';
import { cliSpinner, getRandomSpinnersName } from '../cliSpinner';
import { nothing, rundomeSpinnerCount } from '../lib';
import { bL, notificationOpt, CustomError } from './lib';

type ExecaScriptParms = Parameters<typeof execa.command>;
// eslint-disable-next-line no-magic-numbers
type SpinnerName = Parameters<typeof cliSpinner>[0];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type lifeCycleActioh = (...p: any[]) => any;
type EnchantScripts = (
  p: EnchantScriptsP
) => Promise<ReturnType<typeof execa.command>>;

type Opt<T = {}> = {
  name: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom?: T;
};

export type EnchantScriptsP = {
  script: ExecaScriptParms;
  opt: Opt;
  spinnerName?: SpinnerName;
  beforAction?: lifeCycleActioh;
  successAction?: lifeCycleActioh;
  finallyAction?: lifeCycleActioh;
  catchErrorAction?: lifeCycleActioh;
  spinnerCount?: number;
};

export type Handler = {
  isForce?: boolean;
  isFinishNotify?: boolean;
};

export const enchantScript: EnchantScripts = async ({
  script,
  spinnerName = 'runner',
  successAction = nothing,
  beforAction = nothing,
  finallyAction = nothing,
  catchErrorAction = nothing,
  // eslint-disable-next-line no-magic-numbers
  spinnerCount = 0,
}) => {
  // eslint-disable-next-line no-magic-numbers
  bL(2);
  const [p1, p2] = script;
  beforAction();
  signale.log(p1);
  const h = cliSpinner(spinnerName, spinnerCount);

  try {
    const r = await execa.command(p1, { ...p2, stdio: 'inherit' });
    bL();
    successAction();
    return r;
  } catch (e) {
    bL();
    catchErrorAction();
    return e;
  } finally {
    bL();
    clearInterval(h);
    finallyAction();
  }
};

export const enchantScripts = async (
  p: EnchantScriptsP[],
  { isForce = true, isFinishNotify = true }: Handler = {}
) => {
  const r: Array<execa.ExecaReturnValue<Buffer>> = [];
  let isError = false;

  await (async () => {
    // eslint-disable-next-line no-magic-numbers
    for (let i = 0; i < p.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const res = await enchantScript(p[i]);
      r.push(res);

      // eslint-disable-next-line no-magic-numbers
      if (res.exitCode === 0 || isForce) {
        // eslint-disable-next-line no-continue
        continue;
      }
      isError = true;
      break;
    }
  })();

  if (isFinishNotify) {
    const message = isError ? 'err' : 'fnish';
    notifier.notify(notificationOpt({ title: 'finish', message }));
  }

  if (isError) {
    throw new CustomError(r);
  }
  return r;
};

export const betterOption: Omit<EnchantScriptsP, 'script' | 'opt'> = {
  beforAction: () => signale.log('start'),
  successAction: () => signale.complete('success'),
  finallyAction: () => bL(),
  catchErrorAction: () => signale.fatal('error'),
  spinnerName: getRandomSpinnersName(),
  spinnerCount: rundomeSpinnerCount(),
};

export const runInOrder = (p: Set<EnchantScriptsP>) =>
  enchantScripts(Array.from(p));
export const tryRunInOrder = (p: Set<EnchantScriptsP>) =>
  enchantScripts(Array.from(p), { isForce: false });
export const runAll = (p: Set<EnchantScriptsP>) =>
  Promise.all(Array.from(p).map(v => enchantScript(v)));
