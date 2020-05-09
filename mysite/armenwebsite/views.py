from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import SnakeScore
# Create your views here.

def index(request):
    template = loader.get_template('armenwebsite/index.html')
    context = {}
    return HttpResponse(template.render(context, request))

def arcade(request):
    template = loader.get_template('armenwebsite/arcade.html')
    scores = SnakeScore.objects.order_by('player_score')
    context = {'scores' : scores}
    return HttpResponse(template.render(context, request))

def snakescore(request, name, score):
    if(request.method == 'POST'):
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        score = SnakeScore(player_name = name, player_score = score, date = datetime.datetime.now())
        score.save()
    return
