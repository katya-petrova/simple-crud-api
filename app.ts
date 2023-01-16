require('dotenv').config();
import { validate as uuidValidate } from 'uuid';
import http from 'http';
const PORT = process.env.PORT || 3000;

import { Controller } from './src/controller';
import { getReqData } from './src/utils';
import { StatusCodes as codes } from './src/status-codes';

export const server = http.createServer(
  async (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ): Promise<void> => {
    try {
      // /users : GET
      if (req.url === '/users' && req.method === 'GET') {
        const persons = await new Controller().getAllPersons();
        res.writeHead(codes.Ok, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(persons));
      }

      // /users/:id : GET
      else if (req.url?.match(/\/users\/([^\n]+)/) && req.method === 'GET') {
        try {
          const id = req.url.split('/')[2];
          if (!uuidValidate(id)) {
            res.writeHead(codes.BadRequest, {
              'Content-Type': 'application/json',
            });
            res.end(JSON.stringify({ message: `id ${id} is not valid` }));
          }
          const person = await new Controller().getPerson(id);
          res.writeHead(codes.Ok, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(person));
        } catch (error) {
          console.log(error);
          res.writeHead(codes.NotFound, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: error }));
        }
      }

      // /users/:id : DELETE
      else if (req.url?.match(/\/users\/([^\n]+)/) && req.method === 'DELETE') {
        try {
          const id = req.url.split('/')[2];
          if (!uuidValidate(id)) {
            console.log(id);
            res.writeHead(codes.BadRequest, {
              'Content-Type': 'application/json',
            });
            res.end(JSON.stringify({ message: `id ${id} is not valid` }));
          }
          let message = await new Controller().deletePerson(id);
          res.writeHead(codes.NoContent, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify({ message }));
        } catch (error) {
          res.writeHead(codes.NotFound, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: error }));
        }
      }

      // /users/:id : PUT
      else if (req.url?.match(/\/users\/([^\n]+)/) && req.method === 'PUT') {
        try {
          const id = req.url.split('/')[2];
          if (!uuidValidate(id)) {
            res.writeHead(codes.BadRequest, {
              'Content-Type': 'application/json',
            });
            res.end(JSON.stringify({ message: `id ${id} is not valid` }));
          }
          let body = (await getReqData(req)) as string;
          let updated_person = await new Controller().updatePerson(id, body);
          res.writeHead(codes.Ok, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updated_person));
        } catch (error) {
          res.writeHead(codes.NotFound, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: error }));
        }
      }

      // /users/ : POST
      else if (req.url === '/users' && req.method === 'POST') {
        try {
          let person_data = (await getReqData(req)) as string;
          let person = await new Controller().createPerson(
            JSON.parse(person_data)
          );
          res.writeHead(codes.Created, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(person));
        } catch (error) {
          res.writeHead(codes.BadRequest, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify({ message: error }));
        }
      } else {
        res.writeHead(codes.NotFound, { 'Content-Type': 'application/json' });
        res.end('Endpoint not found 😮');
      }
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: 'something went wrong :(' }));
    }
  }
);

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = server;
