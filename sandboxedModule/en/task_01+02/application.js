// File contains a small piece of the source to demonstrate main module
// of a sample application to be executed in the sandboxed context by
// another pice of code from `framework.js`. Read README.md for tasks.

// Print from the global context of application module
console.log('From application global context');

module.exports = function() {
	// Print from the exported function context
  console.log('From application exported function');
};

var timeOut = function () {
  setTimeout(function () {
    console.log("Hello from setTimeout");
  }, 5000);
};

var interval = function(){
  var intervalOutput = setInterval(function(){
    console.log("Hello from setInterval");
    console.log(util.format("Formated string using util: %s  %d", 'Hello, ', 2016));
  }, 1000);
  intervalOutput.unref();
};

timeOut();
interval();