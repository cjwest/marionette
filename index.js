#!/usr/bin/env node
// https://www.npmjs.com/package/shelljs
require('shelljs/global');

//https://www.npmjs.com/package/commander
var program = require('commander');

// Defaults
var linkyClickyDir = '/Users/cjwest/Documents/htdocs/behat/linky_clicky/';
var behatLocalYml = '/Users/cjwest/Documents/htdocs/behat/behat.local.yml';
var behat = linkyClickyDir + 'bin/behat';

var dirType = 'products';
var profile = 'local-jse-dev';
var suite = 'deploy';
var features = 'features/'
var behatDir = '';
var startDir = pwd();
var dryrun = '';
var cmd = '';

program
  .version('0.0.1')
  .arguments('<directory>')
  .action(function (directory) {
     dirName = directory;
   })

   // linky_clicky specific options
  .option('--paths <items>', 'List of paths to execute tests', paths)
  .option('--directory-type <type>', 'Can be product, site, or environment')

  // Behat specific options.
  .option('-p, --profile <type>', 'Profile')
  .option('-s, --suite <type>', 'Suite', suite)
  .option('-v, --verbose', 'Verbose')
  .option('-o, --out <type>', 'Write output to a file')
  .option('--dryrun', 'Dry Run', dryrun)
  .parse(process.argv);

  if (typeof dirName === 'undefined') {
   console.error('no command given!');
   process.exit(1);
  }
  else {
    behatDir = linkyClickyDir + '/' + dirType + '/' + dirName;
  }

  console.log('\nprogram.profile: ' + program.profile);
  if (program.profile) profile = program.profile;
  if (program.suite) suite = program.suite;
  if (program.profile) profile = program.profile;

  if (program.dryrun) dry_run = '--dryrun';

//if (program.pineapple) console.log('  - pineapple');
//if (program.bbqSauce) console.log('  - bbq');

cmd = behat + ' -p ' + profile + ' -s ' + suite + ' ' + dryrun + ' ' + features;
console.log('\nRunning with: '
  + '\nlinky-clicky directory: ' + linkyclickydir
  + '\nbehat: ' + behat
  + '\nbehat.local.yml: ' + behatlocalyml
  + '\nstartdir: ' + startdir
  + '\ncommand: ' + cmd
  + '\n');

cd(behatDir);
//exec(cmd);
cd(startDir);
