from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import SnakeScore
from datetime import datetime
# Create your views here.

def index(request):
    template = loader.get_template('armenwebsite/index.html')
    context = {}
    return HttpResponse(template.render(context, request))

def arcade(request):
    template = loader.get_template('armenwebsite/arcade.html')
    scores = SnakeScore.objects.order_by('-player_score')
    context = {'scores' : scores}
    return HttpResponse(template.render(context, request))

def snakescore(request):
    if(request.method == 'POST'):
        body_unicode = request.body.decode('utf-8')
        score = SnakeScore(player_name = request.POST.get('playerName'), player_score = request.POST.get('playerScore'), date = datetime.now())
        score.save()
    return HttpResponse(content_type="application/json", status_code="200")
