'use strict'

//loadmodule.js
var hello1 = require('./module');
hello1.setName('Zhous');
var hello2 = require('./module');
hello2.setName('Zhous again');
hello1.sayHello();