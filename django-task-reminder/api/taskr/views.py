from django.shortcuts import render

'''
curl command :

curl --header "Content-Type: application/json"  \
--request POST   --data '{"username":"Murali"}' \
http://localhost:8000/getTaskByUser/

'''


# Returing GET JSON via generic View
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# from rest_framework import generics
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .models import Task
from .serializers import *
from rest_framework import viewsets


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    # Very clever function here. It automatically gets the user from the authenticated token
    def perform_create(self, serializer):
        serializer.save(createdBy=self.request.user)

    def get_queryset(self):
        name = self.kwargs['username']
        if(name == 'all'):
            return Task.objects.all()
        user = get_object_or_404(User, username=name)
        queryset = Task.objects.filter(assignedTo=user)
        return queryset

    serializer_class = TaskSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()

    '''
    Now, we need 2 serializers as:
        To create we need 3 fields at minimum (email,username,password)
        We can't be using that to do the list operation too as then, it would return both the password and the email
        to the client.

        Hence, I added another "UserListSerializer" to with fields id and name only !
    '''
    def get_serializer_class(self):
        if(self.action=='list'):
            return UserListSerializer
        elif(self.action=='create'):
            return UserCreateSerializer
    


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
