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

  commands.set('runInOrder', {
    f: runInOrder,
    description: 'Execute selected scripts in order',
  });
  commands.set('runAll', {
    f: runAll,
    description: 'Run selected scripts in parallel',
  });
  commands.set('tryRunInOrder', {
    f: tryRunInOrder,
    description: 'Stop when an error occurs (runInOrder)',
  });
  return commands;
};

const scriptsChoices = async (scriptList: Set<EnchantScriptsP>) =>
  (await prompts({
    type: 'multiselect',
    name: 'selected',
    message: 'Select execution script',
    choices: makeScriptsChoices(scriptList),
  })).selected;

const commandChoices = async (commands: Map<string, CommandsV>) =>
  (await prompts({
    type: 'select',
    name: 'selected',
    message: 'Select execution command',
    choices: makeCommandChoices(commands),
  })).selected;

export const init = () => ({
  commands: getCommands(),
  scriptsChoices,
  commandChoices,
});
