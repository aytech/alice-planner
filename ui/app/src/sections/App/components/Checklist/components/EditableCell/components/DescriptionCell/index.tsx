import { Form, Input } from "antd"
import { useTranslation } from "react-i18next"
import { IChecklistTableItem } from "../../../../../../../../lib/Types"

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

  return (
    <td { ...restProps }>
      { editing ? (
        <Form.Item
          className="description"
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
          <Input
            placeholder={ t("description") }
            value={ record.description } />
        </Form.Item>
      ) : (
        <span>
          { record.description }
        </span>
      ) }
    </td>
  )
}