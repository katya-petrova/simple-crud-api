const data = require("./data");
const { v4: uuidv4 } = require("uuid");

class Controller {
  async getAllPersons() {
    return new Promise((resolve, _) => resolve(data));
  }

  async getPerson(id) {
    return new Promise((resolve, reject) => {
      let person = data.find((person) => person.id === id);
      if (person) {
        resolve(person);
      } else {
        reject(`Person with id ${id} not found `);
      }
    });
  }

  async createPerson(person) {
    return new Promise((resolve, reject) => {
      const requiredFields = ["name", "age", "hobbies"];
      let newPerson = {
        id: uuidv4(),
        ...person,
      };
      for (let i = 0; i < requiredFields.length; i++) {
        const fields = Object.keys(newPerson);
        if (!fields.includes(requiredFields[i])) {
          reject(`Some required fields ${requiredFields[i]} are missing`);
        }
      }
      data.push(newPerson);
      resolve(newPerson);
    });
  }

  async updatePerson(id, body) {
    return new Promise((resolve, reject) => {
      let person = data.find((person) => person.id === id);
      
      if (!person) {
        reject(`No person with id ${id} found`);
      }

      let updatedPerson = JSON.parse(body);
      updatedPerson['id'] = id; 
      
      resolve(updatedPerson);
    });
  }

  async deletePerson(id) {
    return new Promise((resolve, reject) => {
      let person = data.find((person) => person.id === id);
      if (!person) {
        reject(`Person with id ${id} is not found`);
      }
      resolve(`Person with id ${id} was deleted successfully`);
      
      data.splice(data.indexOf(person), 1)
    });
  }
}
module.exports = Controller;
