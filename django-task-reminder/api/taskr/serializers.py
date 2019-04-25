from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Task
from django.contrib.auth.models import User


class UserCreateSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(min_length=8)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        return user

    class Meta:
        model = User
        fields = '__all__'
        fields = ('id', 'username', 'email','password')

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        fields = ('id', 'username')


class TaskSerializer(serializers.ModelSerializer):

    createdBy = serializers.ReadOnlyField(source='createdBy.username')

    class Meta:
        model = Task
        fields = ('title', 'createdBy', 'assignedTo', 'deadline')
