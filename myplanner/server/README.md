# Database Information & Sample Users

To access contents of the database, execute the following command to enter postgres after spinning up the database container.  
`docker exec -it myplanner_db_1 psql myplanner_data -U flask`  
Note that table sample data will be populated before first request to the backend application.  
This can be done by attempting to access the swagger docs at <http://localhost:5000/apidocs/> or at first login, or even when attempting to register a new user.

## The following sample data is available for users

| id | username | password |
|----|----------|----------|
| 1  | user1234 | user1234 |
| 2  | user5678 | user5678 |

## The following sample data is available for list items

| item_id | title     | body        | item_type | is_complete | date_created     | created_by |
|---------|-----------|-------------|-----------|-------------|------------------|------------|
| 1       | Demo-note | sample text | NOTE      | null        | 03/12/2021 21:26 | 1          |
| 2       | Demo-task | sample text | TASK      | TRUE        | 03/12/2021 21:26 | 2          |

## The following sample data is available for calendar events

| event_id | title  | body                | datetime         | created_by | color |
|----------|--------|---------------------|------------------|------------|-------|
| 1        | Quiz x | Quiz for course xyz | 14/12/2021 13:30 | 1          | red   |
| 2        | Quiz y | null                | null             | 2          | green |
