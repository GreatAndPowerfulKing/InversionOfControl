// Example showing us how the framework creates an environment (sandbox) for
// appication runtime, load an application code and passes a sandbox into app
// as a global context and receives exported application interface

// The framework can require core libraries
var fs = require('fs'),
    vm = require('vm');


var substractArrays = function (first, second) {
	var substactionResult = first.slice();
	for (var element in second) {
		var index = substactionResult.indexOf(second[element]);
		if (index != -1) {
			substactionResult.splice(index, 1);
		}
	}
	return substactionResult;
}

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

    context.console.dir = console.dir;

    context.require = function(moduleName) {
    	fs.appendFile(outputPath, (new Date()) + " " + moduleName + "\n");
    	return require(moduleName);
    }

	var fileName = './' + name + '.js';

	fs.readFile(fileName, function(err, src) {
		// We need to handle errors here

		// Run an application in sandboxed context
		var initialKeys = Object.keys(sandbox);

		var script = vm.createScript(src, fileName);
		script.runInNewContext(sandbox);

		var newKeys = Object.keys(sandbox);
		console.log("Keys before application running: " + initialKeys.join(", "));
		console.log("Keys after application running: " + newKeys.join(", "));
		console.log("Added keys: " + substractArrays(newKeys, initialKeys).join(", "));
		console.log("Removed keys: " + substractArrays(initialKeys, newKeys).join(", "));
	})

	// We can access a link to exported interface from sandbox.module.exports
	// to execute, save to the cache, print to console, etc.
});
