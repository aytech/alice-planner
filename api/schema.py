import graphql_jwt
from graphene import ObjectType, Schema

from api.schemas.Authentication import ObtainJSONWebToken
from api.schemas.Settings import SettingsQuery, UpdateSettings


class Query(
    SettingsQuery,
    ObjectType
):
    pass


class Mutation(ObjectType):
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()

    update_settings = UpdateSettings.Field()


schema = Schema(query=Query, mutation=Mutation)
