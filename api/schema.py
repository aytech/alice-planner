import graphql_jwt
from graphene import ObjectType, Schema

from api.schemas.Authentication import ObtainJSONWebToken
from api.schemas.Checklist import ChecklistQuery
from api.schemas.ChecklistItem import ChecklistItemQuery, CreateChecklistItem, UpdateChecklistItem, DeleteChecklistItem, \
    ArchiveChecklistItem
from api.schemas.User import UserQuery, UpdateUser


class Query(
    ChecklistQuery,
    ChecklistItemQuery,
    UserQuery,
    ObjectType
):
    pass


class Mutation(ObjectType):
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()

    create_list = CreateChecklistItem.Field()
    update_list = UpdateChecklistItem.Field()
    delete_list = DeleteChecklistItem.Field()
    archive_list = ArchiveChecklistItem.Field()

    update_user = UpdateUser.Field()


schema = Schema(query=Query, mutation=Mutation)
