import logging

from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.utils.translation import gettext_lazy as _
from graphene import ObjectType, Field, Mutation, InputObjectType, String, List, ID
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import user_passes_test

from api.models.Checklist import Checklist as ChecklistModel
from api.models.ChecklistItem import ChecklistItem as ChecklistItemModel
from api.models.User import User as UserModel


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


class Person(InputObjectType):
    id = ID()


class ChecklistItemInput(InputObjectType):
    list = String()
    description = String()
    due = String()
    people = List(String)
    status = String()


class CreateChecklistItem(Mutation):
    class Arguments:
        data = ChecklistItemInput(required=True)

    checklist_item = Field(ChecklistItem)

    @classmethod
    @user_passes_test(lambda user: user.has_perm('add_checklist_item'))
    def mutate(cls, _root, _info, data=None):
        checklist_item_model = ChecklistItemModel(
            description=data.description,
            due=data.due
        )

        if data.list is not None:
            try:
                checklist_item_model.list = ChecklistModel.objects.get(pk=data.list, deleted=False)
            except ObjectDoesNotExist:
                raise Exception(_('Please select checklist'))

        if data.status is None:
            checklist_item_model.status = checklist_item_model.get_default_status()
        else:
            if checklist_item_model.has_status(data.status):
                checklist_item_model.status = checklist_item_model.get_status(data.status)[0]
            else:
                checklist_item_model.status = checklist_item_model.get_default_status()

        try:
            checklist_item_model.full_clean()
        except ValidationError as errors:
            raise Exception(errors.messages[0])

        checklist_item_model.save()

        if data.people is not None:
            for person in data.people:
                try:
                    checklist_item_model.people.add(UserModel.objects.get(pk=person, deleted=False))
                except Exception as ex:
                    logging.getLogger('planner').debug(
                        'Failed to add person {} to the new checklist with error: {}'.format(person, ex))

        if len(checklist_item_model.people.all()) < 1:
            raise Exception(_('Please select at least one person'))
        
        return CreateChecklistItem(checklist_item=checklist_item_model)
