const http = require('http');
const fs   = require('fs');

const server = http.createServer((request, response) => {
  fs.writeFile(
    __dirname + '/../data/headers.json', // 決定檔案存哪
    JSON.stringify(request.headers), // 要存檔的內容
    (err) => {
      if (err) {
        console.log(err);
        response.end('ERR'); // 要看什麼狀況 要給前端回應現在是什麼狀況
      } else {
        response.end('OK');
      }
    }
  );
  // fs.readFile(
  //   __dirname + '/../data/headers.json',
  //   (err, data) => {
  //     if (err) {
  //       response.writeHead(500, { "Content-Type": "text/plain" });
  //       response.end('500, data notfound');
  //     } else {
  //       response.writeHead(200, { "Content-Type": "text/html" });
  //       response.end(data);
  //     };
  //   }
  // )
});

server.listen(8888);
