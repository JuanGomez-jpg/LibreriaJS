var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    //if (req.url === '/home' || req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);
   // }
    console.log('request was made: ' + req.url);

});

server.listen(3000, 'localhost');
console.log('yo dawgs, now listening to port 3000');





