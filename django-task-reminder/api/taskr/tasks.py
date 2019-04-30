# from api.celery import app
# from celery.schedules import crontab

from __future__ import absolute_import, unicode_literals

from celery import Celery
from ws4redis.publisher import RedisPublisher
from ws4redis.redis_store import RedisMessage
from .models import Task,Notification
from django.contrib.auth.models import User
import os
from datetime import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')
app = Celery('tasks', broker='redis://localhost//')




NOTIFICATION_MSG=":notification"

@app.task
def new_task(user:str):
    '''
    :all = for reloading all list
    :notification = notification for any user 
    '''
    redis_publisher=RedisPublisher(facility='foobar',broadcast=True)
    message= RedisMessage(user)
    redis_publisher.publish_message(message)

@app.task
def deadline_notification(assignedTo,title):

    assignedUser=User.objects.get(pk=assignedTo)
    # Creating new Notification !
    new_notif=Notification(assignedTo=assignedUser,title=title,time_created=datetime.now())
    new_notif.save()
    
    redis_publisher=RedisPublisher(facility='foobar',broadcast=True)
    message= RedisMessage(NOTIFICATION_MSG)
    redis_publisher.publish_message(message)
    