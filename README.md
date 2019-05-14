#NodeJs TypeORM CRUD API
	
***Create and deploy  your nodejs rest Api in Seconds***
 
---
 
 ## Description
 Simple yet powerful REST Api for Nodejs. The Project is simple, easy to setup and should give you a general knowledge about the TypeORM. It helps you to get a rest API with 
 
 ---

## Main Features

- **Multiple DB Support**
    - Your can use the DB of your choice and set it up in minutes
- **Express Server**
    - The TypeORM uses the Expressjs Server under the hood, so previous knowledge in using Express comes in handy
- **TypeScript and JavaScript support**
    - The Project uses Typescript by default, so basic type checking and Architerual layout for your project is available. Javascript might be used optionally
- **Lightweight**
    - Very little dependencies to get started, other dependencies can be added depending on your preference.
- **Middlewares andvance Routing**
    - Basic Authentication and Validation Middlewares comes pre-configured with their respective API's
- **Other TypeORM features**
    - Since the Project uses TypeORM, you get access to other TypeORM features.

 - **Other Features**
    - produced code is performant, flexible, clean and maintainable
	- follows all possible best practices
	- migrations and automatic migrations generation
    - works in NodeJS / Browser / Ionic / Cordova / React Native / NativeScript / Expo / Electron platforms
  

---

## Prerequisites
--
**Basic Knowledge of TypeScript is essential but not compulsory**

To use project you need:

1. TypeORM
2. Nodejs v10.*
3. Mysql or Any Database of your Choice
 
---



## Installation

#### Installing Typeform
```javascript
npm install typeform -g
```
---
#### To make use of nodemon auto-reload
```javascript
npm install ts-node -g
```
---

---
#### Start the Server [run nodemon in CLI]
```javascript
nodemon
```
---

#### Configuration Ormconfig.json
```JSON
{
   "type": "mysql",
   "host": "localhost",
   "port": 3306,
   "username": "root",
   "password": "",
   "database": "typeorm",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
```
---

 
 ## Notes
 
1. For api testing and development an API testing tool is required. Insomnia or Postman Recommended 

> Found a bug? Please, report it here https://github.com/ceeghee/NodeJs-TypeORM-CRUD-Server/issues

---

## Author

* **Goodluck Ekene**  

---


## Support

* Github: https://github.com/ceeghee/NodeJs-TypeORM-CRUD-Server/issues
* Email: goodluck.ekene@gmail.com

---


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

---

## License
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](/LICENSE)

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details