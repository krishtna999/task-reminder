# Task Reminder System


### Uses

- Django Rest Framework (DRF)
- Angular 7
- Celery (Redis)


### Install Dependencies 
- Create Virtual Environment "venv" `virtualenv -p python3 venv`

- Activate the virtual environment `source venv/bin/activate`

- Run django by `python manage.py runserver`

- `pip install -r requirements.txt` in Django api  root folder 


### Run Celery

- ` celery -A api worker --loglevel=info` in Django api root folder

- Make sure that redis runs at port 6379 (default port for redis) so that celery and django can interact with it



### Endpoints


> (**GET**)Get tasks by *usrn*. i.e.  assignedTo__username as a GET parameter
- /tasks?assignedTo__username=*usrn*
> (**POST**,  *Authenticated*) Create new tasks (provide 'assignedTo', 'title', 'deadline' fields as int(id of the user), string and datetime respectively)
- /tasks
>(**POST, GET**) Create new Users(username, email, password) and get list of all Users
- /users
>(**POST**, *Authenticated*) Post to obtain all notifications
- /notifications
> (**POST**) POST username and password and get corresponding Token for authentication
- /api-token-auth/


### Websockets

- Websocket URL (Connect to this url to subscribe to the messages): 
    - ws://localhost:8000/ws/foobar?subscribe-broadcast
- If the string received is ":notification" (without the quotes).
    - Then you have to fetch the notification data again
- If not the above string, then the web socket string will contain the name of the user to whom a new task has been assigned too
    - Fetch the data again of the user (if the client is displaying the details of the recieved user)
