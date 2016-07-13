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



program
  .version('0.0.1')
  .arguments('<directory>')
  .action(function (directory) {
     dirName = directory;
   })

   // linky_clicky specific options
  .option('--paths <items>', 'Space separated list of feature paths')
  //.option('--directorytype <type>', 'Can be product, site, or environment')
  .option('--directorytype [type]', 'Directory Types: ' + dirTypes.toString())


  // Behat specific options.
  .option('--dryrun', 'Dry Run')
  .option('-o, --out <file>', 'Write output to a file')
  .option('-p, --profile <name>', 'Profile')
  .option('-s, --suite <name>', 'Suite')
  .option('-v, --verbose', 'Verbose')
  .parse(process.argv);

  if (typeof dirName === 'undefined') {
   console.error('Error: missing directory');
   process.exit(1);
  }

  if (program.profile) profile = '-p ' + program.profile;
  if (program.suite) suite = '-s ' + program.suite;
  if (program.out) outFile = '-o ' + program.out;
  if (program.paths) paths =  program.paths;
  if (program.dryrun) dry_run = '--dryrun';
  if (program.verbose) verbose = '-v';

  if (program.directorytype) dirType = program.directorytype;
  if (dirTypes.indexOf(dirType) === -1) {
   console.error("Error: %j directory type is not available. Availble directories are: %s",
     dirType, dirTypes.toString());
   process.exit(1);
  }


behatDir = linkyClickyDir + dirType + '/' + dirName;

cmd = behat + ' '
  + profile + ' '
  + suite + ' '
  + dryrun + ' '
  + outFile + ' '
  + verbose + ' '
  + paths;

  if (verbose == '-v') {
    console.log('\nUsing: '
    + '\nlinky-clicky directory: ' + linkyClickyDir
    + '\nbehat: ' + behat
    + '\nbehat.local.yml: ' + behatLocalYml
    + '\nBehat Directory: ' + behatDir
    + '\ncommand: ' + cmd
    + '\n');
  }

cd(behatDir);
exec(cmd);
cd(startDir);
