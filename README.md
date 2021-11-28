# simple-crud-api

## run server

1. npm i
2. npm run start:dev
3. server should run on port 3000

## how it works

- **GET** /person or /person/${personId} should return status code 200 and all persons(or an empty array if threre are no persons) 
- **GET** /person/${personId} 
 should return status code 200 person with corresponding personId
 should return status code 400 with error message if personId is invalid (or not uuid)
 should return status code 404 with error message if if there's no person with corresponding personId

- **POST** /person should return status code 200 and create a record about new person and store it in database (fields name, age and hobbies are **required**)
 if there're no required fields server should return status code 400 and corresponding message

- **PUT** /person/${personId} should update record about existing person and return status code 200
 should return status code 400 with error message if personId is invalid (or not uuid)
 should return status code 404 with error message if if there's no person with corresponding personId

- **DELETE** /person/${personId} should delete record about existing person from database
 should return status code 400 with error message if personId is invalid (or not uuid)
 should return status code 404 with error message if if there's no person with corresponding personId

## run tests

1. npm run test