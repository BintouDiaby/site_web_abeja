from django.urls import path
from . import views

urlpatterns = [
    path('comments', views.comments),
    path('contact', views.contact),
]
