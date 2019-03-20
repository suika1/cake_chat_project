var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', line => {
    console.log('from node', JSON.stringify(JSON.parse(line), null, 2 ));
})
