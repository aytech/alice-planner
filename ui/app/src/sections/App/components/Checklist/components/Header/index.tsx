import { AppstoreAddOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons"
import { ApolloError, useMutation } from "@apollo/client"
import { Button, Col, message, Row, Space, Spin, Tooltip } from "antd"
import { useTranslation } from "react-i18next"
import { ArchiveChecklistDocument, ArchiveChecklistMutation, ArchiveChecklistMutationVariables, CopyChecklistDocument, CopyChecklistMutation, CopyChecklistMutationVariables, DeleteChecklistDocument, DeleteChecklistMutation, DeleteChecklistMutationVariables } from "../../../../../../lib/graphql/graphql"
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

  const [ copyList, { loading: copyLoading } ] = useMutation<CopyChecklistMutation, CopyChecklistMutationVariables>(CopyChecklistDocument, {
    onCompleted: (_: CopyChecklistMutation) => {
      message.info(t("done"))
      refetch()
    },
    onError: (error: ApolloError) => message.error(error.message)
  })

  const archive = () => {
    archiveList({ variables: { listId: list.id } })
  }

  const copy = () => {
    copyList({ variables: { listId: list.id } })
  }

  const remove = () => {
    removeList({ variables: { listId: list.id } })
  }

  return (
    <Spin
      spinning={
        archiveLoading
        || copyLoading
        || removeLoading
      }
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
          <Space>
            <Tooltip title={ t("copy-list") } placement="top">
              <Button icon={ <CopyOutlined /> } onClick={ copy } />
            </Tooltip>
            <Tooltip title={ t("archive-list") } placement="top">
              <Button icon={ <AppstoreAddOutlined /> } onClick={ archive } />
            </Tooltip>
            <Tooltip title={ t("delete-list") } placement="top">
              <Button
                icon={ <DeleteOutlined /> }
                onClick={ remove } />
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </Spin>
  )
}