# Hackerbay-Microservice-Project

[![Build Status](https://travis-ci.org/gmemmy/HackerBay-Microservice-Project.svg?branch=develop)](https://travis-ci.org/gmemmy/HackerBay-Microservice-Project)
[![Coverage Status](https://coveralls.io/repos/github/gmemmy/Microservice-Backend/badge.svg?branch=develop)](https://coveralls.io/github/gmemmy/Microservice-Backend?branch=develop)

# Hackerbay Microservice Project
This is a microservice that entails the following features:
* Authentication(with jwt generation).
* JSON Patching.
* Image Thumbnail Generation.

### Technologies
* [Es6+ Javascript](https://www.ecma-international.org/ecma-262/9.0/index.html) The project was written with ES6 syntax and above.
* [Node/Express](https://nodejs.org/en/) A JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Swagger](https://swagger.io/) Used for API documentation. Simplify API development for developers by helping to document APIs.
* [NPM](https://www.npmjs.com/) Used as the package manager for the app. A fast, reliable, and secure dependency management system.

### REST API Docs
The Api documentation is done using swagger. It can be viewed locally on - `localhost:3000/api-docs`

### JWT Authentication
The API endpoints are being authenticated using [JWT(Json Web Token)](https://jwt.io/).

### Required Features

```
A user can sign in.
An authorized user can patch json objects.
An authorized user can generate image thumbnails.
```

## Installation and Running the Application

* Clone the repository using: `git clone https://github.com/gmemmy/HackerBay-Microservice-Project.git`
* `cd` into the project directory.
* Run `npm install` To install the project dependencies.
* Run `npm dev-start` To start the application in development environment and `npm start` to start the production environment.
* Run `npm run test` to run tests.

## Author
* [Atawodi Emmanuel](https://github.com/gmemmy)
