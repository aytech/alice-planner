from django.db import models

from api.models.Base import Base


class User(Base):
    avatar = models.CharField(blank=True, max_length=150, null=True)
    color = models.CharField(blank=True, max_length=50, null=True)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    deleted = models.BooleanField(default=False)
    email = models.CharField(blank=False, max_length=100, null=False, unique=True)
    name = models.CharField(blank=True, max_length=100, null=True)
    surname = models.CharField(blank=True, max_length=100, null=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        default_permissions = ()
        permissions = [('change_user', 'Can change user')]

    def __str__(self):
        return '{} {}'.format(self.name, self.surname)
