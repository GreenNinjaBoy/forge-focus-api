## Forge Focus Api
Created by Jamie Connell Student of CodeInstitute 2024

This is an API which will provide full CRUD functionality for the management of task data. This will include areas such as goals, and sub categories within a users main goal. This API utilizes the Django-Rest-Framework and is created to provide backend functionality to the "Forge Focus" application. 

**Link for API will go here when available**
**Link for deployed Heroku App will go here when available**
**Link for frontend react repository will go here when available**

## Table of Contents
- [Design of the API](#Design-of-the-API)
- [API Features](#API-Features)
- [Future Features For API](#Future-Features-for-API)
- [Lanuages Used](#Lanuages-Used)
- [Frameworks and Libraries Used](#Frameworks-and-Linraries-used)
- [Tools and Technologies Used](#Tools-and-Technologies-Used)
- [Validatrion and Testing](#Validation-and-Testing)
- [Known Bugs and Fixes](#Known-Bugs-and-Fixes)
- [Deployment](#deployment)
    - [Cloning Repository](#Cloning-Repository)
        - [CodeAnywhere](#CodeAnywhere)
        - [GitPod](#Gitpod)
    - [Forking Repository](#Forking-Repository)
- [Connecting to this API](#Connecting-to-this-API)
- [Credits](#Credits)
- [Acknowledgements](#Acknoledgements)

## Design of the API

### Aim

The aim of the API is to store task data that includes setting areas to refine ("Refine"), goals and assignments, and 
provide a full range of CRUD functionality to any linked applications.  

### Considerations when creating



## API Features

### Security Features

Only the following can be accessed by users who are not authenticated, all other endpoints of the API
can be accessed if a user has created an account and is authorised.

- The base root, This give the user a welcome message and a some information
- The /dj-rest-auth/registration/ endpoint, this will allow new users to register to the application.
- The /dj-rest-auth/login/ endpoint, which allows registered users to log in.

Only owners of a data instance can access any CRUD functionality related to it. All get requests
made by a user/owner will return a list with only the items belonging to that user/owner. 
Any requests made by a user/owner for a specific item that user/owner does not own will be denied.