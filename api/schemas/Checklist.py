from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Prefetch
from graphene import ObjectType, List
from graphene_django import DjangoObjectType
from api.models.Checklist import Checklist as ChecklistModel
from api.models.ChecklistItem import ChecklistItem as ChecklistItemModel


class Checklist(DjangoObjectType):
    class Meta:
        model = ChecklistModel
        fields = ('id', 'name', 'items',)


class ChecklistQuery(ObjectType):
    checklists = List(Checklist)

    @classmethod
    def resolve_checklists(cls, _root, _info):
        try:
            return ChecklistModel.objects.filter(deleted=False).prefetch_related(
                Prefetch('items', queryset=ChecklistItemModel.objects.filter(deleted=False).filter(archived=False)))
        except ObjectDoesNotExist:
            return None
