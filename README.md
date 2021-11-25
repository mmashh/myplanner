# MyPlanner: An organizational tool to simplify calendars and notes

## Note
This project was created as a final project for CMPT 470 Fall 2021 by the following Group 12 members: sza11, deva, mmashur, jacebedo

## Instructions to Run (Development mode)
- The following instructions assumes that the application is coming directly from git. Thus, all instructions must be ran successfully.
- Both CLI must remain open during testing. This is only for the development version of MyPlanner and will be deployed in a more production-ready fashion in the near future.

### Part 1: Server
1. Open up the CLI of your choice (Terminal/CMD)
2. Navigate to `~/myplanner/server`
3. Run the command `pip install -r ./requirements.txt` to install all dependency packages. Wait for the packages to finish downloading.
4. Run the command `python app.py` to start the server.
5. Keep the CLI open during testing.

### Part 2: Client
1. Open up a **separate** CLI of  your choice (Different from the CLI used in part 1).
2. Navigate to `~/myplanner/client`
3. Run the command `npm install` to install all dependency packages. Wait for the packages to finish downloading.
4. Run the command `npm start` to start the client server
5. Keep the CLI open during testing
6. Navigate to https://localhost:3000/ to view the application in your browser.

## Testing Information
The tester must register for an account using the UI. Navigate to https://localhost:3000/register to register for an account (once the application is running)

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