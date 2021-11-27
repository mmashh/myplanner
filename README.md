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

## Instructions to Run (Development mode)
- The following instructions assumes that the application is coming directly from git. Thus, all instructions must be ran successfully.
- Both CLI must remain open during testing. This is only for the development version of MyPlanner and will be deployed in a more production-ready fashion in the near future.

### Part 1: Server
1. Open up the CLI of your choice (Terminal/CMD)
2. Navigate to `~/myplanner/server`
3. (Optional) It is highly recommended to create a python virtual environment before proceeding with the following steps.
4. Run the command `pip install -r ./requirements.txt` to install all dependency packages. Wait for the packages to finish downloading.
5. Run the command `python app.py` to start the server.
6. Keep the CLI open during testing.

### Part 2: Client
1. Open up a **separate** CLI of your choice (Different from the CLI used in part 1).
2. Navigate to `~/myplanner/client`
3. Run the command `npm install` to install all dependency packages. Wait for the packages to finish downloading.
4. Run the command `npm start` to start the client server
5. Keep the CLI open during testing
6. Navigate to http://localhost:3000/ to view the application in your browser.

## Testing Information
The tester must register for an account using the UI. Navigate to https://localhost:3000/register to register for an account (once the application is running)

## Database Information & Sample Users
<h1> Application Server Information </h1>
<br>


<ul>
<li>Run <code>pip install -r ./requirements.txt </code> to 
install all required dependencies</li>
<li>Run <code>python app.py </code> to start the server</li>
<li> The application/backend server is available at http://127.0.0.1:5000 </li>
<li> The documentation for the exposed endpoints are at http://localhost:5000/apidocs/#/ </li>
</li>
</ul>




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

