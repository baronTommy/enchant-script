# enchant-script

```bash
yarn add -D enchant-script
```

```bash
# yarn tsc --init
yarn add -D ts-node typescript
```

```json
{
  "scripts": {
    "selectScript": "ts-node scripts/selectScript"
  }
}
```

scripts/selectScript/index.ts
```ts
import { selectScript, consoleReport } from 'enchant-script';
import { scripts } from '..';

const main = async () => consoleReport(await selectScript(scripts));
main();
```


scripts/index.ts
```ts
import { EnchantScriptsP, betterOption } from 'enchant-script';

export const scripts = new Set<EnchantScriptsP>();

scripts.add({
  script: ['echo ok'],
  opt: {
    name: 'try echo',
    description: 'echo msg',
  },
  ...betterOption,
});

scripts.add({
  script: ['echo foo'],
  opt: {
    name: 'try echo',
    description: 'echo foo',
  },
  ...betterOption,
});
```
