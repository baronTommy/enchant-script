import {
  enchantScripts,
  betterOption,
  consoleReport,
  getRandomSpinnersName,
  rundomeSpinnerCount,
  nothing,
  runInOrder,
  runAll,
  tryRunInOrder,
} from '.';

it('toBeDefined', () => {
  expect(enchantScripts).toBeDefined();
  expect(betterOption).toBeDefined();
  expect(consoleReport).toBeDefined();
  expect(getRandomSpinnersName).toBeDefined();
  expect(rundomeSpinnerCount).toBeDefined();
  expect(nothing).toBeDefined();
  expect(runInOrder).toBeDefined();
  expect(runAll).toBeDefined();
  expect(tryRunInOrder).toBeDefined();
});
