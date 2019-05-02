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

notification_list = NotificationViewSet.as_view({
    'post': 'list'
})

urlpatterns = [
    path('tasks', task_list, name="Tasks-LoggedIn-User"),
    # Post only :
    path('users', user_list, name="Users-CR"),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token,
         name='api-token-auth'),
    path('notifications', notification_list, name='get-notifications')
]
