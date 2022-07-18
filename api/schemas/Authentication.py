import random

from django.core.exceptions import ObjectDoesNotExist
from graphene import Field
from graphql_jwt import JSONWebTokenMutation

from api.schemas.User import User
from api.models.User import User as UserModel


class Color:
    colors = (
        "#f5222d",  # red
        "#fa541c",  # volcano
        "#fa8c16",  # orange
        "#faad14",  # gold
        "#fadb14",  # yellow
        "#a0d911",  # lime
        "#52c41a",  # green
        "#13c2c2",  # cyan
        "#1890ff",  # blue
        "#2f54eb",  # geekblue
        "#722ed1",  # purple
        "#eb2f96",  # magenta
    )

    @staticmethod
    def get_color():
        index = random.randrange(0, len(Color.colors) - 1, 1)
        return Color.colors[index]


class ObtainJSONWebToken(JSONWebTokenMutation):
    user = Field(User)

    @classmethod
    def resolve(cls, _root, info, **kwargs):
        try:
            user = UserModel.objects.get(email=info.context.user.email, deleted=False)
            return cls(user=user)
        except ObjectDoesNotExist:
            name = info.context.user.first_name
            new_user = UserModel(
                color=Color.get_color(),
                email=info.context.user.email,
                name=name if name is not '' else info.context.user.username,
                surname=info.context.user.last_name
            )
            new_user.save()
            return cls(user=new_user)
