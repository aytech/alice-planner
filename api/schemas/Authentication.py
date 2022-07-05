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
    settings = Field(User)

    @classmethod
    def resolve(cls, _root, info, **kwargs):
        try:
            settings = UserModel.objects.get(username=info.context.user, deleted=False)
            return cls(settings=settings)
        except ObjectDoesNotExist:
            return cls(settings=User())
