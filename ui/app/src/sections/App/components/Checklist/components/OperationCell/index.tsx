import { CloseCircleOutlined, DeleteOutlined, EditOutlined, SaveOutlined, SnippetsOutlined } from "@ant-design/icons";
import { ApolloError, useMutation, useReactiveVar } from "@apollo/client";
import { Button, message, Space, Spin, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { editingRecordKey } from "../../../../../../cache";
import { DeleteChecklistItemDocument, DeleteChecklistItemMutation, DeleteChecklistItemMutationVariables } from "../../../../../../lib/graphql/graphql";
import { IChecklistTableItem } from "../../../../../../lib/Types"

interface Props {
  archive: (record: IChecklistTableItem) => void
  cancel: () => void
  edit: (record: IChecklistTableItem) => void
  record: IChecklistTableItem
  refetch: () => void
  save: (record: IChecklistTableItem) => void
}

export const OperationCell = ({
  archive,
  cancel,
  edit,
  record,
  refetch,
  save
}: Props) => {

  const { t } = useTranslation()
  const editingKey = useReactiveVar(editingRecordKey)

  const [ deleteItem, { loading } ] = useMutation<DeleteChecklistItemMutation, DeleteChecklistItemMutationVariables>(DeleteChecklistItemDocument, {
    onCompleted: (value: DeleteChecklistItemMutation) => {
      message.info(t("item-deleted", { description: value.deleteListItem?.checklistItem?.description }))
      refetch()
    },
    onError: (error: ApolloError) => message.error(error.message)
  })

  const EditingActions = () => {
    return record.id === '0' ? (
      <Space>
        <Tooltip title={ t("save") } placement="top">
          <Button
            icon={ <SaveOutlined /> }
            onClick={ () => save(record) }
            size="small"
            style={ { marginRight: 6 } } />
        </Tooltip>
      </Space>
    ) : (
      <Space>
        <Tooltip title={ t("save") } placement="top">
          <Button
            icon={ <SaveOutlined /> }
            onClick={ () => save(record) }
            size="small"
            style={ { marginRight: 6 } } />
        </Tooltip>
        <Tooltip title={ t("cancel") } placement="top">
          <Button
            icon={ <CloseCircleOutlined /> }
            onClick={ cancel }
            size="small" />
        </Tooltip>
      </Space>
    )
  }

  const ReadingActions = () => {
    return record.id === '0' ? (
      <Space>
        <Tooltip title={ t("save") } placement="top">
          <Button
            disabled={ editingKey !== '0' }
            icon={ <SaveOutlined /> }
            onClick={ () => save(record) }
            size="small"
            style={ { marginRight: 6 } } />
        </Tooltip>
      </Space>
    ) : (
      <Space>
        <Tooltip title={ t("edit") } placement="top">
          <Button
            disabled={ editingKey !== '0' }
            icon={ <EditOutlined /> }
            onClick={ () => edit(record) }
            size="small"
            style={ { marginRight: 6 } } />
        </Tooltip>
        <Tooltip title={ t("archive") } placement="top">
          <Button
            disabled={ editingKey !== '0' }
            icon={ <SnippetsOutlined /> }
            onClick={ () => archive(record) }
            size="small"
            style={ { marginRight: 8 } } />
        </Tooltip>
        <Tooltip title={ t("delete-item") } placement="top">
          <Button
            disabled={ editingKey !== '0' }
            icon={ <DeleteOutlined /> }
            onClick={ () => {
              deleteItem({ variables: { itemId: record.id } })
            } }
            size="small" />
        </Tooltip>
      </Space>
    )
  }

  return (record.id === '0' && editingKey === '0') ? (
    <Tooltip title={ t("save") } placement="top">
      <Button
        icon={ <SaveOutlined /> }
        onClick={ () => save(record) }
        size="small" />
    </Tooltip>
  ) : (
    <Spin
      spinning={ loading }
      tip={ t("processing") }>
      { record.id === editingKey ? <EditingActions /> : <ReadingActions /> }
    </Spin>
  )
}