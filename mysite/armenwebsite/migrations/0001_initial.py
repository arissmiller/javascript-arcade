# Generated by Django 3.0.6 on 2020-05-07 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SnakeScore',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player_name', models.CharField(max_length=24)),
                ('player_score', models.IntegerField(default=0)),
                ('player_won', models.BooleanField(default=False)),
                ('date', models.DateTimeField(verbose_name='date')),
            ],
        ),
    ]
