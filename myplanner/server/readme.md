<h1> Application Server Information </h1>
<br>


<ul>
<li>Run <code>pip install -r ./requirements.txt </code> to 
install all required dependencies</li>
<li>Run <code>python app.py </code> to start the server</li>
<li> The application/backend server is available at http://127.0.0.1:5000 </li>
<li> The documentation for the exposed endpoints are at http://localhost:5000/apidocs/ </li>
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
    <td>2</td>
    <td>Demo-task</td>
    <td>sample text</td>
    <td>TASK</td>
    <td>TRUE</td>
    <td>03/12/2021 21:26</td>
    <td>2</td>
    </tr>

</table>

<p> The following sample data is available for calendar events </p>

<table>
    <tr>
    <td>event_id</td>
    <td>title</td>
    <td>body</td>
    <td>datetime</td>
    <td>created_by</td>
    <td>color</td>
    </tr>
    <tr>
    <td>1</td>
    <td>Quiz x</td>
    <td>Quiz for course xyz</td>
    <td>14/12/2021 13:30</td>
    <td>1</td>
    <td>red</td>
    </tr>
    <tr>
    <td>2</td>
    <td>Quiz y</td>
    <td>null</td>
    <td>null</td>
    <td>2</td>
    <td>green</td>
    </tr>
</table>
