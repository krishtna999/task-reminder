# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.

class User(models.Model):
    def __str__(self):
        return str({self.id,self.username,self.password})    
    
    username=models.CharField(max_length=50)
    password=models.CharField(max_length=50)
    

class Task(models.Model):
    title=models.CharField(max_length=300)
    assignedTo=models.ForeignKey(User,on_delete=models.CASCADE)
    deadline=models.DateTimeField(auto_now=False, auto_now_add=False)