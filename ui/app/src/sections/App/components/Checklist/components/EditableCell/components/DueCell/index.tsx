import { DatePicker, Form } from "antd"
import { IChecklistTableItem } from "../../../../../../../../lib/Types"
import { useTranslation } from "react-i18next"
import "./styles.css"
import moment, { Moment } from "moment"

interface Props {
  editing: boolean
  record: IChecklistTableItem
  revalidate: () => void
}

export const DueCell = ({
  editing,
  record,
  revalidate
}: Props) => {

  const systemFormat = "YYYY-MM-DD"
  const userFormat = "MMMM Do YYYY"
  const { t } = useTranslation()

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
      { editing ? (
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