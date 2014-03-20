var http = require('http'),
    httpProxy = require('http-proxy'),
    nodeStatic = require('node-static');

var connect = require('connect');
var bodyParser = connect.bodyParser();
var request = require('request');

//var TARGET = 'arduino.natur.cuni.cz';
var TARGET = '78.108.106.180';

var proxy = httpProxy.createProxyServer({target: "http://"+TARGET});

var express = require('express');
var app = express();


/* special method needs because of strange arguino connection closing */
function proxyPost(req, res) {
    bodyParser(req, res, function() {
        request({
            method: 'POST',
            url: 'http://'+TARGET+req.url,
            json: req.body,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Origin': 'http://'+TARGET,
                'Referer': 'http://'+TARGET+'/'
            }
        }, function (error, response, body) {
            res.statusCode = 200;
            res.end();
        });
    });
}

app.get(/^\/(sensors|triggers|DATA|config.jso|client.jso)/, function(req, res) {
    proxy.proxyRequest(req, res);
});
app.post(/^\/(sensors|triggers|DATA|config.jso|client.jso)/, function(req, res) {
    proxyPost(req, res);
});

app.use('/bower', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/src'));

app.listen(8000, function () {
    console.log("listening on port 8000");
});


