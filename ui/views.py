from django.middleware.csrf import get_token
from django.shortcuts import render


def home(request):
    return render(request, 'index.html')


def login(request):
    return render(request, 'index.html', {'token': get_token(request)})


def page_not_found(request, path):
    return render(request, 'index.html', {'path': path})
