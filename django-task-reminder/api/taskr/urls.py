from django.urls import path, include
from .views import *
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('tasks/<str:username>', ListTaskView.as_view(), name="Tasks-ByUser/All"),
    path('users/', UserList.as_view(), name="Users-All"),
    path('register/', CreateUser.as_view(), name="User-Registration"),
    path('newTask/', CreateTaskView.as_view(), name="New-Task"),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token,
         name='api-token-auth'),  # <-- And here
]
