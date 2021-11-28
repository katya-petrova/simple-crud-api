require("dotenv").config();
const { validate: uuidValidate } = require("uuid");
const http = require("http");
const PORT = process.env.PORT || 3000;

const Controller = require("./src/controller");
const { getReqData } = require("./src/utils");

const codes = require('./src/status-codes')

const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const server = http.createServer(async (req, res) => {
  // /person : GET
  if (req.url === "/person" && req.method === "GET") {
    const persons = await new Controller().getAllPersons();
    res.writeHead(codes.Ok, { "Content-Type": "application/json" });
    res.end(JSON.stringify(persons));
  }

  // /person/:id : GET
  else if (req.url.match(/\/person\/([^\n]+)/) && req.method === "GET") {
    try {
      const id = req.url.split("/")[2];
      if (!uuidValidate(id)) {
        res.writeHead(codes.BadRequest, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: `id ${id} is not valid` }));
      }
      const person = await new Controller().getPerson(id);
      res.writeHead(codes.Ok, { "Content-Type": "application/json" });
      res.end(JSON.stringify(person));
    } catch (error) {
      console.log(error);
      res.writeHead(codes.NotFound, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /person/:id : DELETE
  else if (req.url.match(/\/person\/([^\n]+)/) && req.method === "DELETE") {
    try {
      const id = req.url.split("/")[2];
      if (!uuidValidate(id)) {
        console.log(id);
        res.writeHead(codes.BadRequest, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: `id ${id} is not valid` }));
      }
      let message = await new Controller().deletePerson(id);
      res.writeHead(codes.NoContent, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message }));
    } catch (error) {
      res.writeHead(codes.NotFound, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /person/:id : PUT
  else if (req.url.match(/\/person\/([^\n]+)/) && req.method === "PUT") {
    try {
      const id = req.url.split("/")[2];
      if (!uuidValidate(id)) {
        res.writeHead(codes.BadRequest, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: `id ${id} is not valid` }));
      }
      let body = await getReqData(req);
      let updated_person = await new Controller().updatePerson(id, body);
      res.writeHead(codes.Ok, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updated_person));
    } catch (error) {
      res.writeHead(codes.NotFound, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /person/ : POST
  else if (req.url === "/person" && req.method === "POST") {
    try {
      let person_data = await getReqData(req);
      let person = await new Controller().createPerson(JSON.parse(person_data));
      res.writeHead(codes.Created, { "Content-Type": "application/json" });
      res.end(JSON.stringify(person));
    } catch (error) {
      res.writeHead(codes.BadRequest, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  } else {
    res.writeHead(codes.NotFound, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = server;