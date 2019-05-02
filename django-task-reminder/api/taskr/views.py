from django.shortcuts import render


# Returing GET JSON via generic View
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
# from rest_framework import generics
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .models import *
from .serializers import *
from rest_framework import viewsets
from .tasks import deadline_notification, new_task
from .filters import TaskFilter
from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter, OrderingFilter

class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    # Very clever function here. It automatically gets the user from the authenticated token
    def perform_create(self, serializer):
        assignedTo = serializer.validated_data['assignedTo']
        task_title = serializer.validated_data['title']
        deadline = serializer.validated_data['deadline']

        serializer.save(createdBy=self.request.user)

        new_task(assignedTo.username)
        deadline_notification.apply_async(
            (assignedTo.id, task_title),
            eta=deadline
        )

    queryset=Task.objects.all()
    filter_fields=('assignedTo__username',)
    # filterset_class=TaskFilter
    serializer_class = TaskSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()

    def get_serializer(self,*args,**kwargs):
        if(self.action == 'list'):
            kwargs['fields']=('id', 'username')
            return UserSerializer(*args,**kwargs)
        elif(self.action == 'create'):
            return UserSerializer(*args,**kwargs)


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    permission_classes = (IsAuthenticated,)
    filterset_fields=('assignedTo__username',)
    serializer_class = NotificationSerializer
