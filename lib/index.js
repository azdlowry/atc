var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var url = require('url');

app.listen(process.env.PORT || 8080);

function handler(req, res) {
    var fileName = 'index.html';

    var requestPath = url.parse(req.url).pathname;

    if (requestPath != '/') {
        fileName = requestPath.substr(1);
    }

    fs.readFile(__dirname + '/../assets/' + fileName,
        function(err, data) {
            if (err) {
                console.log(err);

                res.writeHead(500);
                return res.end('Error loading file');
            }

            if (fileName.substr(fileName.length - 3) === '.js') {
                res.setHeader('Content-Type', 'text/javascript');
            } else if (fileName.substr(fileName.length - 4) === '.css') {
                res.setHeader('Content-Type', 'text/css');
            }

            res.writeHead(200);
            res.end(data);
        });
}
