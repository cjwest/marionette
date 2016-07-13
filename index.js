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
var dirTypes = ['products', 'sites', 'environment'];
var profile = 'local-jse-dev';
var suite = 'deploy';
var paths = 'features'
var outFile = '';
var verbose = '';
var behatDir = '';
var startDir = pwd();
var dryrun = '';
var cmd = '';

function paths(val) {
  return val.split(',');
}

program
  .version('0.0.1')
  .arguments('<directory>')
  .action(function (directory) {
     dirName = directory;
   })

   // linky_clicky specific options
  .option('--paths <items>', 'List of paths to execute tests', paths)
  .option('--directorytype <type>', 'Can be product, site, or environment')

  // Behat specific options.
  .option('-p, --profile <type>', 'Profile')
  .option('-s, --suite <type>', 'Suite')
  .option('-v, --verbose', 'Verbose')
  .option('-o, --out <type>', 'Write output to a file')
  .option('--dryrun', 'Dry Run')
  .parse(process.argv);

  if (typeof dirName === 'undefined') {
   console.error('Error: no directory given');
   process.exit(1);
  }

  console.log('\nprogram.profile: ' + program.profile);
  if (program.profile) profile = '-p ' + program.profile;
  console.log('\nprogram.suite: ' + program.suite);
  if (program.suite) suite = '-s ' + program.suite;
//  if (program.out) outFile = '-o ' + program.out;
  if (program.directorytype) dirType = program.directorytype;

  if (dirTypes.indexOf(dirType) === -1) {
   console.error('Error: ' + dirType
    + ' directory type is not available. Availble directories are: ' + dirTypes.toString());
   process.exit(1);
  }


  if (program.dryrun) dry_run = '--dryrun';

//if (program.pineapple) console.log('  - pineapple');
//if (program.bbqSauce) console.log('  - bbq');

behatDir = linkyClickyDir + dirType + '/' + dirName;

cmd = behat + ' '
  + profile + ' '
  + suite + ' '
  + dryrun + ' '
  + outFile + ' '
  + verbose + ' '
  + paths;

console.log('\nRunning with: '
  + '\nlinky-clicky directory: ' + linkyClickyDir
  + '\nbehat: ' + behat
  + '\nbehat.local.yml: ' + behatLocalYml
  + '\nstartdir: ' + startDir
  + '\nBehat Directory: ' + behatDir
  + '\ncommand: ' + cmd
  + '\n');

cd(behatDir);
//exec(cmd);
cd(startDir);
