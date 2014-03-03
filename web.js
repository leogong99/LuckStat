var gzippo = require('gzippo');
var express = require('express');
var app = express(); 
app.use(express.logger('dev'));
app.use(gzippo.staticGzip("luckStat/dist"));
app.listen(process.env.PORT || 5000);