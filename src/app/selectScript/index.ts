import { EnchantScriptsP } from '../enchantScript';
import { init } from './lib';

type SelectScript = (p: Set<EnchantScriptsP>) => Promise<void>;

export const selectScript: SelectScript = async scripts => {
  const { commands, scriptsChoices, commandChoices } = init();
  const selectedScripts = await scriptsChoices(scripts);
  /* istanbul ignore next */
  const selectedCommand = await commandChoices(commands);

  /* istanbul ignore next */
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { f } = commands.get(selectedCommand)!;
    return await f(selectedScripts);
  } catch (e) {
    return e;
  }
};
