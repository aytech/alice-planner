from django.contrib import admin

from api.models.Checklist import Checklist
from api.models.ChecklistItem import ChecklistItem
from api.models.User import User


@admin.register(Checklist)
class ChecklistAdmin(admin.ModelAdmin):
    fields = ('archived', 'deleted', 'name',)
    readonly_fields = ('created', 'updated',)


@admin.register(ChecklistItem)
class ChecklistItemAdmin(admin.ModelAdmin):
    pass


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass
