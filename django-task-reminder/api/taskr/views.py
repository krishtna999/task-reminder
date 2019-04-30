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
from .models import *
from .serializers import *
from rest_framework import viewsets
from .tasks import deadline_notification, new_task


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    # Very clever function here. It automatically gets the user from the authenticated token
    def perform_create(self, serializer):
        assignedTo = serializer.validated_data['assignedTo']
        task_title = serializer.validated_data['title']
        deadline = serializer.validated_data['deadline']
        print(deadline)

        serializer.save(createdBy=self.request.user)

        new_task(assignedTo.username)
        deadline_notification.apply_async(
            (assignedTo.id,
             task_title),
            eta=deadline
        )
        

    def get_queryset(self):
        name = self.kwargs['username']
        if(name == ':all'):
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
        if(self.action == 'list'):
            return UserListSerializer
        elif(self.action == 'create'):
            return UserCreateSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    # queryset = Notification.objects.all()
    def get_queryset(self):
        queryset = Notification.objects.filter(assignedTo=self.request.user)
        return queryset

    serializer_class = NotificationSerializer


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
