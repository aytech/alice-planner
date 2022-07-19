import graphql_jwt
from graphene import ObjectType, Schema

from api.schemas.Authentication import ObtainJSONWebToken
from api.schemas.Checklist import ChecklistQuery, CreateChecklist, UpdateChecklist, DeleteChecklist, ArchiveChecklist, \
    CopyChecklist
from api.schemas.ChecklistItem import ChecklistItemQuery, CreateChecklistItem, UpdateChecklistItem, \
    DeleteChecklistItem, ArchiveChecklistItem
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

    copy_list = CopyChecklist.Field()
    create_list = CreateChecklist.Field()
    update_list = UpdateChecklist.Field()
    delete_list = DeleteChecklist.Field()
    archive_list = ArchiveChecklist.Field()

    create_list_item = CreateChecklistItem.Field()
    update_list_item = UpdateChecklistItem.Field()
    delete_list_item = DeleteChecklistItem.Field()
    archive_list_item = ArchiveChecklistItem.Field()

    update_user = UpdateUser.Field()


schema = Schema(query=Query, mutation=Mutation)
