const { selectScript, consoleReport, betterOption } = require('../dist')

const scripts = new Set();
scripts.add({
  script: ['sleep 3'],
  ...betterOption,
  opt: {
    name: 'sleep',
    description: 'zzz...',
  },
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
