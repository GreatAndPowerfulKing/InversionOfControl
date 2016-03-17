// Example showing us how the framework creates an environment (sandbox) for
// appication runtime, load an application code and passes a sandbox into app
// as a global context and receives exported application interface

// The framework can require core libraries
var fs = require('fs'),
    vm = require('vm');

var outputPath = "./output.txt"

var args = process.argv.slice(2);

args.forEach(function(name) {
	// Create a hash and turn it into the sandboxed context which will be
	// the global context of an application
	var context = { module: {}, console: {} };
	context.global = context;
	var sandbox = vm.createContext(context);

	context.console.log = function(message) {
		fs.appendFile(outputPath, name + " " + (new Date()) + " " + message + "\n");
    	console.log(name + " " + (new Date()) + " " + message);
    }

    context.require = function(moduleName) {
    	fs.appendFile(outputPath, (new Date()) + " " + moduleName + "\n");
    	return require(moduleName);
    }

	var fileName = './' + name + '.js';

	fs.readFile(fileName, function(err, src) {
		// We need to handle errors here

		// Run an application in sandboxed context
		var script = vm.createScript(src, fileName);
		script.runInNewContext(sandbox);

		for (var key in sandbox.module.exports) {
			if (typeof(sandbox.module.exports[key]) == "function") {
				console.log(typeof(sandbox.module.exports[key]) + " " + key);
				var functionCode = sandbox.module.exports[key].toString();
				console.log("\tParametrs: " + functionCode.split('(', 2)[1].split(')', 1));
			};
		}
	})

	// We can access a link to exported interface from sandbox.module.exports
	// to execute, save to the cache, print to console, etc.
});
