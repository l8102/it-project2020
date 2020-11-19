Repository for IT Project Semester 2 2020

# Eagle Solutions E-Portfolio System

## Table of contents
* [Team Members](#team-members)
* [General Info](#general-info)
* [Technologies](#technologies)
* [Accessing the Project](#accessing-the-project)
* [Running the Project locally](#running-the-project-locally)
* [Project Explorer](#project-explorer)


## Team Members

| Name |
| :--- |
| Glenn Phillips |
| Gemma Seeley |
| Michael Lowe |
| Jasmine Bond |

## General info
This project is to generate an online e-portfolio system for students to upload their work and for teachers to browse students work. We want this project to be a showcase of the efforts made by students over their university career and for them to use on their resume.

## Technologies
Project is created with:
* Mongo Database
* Express
* React
* Node
* Heroku

## Accessing the Project
The project can be accessed at: https://eaglesolutions.herokuapp.com


## Running the Project locally

To run the project locally you will have to follow these steps:
1. Clone the repository onto your local device. 
2. Open a terminal and navigate to the folder where you cloned the project (The same folder as this README file)
3. Input the following command: 
```Lex
npm run dev
```

The dev command is a npm start script we developed so that the project can access and run both the backend and frontend simultaneously.
More command scripts can be found in the package.json file.


## Project Explorer

The project has been seperated into two main folders, the **backend** and the **frontend** 

#### Backend
The backend folder is where we link the frontend client side of the project to the MongoDB database. The app.js initialises and imports all the elements needed to secure a connection to the database. 
The rest of the backend has been split into different folders to seperate the functionality of these files. They are:
* Controllers: The files that create, read, update and delete files in the database
* Models: The files that create a new Schema to be added to the database
* Routes: The link between the frontend Api.js file and the backend that accepts an axios request and redirects the request to the appropriate controller.

To start the backend locally, navigate into the backend folder and run the following command in your terminal:
```Lex
npm start
```

#### Frontend
The frontend folder is where the client side of the project is stored along with the styling and seperate pages. 

The public folder includes intialising files such as the google authitentication link to the google developer console.
The src folder includes:
* Assets: Image files used in the project
* Components: Various objects that are used throughout the project
* Css: The styling files for all the different pages and elements
* Pages: The different pages a user can come across on the website
* Tests: .test files used when running npm test
* Api.js: Axios functions that send and retrieve information from the backend
* App.js: Intialising the website

To start the frontend locally, navigate into the frontend folder and run the following command in your terminal:
```Lex
npm start
```
