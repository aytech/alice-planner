import { DatePicker, Space } from "antd"
import { IChecklistTableItem } from "../../../../../../lib/Types"
import { Moment } from "moment"
import { useTranslation } from "react-i18next"

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

  const onDateChange = (date: Moment | null, dateString: string) => {
    console.log(date, dateString)
  }
  
  return (
    <td { ...restProps }>
      { editing ? (
        <Space direction="vertical">
          <DatePicker
            onChange={ onDateChange }
            placeholder={ record.due === undefined ? t("due-date") : record.due } />
        </Space>
      ) : (
        <span>
          { record.due }
        </span>
      ) }
    </td>
  )
}