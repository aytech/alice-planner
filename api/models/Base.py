from django.db import models


class Base(models.Model):
    objects = models.Manager()
