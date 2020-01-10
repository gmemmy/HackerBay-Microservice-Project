# Hackerbay-Microservice-Project

[![Build Status](https://travis-ci.org/gmemmy/HackerBay-Microservice-Project.svg?branch=develop)](https://travis-ci.org/gmemmy/HackerBay-Microservice-Project)
[![Coverage Status](https://coveralls.io/repos/github/gmemmy/Microservice-Backend/badge.svg?branch=develop)](https://coveralls.io/github/gmemmy/Microservice-Backend?branch=develop)

# Hackerbay Microservice Project
This is a microservice that entails the following features:
* Authentication(with jwt generation).
* JSON Patching.
* Image Thumbnail Generation.

Local Server - `localhost:3000`
## API Endpoints
### Default route - `/api/v1`
#### Type of Request - `GET`
#### Success response(Status code 200) - 
`{`<br>
   `"success": true,`<br>
   `"message": "Welcome to the Microservice Project"`<br>
`}`

### Authentication(Login Route) - `/api/v1/login`
#### Type of Request - `POST`
#### Required parameters - `username, password`
#### Success response(status code 200) - 
{<br>
    `"data": {`<br>
      `"success": true,`<br>
      `"message": "Login successful!",`<br>
      `"user": {`<br>
      `"username": "username"`<br>
      `},`<br>
      `"token": "*****************"`<br>
   `}`<br> 
`}`
#### Missing required paramaters/ invalid values inputed(status code 400) - 
`{`<br>
    `"success": false,`<br>
    `"message": "Invalid request! 'username' field is required"`<br>
`}`
### JSON Patching - `/api/v1/patch`
#### Type of Request - `POST`
#### Required paramters - `JSON Object, authentication token`
#### Success response(status code 200) - 
`{`<br>
    `"data": {`<br>
        `"success": true,`<br>
        `"message": "JSON object patched successfully!",`<br>
        `"patchedDoc": {`<br>
            `"baz": "I've been all patched up!",`<br>
            `"foo": "bar"`<br>
        `}`<br>
    `}`<br>
`}`
#### Missing/ invalid authentication token(status code 401) - 
`{`<br>
    `"status": 401,`<br>
    `"success": false,`<br>
    `"message": "User not authorized"`<br>
`}`
#### Error response if the request body is not a JSON object(status code 400) - 
`{`<br>
    `"success": false,`<br>
    `"message": "Invalid! Only JSON objects are supported."`<br>
`}`
### Image Thumbnail Generation - `/api/v1/thumbnail`
#### Type of Request - `POST`
#### Required parameters - `image(Public image URL), authentication token`
#### Success response(status code 200) - 
`{`<br>
   `"data": {`<br>
    `"success": true,`<br>
    `"message": "Thumbnail image generated successfully!",`<br>
    `"thumbnail": {`<br>
      `"type": "Buffer",`<br>
      `"data": [***********************]`<br>
    `}`<br>
  `}`<br>
`}`
#### Missing/ invalid authentication token(status code 401) - 
`{`<br>
    `"status": 401,`<br>
    `"success": false,`<br>
    `"message": "User not authorized"`<br>
`}`
#### Missing required paramaters/ invalid values inputed(status code 400) - 
`{`<br>
    `"success": false,`<br>
    `"message": "Invalid request! 'image' field is required"`<br>
`}`
#### Error if the value passed into the image field is not a public image URL - 
`{`<br>
    `"success": false,`<br>
    `"message": "Invalid! Please input a public image URL"`<br>
`}`
#### Can be tested with this URL in the image field - https://www.google.com/images/srpr/logo3w.png

## Technologies
* [Es6+ Javascript](https://www.ecma-international.org/ecma-262/9.0/index.html) The project was written with ES6 syntax and above.
* [Node/Express](https://nodejs.org/en/) A JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Swagger](https://swagger.io/) Used for API documentation. Simplify API development for developers by helping to document APIs.
* [NPM](https://www.npmjs.com/) Used as the package manager for the app. A fast, reliable, and secure dependency management system.

## REST API Docs
The API documentation is done using swagger. It can be viewed locally on - `localhost:3000/api-docs`

## JWT Authentication
The API endpoints are being authenticated using [JWT(Json Web Token)](https://jwt.io/).

## Required Features

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
