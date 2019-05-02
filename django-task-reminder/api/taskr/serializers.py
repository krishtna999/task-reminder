from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import *
from django.contrib.auth.models import User


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class UserSerializer(DynamicFieldsModelSerializer):

    email = serializers.EmailField(
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
        fields = ('id', 'username', 'email', 'password')


class TaskSerializer(serializers.ModelSerializer):

    createdBy = serializers.ReadOnlyField(source='createdBy.username')
    assignedToName = serializers.ReadOnlyField(source='assignedTo.username')

    class Meta:
        model = Task
        fields = ('id', 'title', 'createdBy',
                  'assignedToName', 'assignedTo', 'deadline')


class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = ('time_created', 'title', 'assignedTo')


