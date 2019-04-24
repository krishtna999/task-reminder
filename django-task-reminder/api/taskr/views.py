from django.shortcuts import render

# Returning GET JSON manually (from-scratch API View)

from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

# Returing GET JSON via generic View
from rest_framework import generics
from .models import User,Task
from .serializers import UserSerializer,TaskSerializer

@csrf_exempt
@api_view(['POST'])
def listTasks(request,format=None):
    if(request.method=='POST'):

        name=request.data['username']
        user=User.objects.get(username=name)
        tasks=Task.objects.filter(assignedTo=user.id)      
        serializer=TaskSerializer(tasks,many=True)

        return Response(serializer.data)

        '''
        curl command :
        
        curl --header "Content-Type: application/json"  \
        --request POST   --data '{"username":"Murali"}' \
        http://localhost:8000/getTaskByUser/

        '''




class ListTaskView(generics.ListAPIView):
    """
    Provides a get method handler.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer




