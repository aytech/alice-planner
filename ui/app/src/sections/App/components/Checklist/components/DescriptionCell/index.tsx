import { Form, Input } from "antd"
import { useTranslation } from "react-i18next"
import { IChecklistTableItem } from "../../../../../../lib/Types"

interface Props {
  editing: boolean,
  record: IChecklistTableItem
}

export const DescriptionCell = ({
  editing,
  record,
  ...restProps
}: Props) => {

  const { t } = useTranslation()

  const DescriptionInput = () => record.description === undefined ? (
    <Input placeholder={ t("description") } />
  ) : (
    <Input value={ record.description } />
  )

  return (
    <td { ...restProps }>
      { editing ? (
        <Form.Item
          className="description"
          name={ `description-${ record.tableKey }` }>
          <DescriptionInput />
        </Form.Item>
      ) : (
        <span>
          { record.description }
        </span>
      ) }
    </td>
  )
}