from django.db import models

# Create your models here.

class SnakeScore(models.Model):
    player_name = models.CharField(max_length=24)
    player_score = models.IntegerField(default=0)
    player_won = models.BooleanField(default=False)
    date = models.DateTimeField('date')
