'use strict'

var name;
exports.setName = function (inName) {
	name = inName;
};
exports.sayHello = function () {
	console.log('Hello ' + name);
}