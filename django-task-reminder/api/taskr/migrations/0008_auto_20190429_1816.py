# Generated by Django 2.1 on 2019-04-29 12:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taskr', '0007_auto_20190429_1525'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='time_created',
            field=models.DateTimeField(default=datetime.datetime(2019, 4, 29, 18, 16, 44, 517684)),
        ),
        migrations.AlterField(
            model_name='task',
            name='deadline',
            field=models.DateTimeField(default=datetime.datetime(2019, 5, 6, 18, 16, 44, 517093)),
        ),
    ]