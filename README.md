# Task Reminder System


### Uses

- Django Rest Framework (DRF)
- Angular 7
- Celery (Redis)


### Install Dependencies 

- `pip install -r requirements.txt` in Django api  root folder 

- `npm install` in Angular "taskr" root folder

### Run Celery

- ` celery -A api worker --loglevel=info` in Django api root folder

- Make sure that redis runs at port 6379 so that celery and django can interact with it
