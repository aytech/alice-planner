import { CloseCircleOutlined, EditOutlined, SaveOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { IChecklistTableItem } from "../../../../../../lib/Types"

interface Props {
  cancel: () => void
  edit: (record: IChecklistTableItem) => void
  editingKey: string,
  editing: boolean
  record: IChecklistTableItem
  save: (record: IChecklistTableItem) => void
}

export const OperationCell = ({
  cancel,
  edit,
  editingKey,
  editing,
  record,
  save
}: Props) => {

  const { t } = useTranslation()

  if (record.id === '0' && editingKey === '0') {
    return (
      <Tooltip title={ t("save") } placement="top">
        <Button
          icon={ <SaveOutlined /> }
          onClick={ () => save(record) }
          size="small" />
      </Tooltip>
    )
  }

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
            onClick={ () => console.log("archiving") }
            size="small"
            style={ { marginRight: 8 } } />
        </Tooltip>
      </Space>
    )
  }

  return editing ? <EditingActions /> : <ReadingActions />
}