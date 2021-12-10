# MyPlanner: An organizational tool to simplify calendars and notes

## Note

This project was created as a final project for CMPT 470 Fall 2021 by the following Group 12 members: sza11, deva, mmashur, jacebedo

## Instructions to Run (docker)

**For windows users, please note that `myplanner/server/entrypoint.sh` has LF ending.**

1. Navigate to the directory containing `docker-compose.yml`
2. (Optional) `docker-compose down && docker system prune -f`
3. `docker-compose build && docker-compose up`
4. Navigate to <http://localhost:8080/login> to view the application in your browser.
5. Swagger doc for backend API endpoints is available on <http://localhost:5000/apidocs/>

## Completed Features

The features that have been completed for the checkpoint are as follows:

1. Register
   - One may directly log in as one of the sample users below or alternatively, may create a new user.
   - The user can register by navigating to <http://localhost:8080/register> or clicking on the register button from the login page.
   - Then the user can enter a new username and password to create a new user on the registration page. Each user has their own items/calendar events.
2. Login
   - The user can login by navigating to <http://localhost:8080/> or <http://localhost:8080/login>.
   - If the user attempts to access any part of the site while not logged in, the application will redirect the user to the login page.
3. Items
   - The items functionality allows the user to make tasks or notes in an easy interactive way
   - This feature is accessible by clicking on the "items" link in the navbar once logged in, or through <http://localhost:8080/items/>
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

## Testing Information

The tester must register for an account using the UI. Navigate to <http://localhost:8080/register> to register for an account (once the application is running)

## Database Information & Sample Users

### The following sample data is available for users

| id | username | password |
|----|----------|----------|
| 1  | user1234 | user1234 |
| 2  | user5678 | user5678 |

### The following sample data is available for list items

| item_id | title     | body        | item_type | is_complete | date_created     | created_by |
|---------|-----------|-------------|-----------|-------------|------------------|------------|
| 1       | Demo-note | sample text | NOTE      | null        | 03/12/2021 21:26 | 1          |
| 2       | Demo-task | sample text | TASK      | TRUE        | 03/12/2021 21:26 | 2          |

### The following sample data is available for calendar events

| event_id | title  | body                | datetime         | created_by | color |
|----------|--------|---------------------|------------------|------------|-------|
| 1        | Quiz x | Quiz for course xyz | 14/12/2021 13:30 | 1          | red   |
| 2        | Quiz y | null                | null             | 2          | green |

## Special Thanks To

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
