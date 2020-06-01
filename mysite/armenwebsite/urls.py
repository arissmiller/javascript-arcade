from django.urls import path

from . import views

urlpatterns = [
    path('/index', views.index),
    path('/arcade', views.arcade),
    path('/snakescore', views.snakescore)
]
