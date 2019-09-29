import {
  enchantScripts as _enchantScripts,
  betterOption as _betterOption,
  runInOrder as _runInOrder,
  tryRunInOrder as _tryRunInOrder,
  runAll as _runAll,
  EnchantScriptsP as _EnchantScriptsP,
} from './app/enchantScript';
import {
  nothing as _nothing,
  rundomeSpinnerCount as _rundomeSpinnerCount,
  consoleReport as _consoleReport,
} from './app/lib';
import { selectScript as _selectScript } from './app/selectScript';
import { getRandomSpinnersName as _getRandomSpinnersName } from './app/cliSpinner';

export type EnchantScriptsP<T = {}> = _EnchantScriptsP<T>;
export const selectScript = _selectScript;
export const runInOrder = _runInOrder;
export const runAll = _runAll;
export const tryRunInOrder = _tryRunInOrder;
export const enchantScripts = _enchantScripts;
export const betterOption = _betterOption;
export const consoleReport = _consoleReport;
export const getRandomSpinnersName = _getRandomSpinnersName;
export const rundomeSpinnerCount = _rundomeSpinnerCount;
export const nothing = _nothing;
