from django.urls import path
from .views import ListTaskView,listTasks
urlpatterns = [
    path('getTaskByUser/',listTasks,name="Tasks-By-User"),
    path('tasks/',ListTaskView.as_view(),name="Tasks-All"),
]
