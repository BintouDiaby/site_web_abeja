from django.urls import path, include, re_path
from django.http import JsonResponse
from django.views.static import serve
from django.conf import settings
import os

def health(request):
    return JsonResponse({'status': 'ok'})

BASE_DIR = settings.BASE_DIR
FRONTEND_ROOT = os.path.abspath(os.path.join(BASE_DIR, '..', 'Abeja_Kings'))

urlpatterns = [
    path('api/health', health),
    path('api/', include('api.urls')),
]

def frontend(request, path=''):
    if path == '':
        path = 'index.html'
    return serve(request, path, document_root=FRONTEND_ROOT)

urlpatterns += [
    re_path(r'^(?P<path>.*)$', frontend),
]
