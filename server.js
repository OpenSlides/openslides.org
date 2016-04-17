// initiate express app
var express = require('express');

var app = express();

// serve static files
app.use('/static', express.static(__dirname + '/public/static'));

// server main entry point index.html
app.get('/*', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

// start server
app.listen(8080, function () {
    console.log ('Server listening on http://localhost:8080/');
});
