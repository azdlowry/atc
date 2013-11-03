var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    url = require('url'),
    mime = require('mime');

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

            res.setHeader('Content-Type', mime.lookup(fileName));

            res.writeHead(200);
            res.end(data);
        });
}
