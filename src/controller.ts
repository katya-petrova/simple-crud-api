import { data } from './data';
import { v4 as uuidv4 } from 'uuid';
import { IPerson } from './interface';

export class Controller {
  async getAllPersons() {
    return new Promise((resolve, _) => resolve(data));
  }

  async getPerson(id: string) {
    return new Promise((resolve, reject) => {
      let person = data.find((person) => person.id === id);
      if (person) {
        resolve(person);
      } else {
        reject(`Person with id ${id} not found `);
      }
    });
  }

  async createPerson(person: IPerson) {
    return new Promise((resolve, reject) => {
      const requiredFields = ['name', 'age', 'hobbies'];
      let newPerson = {
        ...person,
        id: uuidv4(),
      };
      for (let i = 0; i < requiredFields.length; i++) {
        const fields = Object.keys(newPerson);
        if (!fields.includes(requiredFields[i])) {
          reject(`Some required fields ${requiredFields[i]} are missing`);
          return;
        }
      }
      data.push(newPerson);
      resolve(newPerson);
    });
  }

  async updatePerson(id: string, body: string) {
    return new Promise((resolve, reject) => {
      let person = data.find((person) => person.id === id);

      if (!person) {
        reject(`No person with id ${id} found`);
      }

      let updatedPerson = JSON.parse(body);
      updatedPerson['id'] = id;

      const foundIndex = data.findIndex((x) => x.id == id);
      data[foundIndex] = updatedPerson;

      resolve(updatedPerson);
    });
  }

  async deletePerson(id: string) {
    return new Promise((resolve, reject) => {
      let person = data.find((person) => person.id === id);
      if (!person) {
        reject(`Person with id ${id} is not found`);
      }
      resolve(`Person with id ${id} was deleted successfully`);

      data.splice(data.indexOf(person!), 1);
    });
  }
}
