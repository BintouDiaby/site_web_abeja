from django.db import models

class Comment(models.Model):
    path = models.CharField(max_length=500, db_index=True)
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def to_dict(self):
        return {
            'id': self.id,
            'path': self.path,
            'name': self.name,
            'email': self.email,
            'website': self.website,
            'message': self.message,
            'date': self.date.isoformat(),
        }

class Contact(models.Model):
    first_name = models.CharField(max_length=200, blank=True)
    last_name = models.CharField(max_length=200, blank=True)
    email = models.EmailField(blank=True)
    subject = models.CharField(max_length=300, blank=True)
    message = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def to_dict(self):
        return {'id': self.id, 'first_name': self.first_name, 'last_name': self.last_name,'email':self.email, 'subject':self.subject, 'message':self.message, 'date': self.date.isoformat()}
