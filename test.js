// function first() {
// 	var time = Date.now();
// 	console.log("start first");
// 	while (Date.now() - time < 10000) {}
// 	console.log("end first");
// }
//
// function second() {
// 	console.log("second");
// }
//
// function third() {
// 	console.log("third");
// }
//
// second();
// var promise = new Promise(function(resolve, reject) {
// 	first();
// 	console.log("handle promise");
// 	resolve(true);
// });
// promise.then(function() {
// 	console.log("then promise");
// });
// third();

let cho_muon_tien = new Promise(function(resolve, reject) {
	console.log('cho muon tien');
	resolve(true);
});

cho_muon_tien.then(function(tien) {
	let mua_dien_thoai = new Promise(function(resolve, reject) {
		console.log('mua dien thoai');
		resolve(true);
	});

	mua_dien_thoai.then(function(dien_thoai) {
		console.log('cho ban muon');
	});
});
