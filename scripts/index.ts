// const { selectScript, consoleReport, betterOption } = require('../dist')
// import { EnchantScriptsP } from '../src'

// import { EnchantScriptsP, selectScript, consoleReport, betterOption } from '../src'
const { selectScript, consoleReport, betterOption } = require('../dist')

type Custom = {
  tags: [string, ...string[]]
}
// const scripts = new Set<EnchantScriptsP<Custom>>();
const scripts = new Set();
scripts.add({
  script: ['sleep 3'],
  ...betterOption,
  opt: {
    name: 'sleep',
    description: 'zzz...',
  },
  // custom: {
  //   tags: ['optimization'],
  // },
});

scripts.add({
  script: ['sleep 4'],
  ...betterOption,
  opt: {
    name: 'sleep zzz',
    description: 'zzz... zzz...',
  },
});


const main = async () => {
  consoleReport(await selectScript(scripts))
  process.exit(0)
};
main();
