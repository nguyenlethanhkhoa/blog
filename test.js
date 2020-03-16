function first() {
	var time = Date.now();
	console.log("start first");
	while (Date.now() - time < 10000) {}
	console.log("end first");
}

function second() {
	console.log("second");
}

function third() {
	console.log("third");
}

second();
var promise = new Promise(function(resolve, reject) {
	first();
	console.log("handle promise");
	resolve(true);
});
promise.then(function() {
	console.log("then promise");
});
third();
