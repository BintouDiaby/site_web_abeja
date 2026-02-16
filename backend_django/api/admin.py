from django.contrib import admin
from .models import Comment, Contact

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id','path','name','date')

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('id','email','date')
