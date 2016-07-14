#!/usr/bin/env node
// https://www.npmjs.com/package/shelljs
require('shelljs/global');

//https://www.npmjs.com/package/commander
var program = require('commander');

//https://www.npmjs.com/package/config
var config = require('config');

// Defaults
var linkyClickyDir = config.get('linky_clicky.rootdir');
var behatLocalYml = config.get('linky_clicky.behatLocalYml');;
var environment = config.get('environment');
var behat = linkyClickyDir + 'bin/behat';

var cmd = '';
var behatDir = '';
var dirType = 'products';
var dirTypes = ['products', 'sites', 'environment'];
var dryrun = '';
var outFile = '';
var profile = '-p local-jse-dev';
var suite = '-s deploy';
var paths = 'features'
var startDir = pwd();
var tags = '';
var verbose = '';



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
  .option('--tags <name>', 'List of Tags')
  .option('-v, --verbose', 'Verbose')
  .parse(process.argv);

  if (typeof dirName === 'undefined') {
   console.error('Error: missing directory');
   process.exit(1);
  }

  if (program.dryrun) dry_run = '--dryrun';
  if (program.out) outFile = '-o ' + program.out;
  if (program.paths) paths =  program.paths;
  if (program.profile) profile = '-p ' + program.profile;
  if (program.suite) suite = '-s ' + program.suite;
  if (program.suite) tags = '--tags ' + program.suite;
  if (program.verbose) verbose = '-v';

  if (program.directorytype) dirType = program.directorytype;
  if (dirTypes.indexOf(dirType) === -1) {
   console.error("Error: %j directory type is not available. Availble directories are: %s",
     dirType, dirTypes.toString());
   process.exit(1);
  }

behatDir = linkyClickyDir + dirType + '/' + dirName;

cmd = behat + ' '
  + dryrun + ' '
  + outFile + ' '
  + profile + ' '
  + tags + ' '
  + suite + ' '
  + verbose + ' '
  + paths;

  if (verbose == '-v') {
    console.log('\nUsing: '
    + '\nlinky-clicky directory: ' + linkyClickyDir
    + '\nbehat: ' + behat
    + '\nbehat.local.yml: ' + behatLocalYml
    + '\nBehat Directory: ' + behatDir
    + '\nenvironment: ' + environment
    + '\ncommand: ' + cmd
    + '\n');
  }

cd(behatDir);
exec(cmd);
if (environment == 'shinydevbox') {
  exec('kill -9 $(lsof -ti tcp:4444)');
}
cd(startDir);
