// File contains a small piece of the source to demonstrate main module
// of a sample application to be executed in the sandboxed context by
// another pice of code from `framework.js`. Read README.md for tasks.

var util = require('util')

// Print from the global context of application module
console.log('From application global context');

console.log(util.isFunction(function() {}))

module.exports = {};

module.exports.someFunction = function(unusedParametr) {
	// Print from the exported function context
  console.log('From application exported function');
};

module.exports.anotherFunction = function(firstUnusedParametr, secondUnusedParametr) {
	// Print from the exported function context
  console.log('From application exported function');
};

module.exports.oneMoreFunction = function(unusedParametr) {
	// Print from the exported function context
  console.log('From application exported function');
};

var someVar = 5;

module.exports.someVar = someVar;
