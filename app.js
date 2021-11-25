require('dotenv').config();
const http = require("http");
const PORT = process.env.PORT || 3000; //should we remove default value?


const server = http.createServer(async (req, res) => {

    if (req.url === "/api" && req.method === "GET") {
        //response headers
        res.writeHead(200, { "Content-Type": "application/json" });
        //set the response
        res.write("Hi there, this is a simple CRUD API");
        //end the response
        res.end();
    }

    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Page not found" }));
    }
});

// server.listen(PORT, () => {
//     console.log(`server started on port: ${PORT}`);
// });

const start = async () => {
    try {
      server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
      console.log(error);
    }
  };

  start();