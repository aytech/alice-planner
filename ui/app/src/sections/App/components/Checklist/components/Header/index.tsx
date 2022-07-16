import { DeleteOutlined, SnippetsOutlined } from "@ant-design/icons"
import { ApolloError, useMutation } from "@apollo/client"
import { Button, Col, message, Row, Spin, Tooltip } from "antd"
import { useTranslation } from "react-i18next"
import { ArchiveChecklistDocument, ArchiveChecklistMutation, ArchiveChecklistMutationVariables, DeleteChecklistDocument, DeleteChecklistMutation, DeleteChecklistMutationVariables } from "../../../../../../lib/graphql/graphql"
import { IChecklistTable } from "../../../../../../lib/Types"
import "./styles.css"

interface Props {
  list: IChecklistTable
  refetch: () => void
}

export const Header = ({
  list,
  refetch
}: Props) => {

  const { t } = useTranslation()

  const [ removeList, { loading: removeLoading } ] = useMutation<DeleteChecklistMutation, DeleteChecklistMutationVariables>(DeleteChecklistDocument, {
    onCompleted: (_: DeleteChecklistMutation) => {
      message.success(`${ t("form.messages.list-removed") }!`)
      refetch()
    },
    onError: (error: ApolloError) => {
      message.error(error.message)
    }
  })

  const [ archiveList, { loading: archiveLoading } ] = useMutation<ArchiveChecklistMutation, ArchiveChecklistMutationVariables>(ArchiveChecklistDocument, {
    onCompleted: (_: ArchiveChecklistMutation) => {
      message.success(`${ t("form.messages.list-archived") }!`)
      refetch()
    },
    onError: (error: ApolloError) => {
      message.error(error.message)
    }
  })

  const archive = () => {
    archiveList({ variables: { listId: list.id } })
  }

  const remove = () => {
    removeList({ variables: { listId: list.id } })
  }

  return (
    <Spin
      spinning={ archiveLoading || removeLoading }
      tip={ t("processing") }>
      <Row>
        <Col
          className="header-title"
          sm={ 12 } xs={ 24 }>
          <h2><strong>{ list.name }</strong></h2>
        </Col>
        <Col
          className="header-actions"
          sm={ 12 } xs={ 24 }>
          <Row>
            <Col xs={ 8 } md={ 18 } />
            <Col
              className="header-action"
              xs={ 8 } md={ 3 }>
              <Tooltip title={ t("archive-list") } placement="top">
                <Button icon={ <SnippetsOutlined /> } onClick={ archive } />
              </Tooltip>
            </Col>
            <Col
              className="header-action"
              sm={ 8 } md={ 3 }>
              <Tooltip title={ t("delete-list") } placement="top">
                <Button
                  icon={ <DeleteOutlined /> }
                  onClick={ remove } />
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
    </Spin>
  )
}