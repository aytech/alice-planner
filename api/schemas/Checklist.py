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
            result = ChecklistModel.objects.all()
            print(result[0].items.all()[0].people)
            return ChecklistModel.objects.all()
        except ObjectDoesNotExist:
            return None
