// Example showing us how the framework creates an environment (sandbox) for
// appication runtime, load an application code and passes a sandbox into app
// as a global context and receives exported application interface

// The framework can require core libraries
var fs = require('fs'),
    vm = require('vm');

var args = process.argv.slice(2);

args.forEach(function(name) {
	// Create a hash and turn it into the sandboxed context which will be
	// the global context of an application
	var context = { module: {}, console: console };
	context.global = context;
	var sandbox = vm.createContext(context);

	var fileName = './' + name + '.js';

	fs.readFile(fileName, function(err, src) {
		// We need to handle errors here

		// Run an application in sandboxed context
		var script = vm.createScript(src, fileName);
		script.runInNewContext(sandbox);
	})

	// We can access a link to exported interface from sandbox.module.exports
	// to execute, save to the cache, print to console, etc.
});
