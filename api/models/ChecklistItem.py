from django.db import models
from django.utils.translation import gettext_lazy as _

from api.models.Base import Base
from api.models.Checklist import Checklist
from api.models.User import User


class ChecklistItem(Base):
    STATUSES = [
        ('NOT_STARTED', _('N/A')),
        ('IN_PROGRESS', _('In progress')),
        ('DONE', _('DONE')),
    ]
    list = models.ForeignKey(
        Checklist,
        on_delete=models.DO_NOTHING,
        related_name='items',
        related_query_name='items'
    )
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    deleted = models.BooleanField(default=False)
    description = models.CharField(blank=False, null=False, max_length=250)
    due = models.DateField(auto_now=False, auto_now_add=False, blank=False, null=False)
    people = models.ManyToManyField(User)
    status = models.CharField(blank=False, null=False, default=STATUSES[0], choices=STATUSES, max_length=100)

    class Meta:
        default_permissions = ()
        permissions = [('add_checklist_item', 'Can add checklist item')]

    def __str__(self):
        return self.description
