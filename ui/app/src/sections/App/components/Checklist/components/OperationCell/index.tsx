import { Typography } from "antd";
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
      <Typography.Link
        onClick={ () => save(record) }>
        { t("save") }
      </Typography.Link>
    )
  }

  return editing ? (
    <span>
      <Typography.Link
        onClick={ () => save(record) }
        style={ {
          marginRight: 8,
        } }>
        { t("save") }
      </Typography.Link>
      <Typography.Link
        onClick={ cancel }>
        { t("cancel") }
      </Typography.Link>
    </span>
  ) : (
    <Typography.Link
      disabled={ editingKey !== '0' }
      onClick={ () => edit(record) }>
      { t("edit") }
    </Typography.Link>
  );
}