// Wrapping function and interface example

var fs = require('fs'),
    vm = require('vm');

var calls = 0;

function cloneInterface(anInterface) {
  var clone = {};
  for (var key in anInterface) {
    clone[key] = wrapFunction(key, anInterface[key]);
  }
  return clone;
}

function wrapFunction(fnName, fn) {
  return function wrapper() {
    calls++;
    var args = [];
    Array.prototype.push.apply(args, arguments);
    var callback = args[args.length - 1];
    if (typeof(callback) ===  "function") {
      args[args.length - 1] = function() {
        var callbackArgs = arguments;
        console.log(callbackArgs);
        callback.apply(undefined, callbackArgs);
      }
    }
    console.log('Call: ' + fnName);
    console.dir(args);
    return fn.apply(undefined, args);
  }
}

var interval = setInterval(function() {
  console.log("\nCalls count: " + calls + "\n");
}, 3000)

var timeout = function () {
  setTimeout(function () {
    clearInterval(interval);
  }, 15000);
};

timeout();

// Create a hash for application sandbox
var context = {
  module: {},
  console: console,
  // Forward link to fs API into sandbox
  fs: cloneInterface(fs),
  setTimeout: setTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval
};

// Turn hash into context
context.global = context;
var sandbox = vm.createContext(context);

// Read an application source code from the file
var fileName = './application.js';
fs.readFile(fileName, function(err, src) {
  // Run an application in sandboxed context
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
});
