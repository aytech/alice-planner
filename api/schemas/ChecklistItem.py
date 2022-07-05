from django.core.exceptions import ObjectDoesNotExist
from graphene import ObjectType, Field
from graphene_django import DjangoObjectType
from api.models.ChecklistItem import ChecklistItem as ChecklistItemModel


class ChecklistItem(DjangoObjectType):
    class Meta:
        model = ChecklistItemModel
        fields = ('id', 'list', 'description', 'due', 'people', 'status',)


class ChecklistItemQuery(ObjectType):
    checklist = Field(ChecklistItem)

    @classmethod
    def resolve_checklist(cls, _root, _info):
        try:
            return ChecklistItemModel.objects.get(deleted=False)
        except ObjectDoesNotExist:
            return None
