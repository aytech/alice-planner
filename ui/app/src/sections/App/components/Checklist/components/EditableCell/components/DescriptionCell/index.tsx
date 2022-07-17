import { useReactiveVar } from "@apollo/client"
import { Form, Input } from "antd"
import { useTranslation } from "react-i18next"
import { editingRecordKey } from "../../../../../../../../cache"
import { IChecklistTableItem } from "../../../../../../../../lib/Types"

interface Props {
  record: IChecklistTableItem
}

export const DescriptionCell = ({
  record
}: Props) => {

  const { t } = useTranslation()
  const editingKey = useReactiveVar(editingRecordKey)

  return (
    <td>
      { record.id === editingKey ? (
        <Form.Item
          className="description"
          initialValue={ record.description }
          name="description"
          rules={ [
            {
              validator: (_, value: string) => {
                return value === undefined || value.replaceAll(/\s+/g, '') === '' ?
                  Promise.reject(t("form.errors.description-empty")) :
                  Promise.resolve()
              }
            }
          ] }>
          <Input placeholder={ t("description") } type="text" />
        </Form.Item>
      ) : (
        <span>
          { record.description }
        </span>
      ) }
    </td>
  )
}