import prompts from 'prompts';
import {
  EnchantScriptsP,
  runInOrder,
  runAll,
  tryRunInOrder,
} from '../../enchantScript';

type CommandsV = {
  f: Function;
  description: string;
};

const makeScriptsChoices = (scriptList: Set<EnchantScriptsP>) => {
  const choices = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of scriptList.entries()) {
    choices.push({
      title: value.opt.name,
      description: value.script[0],
      value: key,
    });
  }
  return (choices as unknown) as prompts.PromptObject<'selected'>['choices'];
};

const makeCommandChoices = (commands: Map<string, CommandsV>) => {
  const choices = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of commands.entries()) {
    choices.push({
      title: key,
      description: value.description,
      value: key,
    });
  }

  return choices;
};

const getCommands = (): Map<string, CommandsV> => {
  const commands = new Map<string, CommandsV>();

  commands.set('runInOrder', { f: runInOrder, description: '順番に実行' });
  commands.set('runAll', { f: runAll, description: '並列に実行' });
  commands.set('tryRunInOrder', {
    f: tryRunInOrder,
    description: '順番に実行するが エラーが有ったら止まる',
  });
  return commands;
};

const scriptsChoices = async (scriptList: Set<EnchantScriptsP>) =>
  (await prompts({
    type: 'multiselect',
    name: 'selected',
    message: '実行コマンドの選択',
    choices: makeScriptsChoices(scriptList),
  })).selected;

const commandChoices = async (commands: Map<string, CommandsV>) =>
  (await prompts({
    type: 'select',
    name: 'selected',
    message: '実行コマンドの形式',
    choices: makeCommandChoices(commands),
  })).selected;

export const init = () => ({
  commands: getCommands(),
  scriptsChoices,
  commandChoices,
});
