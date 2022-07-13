import logging

from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.utils.translation import gettext_lazy as _
from graphene import ObjectType, Field, Mutation, InputObjectType, String, List, ID
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import user_passes_test

from api.models.Checklist import Checklist as ChecklistModel
from api.models.ChecklistItem import ChecklistItem as ChecklistItemModel
from api.models.User import User as UserModel
from api.schemas.exceptions.PermissionDenied import PermissionDenied
from api.schemas.helpers.FormHelper import FormHelper


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


class ChecklistItemInput(InputObjectType):
    list = String()
    description = String()
    due = String()
    people = List(String)
    status = String()


class ExistingChecklistItemInput(ChecklistItemInput):
    id = ID()


class CreateChecklistItem(Mutation):
    class Arguments:
        data = ChecklistItemInput(required=True)

    checklist_item = Field(ChecklistItem)

    @classmethod
    @user_passes_test(lambda user: user.has_perm('api.add_checklist_item'), exc=PermissionDenied)
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

        people = []
        if data.people is not None:
            for person in data.people:
                try:
                    people.append(UserModel.objects.get(pk=person, deleted=False))
                except Exception as ex:
                    logging.getLogger('planner').debug(
                        'Failed to add person {} to the new checklist with error: {}'.format(person, ex))
        if len(people) < 1:
            raise Exception(_('Please select at least one person'))

        try:
            checklist_item_model.full_clean()
        except ValidationError as errors:
            raise Exception(errors.messages[0])

        checklist_item_model.save()
        checklist_item_model.people.set(people)
        checklist_item_model.save()

        return CreateChecklistItem(checklist_item=checklist_item_model)


class UpdateChecklistItem(Mutation):
    class Arguments:
        data = ExistingChecklistItemInput(required=True)

    checklist_item = Field(ChecklistItem)

    @classmethod
    @user_passes_test(lambda user: user.has_perm('api.add_checklist_item'), exc=PermissionDenied)
    def mutate(cls, _root, _info, data=None):
        if data.id is None:
            raise Exception(_('Please select checklist'))
        try:
            item_model = ChecklistItemModel.objects.get(pk=data.id, deleted=False)
        except ObjectDoesNotExist:
            raise Exception(_('Please select checklist'))

        item_model.description = FormHelper.get_value(data.description, item_model.description)
        item_model.due = FormHelper.get_value(data.due, item_model.due)

        if data.status is not None:
            if item_model.has_status(data.status):
                item_model.status = item_model.get_status(data.status)[0]

        people = []
        if data.people is not None:
            for person in data.people:
                try:
                    people.append(UserModel.objects.get(pk=person, deleted=False))
                except Exception as ex:
                    logging.getLogger('planner').debug(
                        'Failed to update checklist with person {}, with error: {}'.format(person, ex))

        if len(people) < 1:
            raise Exception(_('Please select at least one person'))

        item_model.people.set(people)

        try:
            item_model.full_clean()
        except ValidationError as errors:
            raise Exception(errors.messages[0])

        item_model.save()

        return UpdateChecklistItem(checklist_item=item_model)


class DeleteChecklistItem(Mutation):
    class Arguments:
        item_id = ID()

    checklist_item = Field(ChecklistItem)

    @classmethod
    @user_passes_test(lambda user: user.has_perm('api.add_checklist_item'), exc=PermissionDenied)
    def mutate(cls, _root, _info, item_id):
        try:
            item_model = ChecklistItemModel.objects.get(pk=item_id, deleted=False)
            if item_model:
                item_model.deleted = True
                item_model.save()
            return DeleteChecklistItem(checklist_item=item_model)
        except ObjectDoesNotExist:
            return DeleteChecklistItem(checklist_item=None)


class ArchiveChecklistItem(Mutation):
    class Arguments:
        item_id = ID()

    checklist_item = Field(ChecklistItem)

    @classmethod
    @user_passes_test(lambda user: user.has_perm('api.add_checklist_item'), exc=PermissionDenied)
    def mutate(cls, _root, _info, item_id):
        try:
            item_model = ChecklistItemModel.objects.get(pk=item_id, deleted=False)
            if item_model:
                item_model.archived = True
                item_model.save()
            return ArchiveChecklistItem(checklist_item=item_model)
        except ObjectDoesNotExist:
            return ArchiveChecklistItem(checklist_item=None)
