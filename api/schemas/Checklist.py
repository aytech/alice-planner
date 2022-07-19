from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db.models import Prefetch
from graphene import ObjectType, List, Mutation, InputObjectType, String, Field, ID
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import user_passes_test
from django.utils.translation import gettext_lazy as _

from api.models.Checklist import Checklist as ChecklistModel
from api.models.ChecklistItem import ChecklistItem as ChecklistItemModel
from api.schemas.exceptions.PermissionDenied import PermissionDenied
from api.schemas.helpers.FormHelper import FormHelper


class Checklist(DjangoObjectType):
    class Meta:
        model = ChecklistModel
        fields = ('id', 'name', 'items',)


class ChecklistQuery(ObjectType):
    checklists = List(Checklist)

    @classmethod
    def resolve_checklists(cls, _root, _info):
        try:
            return ChecklistModel.objects.filter(deleted=False).filter(archived=False).prefetch_related(
                Prefetch('items', queryset=ChecklistItemModel.objects.filter(deleted=False).filter(archived=False)))
        except ObjectDoesNotExist:
            return None


class ChecklistInput(InputObjectType):
    name = String()


class ExistingChecklistInput(ChecklistInput):
    id = ID()


class CreateChecklist(Mutation):
    class Arguments:
        data = ChecklistInput(required=True)

    checklist = Field(Checklist)

    @classmethod
    @user_passes_test(lambda user: user.has_perm('api.add_checklist'), exc=PermissionDenied)
    def mutate(cls, _root, _info, data=None):
        checklist_model = ChecklistModel(name=data.name)

        try:
            checklist_model.full_clean()
        except ValidationError as errors:
            raise Exception(errors.messages[0])

        checklist_model.save()

        return CreateChecklist(checklist=checklist_model)


class UpdateChecklist(Mutation):
    class Arguments:
        data = ExistingChecklistInput(required=True)

    checklist = Field(Checklist)

    @classmethod
    @user_passes_test(lambda user: user.has_perm('api.add_checklist'), exc=PermissionDenied)
    def mutate(cls, _root, _info, data=None):
        if data.id is None:
            raise Exception(_('Please select checklist'))
        try:
            list_model = ChecklistModel.objects.get(pk=data.id, deleted=False)
        except ObjectDoesNotExist:
            raise Exception(_('Please select checklist'))

        list_model.name = FormHelper.get_value(data.name, list_model.name)

        try:
            list_model.full_clean()
        except ValidationError as errors:
            raise Exception(errors.messages[0])

        list_model.save()

        return UpdateChecklist(checklist=list_model)


class DeleteChecklist(Mutation):
    class Arguments:
        list_id = ID()

    checklist = Field(Checklist)

    @classmethod
    @user_passes_test(lambda user: user.has_perm('api.add_checklist'), exc=PermissionDenied)
    def mutate(cls, _root, _info, list_id):
        try:
            list_model = ChecklistModel.objects.get(pk=list_id, deleted=False)
            if list_model:
                list_model.deleted = True
                list_model.save()
            return DeleteChecklist(checklist=list_model)
        except ObjectDoesNotExist:
            return DeleteChecklist(checklist=None)


class ArchiveChecklist(Mutation):
    class Arguments:
        list_id = ID()

    checklist = Field(Checklist)

    @classmethod
    @user_passes_test(lambda user: user.has_perm('api.add_checklist'), exc=PermissionDenied)
    def mutate(cls, _root, _info, list_id):
        try:
            list_model = ChecklistModel.objects.get(pk=list_id, deleted=False)
            if list_model:
                list_model.archived = True
                list_model.save()
            return ArchiveChecklist(checklist=list_model)
        except ObjectDoesNotExist:
            return ArchiveChecklist(checklist=None)


class RestoreArchivedChecklist(Mutation):
    class Arguments:
        list_id = ID()

    checklist = Field(Checklist)

    @classmethod
    @user_passes_test(lambda user: user.has_perm('api.add_checklist'), exc=PermissionDenied)
    def mutate(cls, _root, _info, list_id):
        try:
            list_model = ChecklistModel.objects.get(pk=list_id, deleted=False)
            if list_model:
                list_model.archived = False
                list_model.save()
            return RestoreArchivedChecklist(checklist=list_model)
        except ObjectDoesNotExist:
            return RestoreArchivedChecklist(checklist=None)


class RestoreDeletedChecklist(Mutation):
    class Arguments:
        list_id = ID()

    checklist = Field(Checklist)

    @classmethod
    @user_passes_test(lambda user: user.has_perm('api.add_checklist'), exc=PermissionDenied)
    def mutate(cls, _root, _info, list_id):
        try:
            list_model = ChecklistModel.objects.get(pk=list_id, deleted=False)
            if list_model:
                list_model.deleted = False
                list_model.save()
            return RestoreDeletedChecklist(checklist=list_model)
        except ObjectDoesNotExist:
            return RestoreDeletedChecklist(checklist=None)


class CopyChecklist(Mutation):
    class Arguments:
        list_id = ID()

    checklist = Field(Checklist)

    @classmethod
    @user_passes_test(lambda user: user.has_perm('api.add_checklist'), exc=PermissionDenied)
    def mutate(cls, _root, _info, list_id):
        try:
            list_model = ChecklistModel.objects.get(pk=list_id, deleted=False)
            if list_model:
                new_model = ChecklistModel(
                    name=list_model.name,
                )
                new_model.save()
                for item in list_model.items.filter(deleted=False):
                    new_item_model = ChecklistItemModel(
                        description=item.description,
                        due=item.due,
                        list=new_model,
                        status='NOT_STARTED',
                    )
                    new_item_model.save()
                    new_item_model.people.set(item.people.all())
                    new_item_model.save()
                return CopyChecklist(checklist=new_model)
            return CopyChecklist(checklist=None)
        except ObjectDoesNotExist:
            return CopyChecklist(checklist=None)
