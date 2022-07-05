from django.core.exceptions import ObjectDoesNotExist, ValidationError
from graphene import ObjectType, Field, Mutation, InputObjectType, String, ID
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import user_passes_test

from api.models.Settings import Settings as SettingsModel
from api.schemas.exceptions.PermissionDenied import PermissionDenied
from api.schemas.helpers.FormHelper import FormHelper


class Settings(DjangoObjectType):
    class Meta:
        model = SettingsModel
        fields = ('avatar', 'color', 'email', 'id', 'name', 'surname')


class SettingsQuery(ObjectType):
    settings = Field(Settings)

    @classmethod
    def resolve_settings(cls, _root, info):
        if info.context.user.is_anonymous is True:
            return None
        try:
            return SettingsModel.objects.get(username=info.context.user.username)
        except ObjectDoesNotExist:
            return None


class SettingsInput(InputObjectType):
    avatar = String()
    color = String()
    id = ID()
    name = String()
    surname = String()


class UpdateSettings(Mutation):
    class Arguments:
        data = SettingsInput(required=True)

    settings = Field(Settings)

    @classmethod
    @user_passes_test(lambda user: user.has_perm('api.change_settings'), exc=PermissionDenied)
    def mutate(cls, _root, _info, data=None):
        try:
            instance = SettingsModel.objects.get(pk=data.id)
            if instance:
                instance.avatar = FormHelper.get_value(data.avatar, instance.avatar)
                instance.color = FormHelper.get_value(data.color, instance.color)
                instance.name = FormHelper.get_value(data.name, instance.name)
                instance.surname = FormHelper.get_value(data.surname, instance.surname)

                try:
                    instance.full_clean()
                except ValidationError as errors:
                    raise Exception(errors.messages[0])

                instance.save()

            return UpdateSettings(settings=instance)
        except ObjectDoesNotExist:
            return UpdateSettings(settings=None)
