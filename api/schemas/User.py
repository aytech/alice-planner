from django.core.exceptions import ObjectDoesNotExist, ValidationError
from graphene import ObjectType, Field, Mutation, InputObjectType, String, ID
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import user_passes_test

from api.models.User import User as UserModel
from api.schemas.exceptions.PermissionDenied import PermissionDenied
from api.schemas.helpers.FormHelper import FormHelper


class User(DjangoObjectType):
    class Meta:
        model = UserModel
        fields = ('avatar', 'color', 'email', 'id', 'name', 'surname')


class UserQuery(ObjectType):
    user = Field(User)

    @classmethod
    def resolve_user(cls, _root, info):
        if info.context.user.is_anonymous is True:
            return None
        try:
            return UserModel.objects.get(email=info.context.user.email, deleted=False)
        except ObjectDoesNotExist:
            return None


class UserInput(InputObjectType):
    avatar = String()
    color = String()
    id = ID()
    name = String()
    surname = String()


class UpdateUser(Mutation):
    class Arguments:
        data = UserInput(required=True)

    settings = Field(User)

    @classmethod
    @user_passes_test(lambda user: user.has_perm('api.change_settings'), exc=PermissionDenied)
    def mutate(cls, _root, _info, data=None):
        try:
            instance = UserModel.objects.get(pk=data.id)
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

            return UpdateUser(settings=instance)
        except ObjectDoesNotExist:
            return UpdateUser(settings=None)
