'use strict'

//引入hello模块
var Hello = require('./hello');
var hello = new Hello();
hello.setName('Zhous');
hello.sayHello();

var s = '6,11,36,46,51,56,66,76,81,86,101,106,126,131,136,151,161,166,191,206,231,241,251,266,271,276,291,296,306,311,326,371,381,396,421,436,456,461,471,486,541,546,601,661,676,691,706,771,931,1056,1061,1211';
var array = s.split(',');
console.log(array.length);