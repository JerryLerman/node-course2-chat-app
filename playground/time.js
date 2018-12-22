const moment = require('moment');

// var date = moment();
// console.log(date.format('h:mm a'));

//var createdAt = new Date().getTime();
var createdAt = moment().valueOf();
var date = moment(createdAt);
console.log(date.format("dddd, MMMM Do YYYY, h:mm:ss a"));
