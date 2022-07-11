import { DatePicker, Form } from "antd"
import { IChecklistTableItem } from "../../../../../../../../lib/Types"
import { useTranslation } from "react-i18next"
import "./styles.css"

interface Props {
  editing: boolean
  record: IChecklistTableItem
}

export const DueCell = ({
  editing,
  record,
  ...restProps
}: Props) => {

  const { t } = useTranslation()

  return (
    <td { ...restProps }>
      { editing ? (
        <Form.Item
          className="due"
          name="due"
          rules={ [
            {
              required: true,
              message: t("form.errors.due-empty")
            }
          ] }>
          <DatePicker placeholder={ t("due-date") } />
        </Form.Item>
      ) : (
        <span>
          { record.due }
        </span>
      ) }
    </td>
  )
}