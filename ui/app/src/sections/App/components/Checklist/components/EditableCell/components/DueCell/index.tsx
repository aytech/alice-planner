import { DatePicker, Form } from "antd"
import { IChecklistTableItem } from "../../../../../../../../lib/Types"
import { useTranslation } from "react-i18next"
import "./styles.css"
import moment, { Moment } from "moment"
import { useReactiveVar } from "@apollo/client"
import { editingRecordKey } from "../../../../../../../../cache"

interface Props {
  record: IChecklistTableItem
  revalidate: () => void
}

export const DueCell = ({
  record,
  revalidate
}: Props) => {

  const systemFormat = "YYYY-MM-DD"
  const userFormat = "MMMM Do YYYY"

  const { t } = useTranslation()
  const editingKey = useReactiveVar(editingRecordKey)

  const Picker = () => (
    <DatePicker
      onChange={ (value: Moment | null, _: string) => {
        if (value !== null) {
          record.due = value.format(systemFormat)
        }
        revalidate()
      } }
      placeholder={ record.due === undefined ? t("due-date") : record.due } />
  )

  return (
    <td className="due-cell">
      { record.id === editingKey ? (
        <Form.Item
          className="due"
          name="due"
          rules={ [
            {
              validator: () =>
                record.due === undefined ?
                  Promise.reject(new Error(t("form.errors.due-empty")))
                  : Promise.resolve()
            }
          ] }>
          <Picker />
        </Form.Item>
      ) : (
        <span>
          { moment(record.due).format(userFormat) }
        </span>
      ) }
    </td>
  )
}