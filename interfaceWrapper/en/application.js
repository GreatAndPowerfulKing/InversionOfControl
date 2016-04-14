
fs.appendFile("output.txt", "Some text", function(args) {
	console.log("From fs append");
});

var fileName = './README.md';
console.log('Application going to read ' + fileName);
var interval = setInterval(function () {
		fs.readFile(fileName, function(err, src) {
		console.log('File ' + fileName + ' size ' + src.length);
	});
}, 1000)

var timeout = function () {
	setTimeout(function () {
		clearInterval(interval);
	}, 10000);
};

timeout();