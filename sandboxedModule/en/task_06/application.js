// File contains a small piece of the source to demonstrate main module
// of a sample application to be executed in the sandboxed context by
// another pice of code from `framework.js`. Read README.md for tasks.

var util = require('util')

// Print from the global context of application module
console.log('From application global context');

console.log(util.isFunction(function() {}))

module.exports = function() {
	// Print from the exported function context
  console.log('From application exported function');
};
