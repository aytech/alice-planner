from django.db import models
from django.utils.translation import gettext_lazy as _

from api.models.Base import Base


class Checklist(Base):
    archived = models.DateTimeField(auto_now_add=False, auto_now=False, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    deleted = models.BooleanField(default=False)
    name = models.CharField(blank=True, max_length=150, null=True)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)

    class Meta:
        default_permissions = ()
        permissions = [('add_checklist', 'Can add checklist')]
        verbose_name = _('Check list')

    def __str__(self):
        return self.name
