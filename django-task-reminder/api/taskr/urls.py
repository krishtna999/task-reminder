from django.urls import path, include
from .views import *
from rest_framework.authtoken.views import obtain_auth_token

task_list = TaskViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

user_list = UserViewSet.as_view({
    'get': 'list',
    'post': 'create'
})


urlpatterns = [
    path('tasks/<str:username>', task_list, name="Tasks-CR"),
    # Post only :
    path('addTask/', task_list, name="Tasks-CR"),
    path('users/', user_list, name="Users-CR"),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token,
         name='api-token-auth'),  
]
