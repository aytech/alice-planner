from django.core.exceptions import ObjectDoesNotExist
from graphene import ObjectType, List
from graphene_django import DjangoObjectType
from api.models.Checklist import Checklist as ChecklistModel


class Checklist(DjangoObjectType):
    class Meta:
        model = ChecklistModel
        fields = ('id', 'name', 'items',)


class ChecklistQuery(ObjectType):
    checklists = List(Checklist)

    @classmethod
    def resolve_checklists(cls, _root, _info):
        try:
            lists = ChecklistModel.objects.all().filter(deleted=False).filter(archived=False)
            for checklist in lists:
                checklist.items.set(checklist.items.all().filter(deleted=False).filter(archived=False))
                print(checklist.items.all().filter(deleted=False).filter(archived=False))
            return lists
        except ObjectDoesNotExist:
            return None
