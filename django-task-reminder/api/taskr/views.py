from django.shortcuts import render

'''
curl command :

curl --header "Content-Type: application/json"  \
--request POST   --data '{"username":"Murali"}' \
http://localhost:8000/getTaskByUser/

'''

# Returning GET JSON manually (from-scratch API View)

from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Returing GET JSON via generic View
from rest_framework import generics
from django.contrib.auth.models import User
from .models import Task
from .serializers import UserSerializer, TaskSerializer


class ListTaskView(generics.ListAPIView):

    def get_queryset(self):
        name = self.kwargs['username']
        if(name == 'all'):
            return Task.objects.all()
        user = User.objects.get(username=name)
        queryset = Task.objects.filter(assignedTo=user)
        return queryset

    serializer_class = TaskSerializer


class CreateTaskView(generics.CreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(createdBy=self.request.user)

    serializer_class = TaskSerializer


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

'''
@csrf_exempt
def listTasks(request,format=None):
    if(request.method=='POST'):

        name=request.data['username']
        user=User.objects.get(username=name)
        tasks=Task.objects.filter(assignedTo=user.id)      
        serializer=TaskSerializer(tasks,many=True)

        return Response(serializer.data)
'''
