from django_filters import rest_framework as filters
from django.contrib.auth.models import User
from .models import Task

class TaskFilter(filters.FilterSet):
    class Meta:
        model=Task
        fields={
            'assignedTo__username': ['exact']
        }
