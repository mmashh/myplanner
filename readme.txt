IMPORTANT: To view start-up instructions, please read README.md

==============================================================
Current Functionality (as of the Project Checkpoint)
==============================================================
The following iteration of the MyPlanner app contains the following workflows:
1. Register
  - The user can register by navigating to http://localhost:3000/register or clicking on the register button from the login page.
  - Then the user can enter their respective username and password to create a new user. The new user will have their own items/calendar events.
2. Login
  - The user can login by navigating to http://localhost:3000/login.
  - If the user attempts to access any part of the site while not logged in, the application will redirect the user to the login page.
3. Items
  - The items functionality allow the user to make tasks or notes to remind themselves.
  - This feature is accessible by clicking on the "items" link in the navbar, or through http://localhost:3000/items/
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

==============================================================
Goals for the Final Implementation
==============================================================
- Add the calendar functionality and with the stretch goals listed in the project proposal implemented.
- Extend security features past user authorization: Form validation, CSRF, etc.
- Extend data integrity of the application: Preventing null inputs, etc.
- Make the application more responsive to smaller screen sizes/different aspect ratio.