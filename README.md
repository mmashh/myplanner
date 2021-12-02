# MyPlanner: An organizational tool to simplify calendars and notes

## Note

This project was created as a final project for CMPT 470 Fall 2021 by the following Group 12 members: sza11, deva, mmashur, jacebedo

## Instructions to Run (docker version)

- Dockerization is not finalized.
- In case docker does not work properly, please follow the instructions on Development mode section.

1. Navigate to the directory containing `docker-compose.yml`
2. (Optional) `docker-compose down && docker system prune -f`
3. `docker-compose build && docker-compose up`
4. Navigate to http://localhost:3000/ to view the application in your browser.
5. Swagger doc is available on http://localhost:5000/apidocs

## Completed Features

The features that have been completed for the checkpoint are as follows:

1. Register
  - One may directly log in as one of the sample users below or alternatively,
  may create a new user.
  - The user can register by navigating to http://localhost:3000/register or clicking on the register button from the login page. 
  - Then the user can enter a new username and password to create a new user on the registration page. Each user has their own items/calendar events.
2. Login
  - The user can login by navigating to http://localhost:3000/ or http://localhost:3000/login.
  - If the user attempts to access any part of the site while not logged in, the application will redirect the user to the login page.
3. Items
  - The items functionality allows the user to make tasks or notes in an easy interactive way
  - This feature is accessible by clicking on the "items" link in the navbar once logged in, or through http://localhost:3000/items/
  - The application currently supports the following:
    - The creation of tasks through the form on the left-hand side. The user can make either a task (for marking things as "completed") or a note.
    - Mark completed task items as complete by ticking/unticking the checkbox on the left side of each list item.
    - The ability to view the entirety of the task/note item. This is done by clicking on the list icon and selecting "View".
    - The ability to edit the task/note item by clicking on the list icon and selecting "Edit"
    - The ability to delete the task/note item by clicking on the list icon and selecting "Delete"
4. API Documentation
  - The available API's used by the application is documented and accessible to new/existing developers.
  - To access the API documentation, navigate to "http://localhost:5000/apidocs/".
  - Note that any user who is not logged through the applciation in will not be able to access the API's through postman/curl/etc.


## Goals for the Final Implementation

- Add the calendar functionality and with the stretch goals listed in the project proposal implemented.
- Extend security features past user authorization: Form validation, CSRF, etc.
- Extend data integrity of the application: Preventing null inputs, etc.
- Make the application more responsive to smaller screen sizes/different aspect ratio.

## Instructions to Run (Development mode)

- The terminal must remain open during testing. This is only for the development version of MyPlanner and will be deployed in a more production-ready fashion in the near future.

### Part 1: Server

1. Open up a terminal window
2. Once in this directory, navigate to `./myplanner/server`
3. Run the command `pip install -r ./requirements.txt` to install all dependency packages. Wait for the packages to finish downloading.
4. Run the command `python app.py` to start the server.
5. Keep the CLI open during testing.

### Part 2: Client

1. Open up a **separate** terminal window (Different from the terminal window used in part 1).
2. Once in this directory, navigate to `./myplanner/client`
3. Run the command `npm install` to install all dependency packages. Wait for the packages to finish downloading.
4. Run the command `npm start` to start the client server
5. Keep the CLI open during testing
6. Navigate to http://localhost:3000/ to view the application in your browser. It may take a minute for all of the react scripts to compile.

## Testing Information
The tester must register for an account using the UI. Navigate to http://localhost:3000/register to register for an account (once the application is running)

## Database Information & Sample Users
<h1> Application Server Information </h1>
<br>

<ul>
<li> The application/backend server is available at http://127.0.0.1:5000 </li>
<li> The documentation for the exposed endpoints are at http://localhost:5000/apidocs/#/ </li>
</li>
</ul>

## Sample  Users
<p> The following sample data is available for users </p>

<table>
    <tr>
    <td>id</td>
    <td>username</td>
    <td>password</td>
    </tr>
    <tr>
    <td>1</td>
    <td>user1234</td>
    <td>user1234</td>
    </tr>
    <tr>
    <td>2</td>
    <td>user5678</td>
    <td>user5678</td>
    </tr>
</table>
    
## Database Information 
<p> The following sample data is available for list items </p>

<table>
    <tr>
    <td>item_id</td>
    <td>title</td>
    <td>body</td>
    <td>item_type</td>
    <td>is_complete</td>
    <td>date_created</td>
    <td>created_by</td>
    </tr>
    <tr>
    <td>1</td>
    <td>Demo-note</td>
    <td>sample text</td>
    <td>NOTE</td>
    <td>null</td>
    <td>23/11/2021 19:01</td>
    <td>1</td>
    </tr>
    <tr>
    <td>2</td>
    <td>Demo-note</td>
    <td>sample text</td>
    <td>NOTE</td>
    <td>null</td>
    <td>23/11/2021 19:01</td>
    <td>2</td>
    </tr>
    <tr>
    <td>3</td>
    <td>Demo-task</td>
    <td>sample text</td>
    <td>TASK</td>
    <td>TRUE</td>
    <td>23/11/2021 19:02</td>
    <td>2</td>
    </tr>
</table>

## Special Thanks To:
- The CMPT 470 Fall 2021 Teaching Staff: ggbaker, lirongl, gna17 

### Server
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- [Flask-RESTful](https://github.com/flask-restful/flask-restful)
- [Flask-JWT-Extended](https://github.com/vimalloc/flask-jwt-extended)
- [Flasgger](https://github.com/flasgger/flasgger)
- [Flask-CORS](https://github.com/corydolphin/flask-cors)
- [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)

### Client
- [Axios](https://axios-http.com/)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [React-Bootstrap-Icons](https://github.com/ismamz/react-bootstrap-icons)
- [React](https://reactjs.org/)
- [React-Router](https://github.com/remix-run/react-router)
- [Fullcalendar](https://github.com/fullcalendar/fullcalendar-react)
