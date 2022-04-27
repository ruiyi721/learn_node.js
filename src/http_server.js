const http = require('http');

// function start() {
//   function onRequest(request, response) {
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.write("Hello World123");
//     response.end();
//   }
//   http.createServer(onRequest).listen(8888);
// }

// let http = require('http');
// let server = http.createServer();
// server.listen(8888);

const server = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(`<h2>Hello123456</h2>
    <p>${request.url}</p>
  `);
});
server.listen(8888);
// exports.start = start;
