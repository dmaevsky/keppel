
var fs = require('fs');
var Parser = require('rd-parse');
var Grammar = require('../grammar');
var toHTML = require('../htmlgen');

var dumpState = function(r) {
  var output = '';
  for (; r; r = r.next) {
    if (r.name) output += r.name + ': ' + (r.value || 'here') + '\n';
  }
  return output;
}

try {
  var text = fs.readFileSync(process.argv[2], {encoding: 'utf-8'});
  var parser = new Parser(Grammar);
  var head = parser.input(text).parse();
  // console.log(dumpState(head));
  console.log(toHTML(head));
}
catch (err) {
  console.log(err.message);
  console.log(err.$);
}
