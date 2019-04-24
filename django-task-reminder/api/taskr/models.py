# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timedelta
# Create your models here.


class Task(models.Model):
    title = models.CharField(max_length=300)
    createdBy = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="Created_By")
    assignedTo = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="Assigned_To")
    deadline = models.DateTimeField(default=datetime.now()+timedelta(days=7))
