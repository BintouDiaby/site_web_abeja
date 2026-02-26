from django.contrib import admin
from django.urls import path, include, re_path
from django.http import JsonResponse
from django.conf import settings
from django.views.static import serve
import os
from django.http import HttpResponse

# FRONTEND SERVING (PRODUCTION)
# backend_django -> remonter d’un niveau -> WAREHOUSE-MASTER -> Abeja_Kings
FRONTEND_ROOT = os.path.abspath(
    os.path.join(settings.BASE_DIR, os.pardir, 'Abeja_Kings')
)

def frontend(request, path=''):
    if path == '':
        path = 'index.html'
    return serve(request, path, document_root=FRONTEND_ROOT)


def health(request):
    return JsonResponse({'status': 'ok'})

urlpatterns = [
    path('', frontend),   # servir le frontend à la racine
    path('admin/', admin.site.urls),
    path('api/health', health),
    path('api/', include('api.urls')),
]

# -----------------------------
# FRONTEND SERVING (PRODUCTION)
# -----------------------------

# backend_django -> remonter d’un niveau -> WAREHOUSE-MASTER -> Abeja_Kings
urlpatterns += [
    re_path(r'^(?P<path>.*)$', frontend),
]
