import { FormInstance } from "antd"
import { IChecklistTableItem } from "../../../../../../lib/Types"
import { DescriptionCell } from "../DescriptionCell"
import { DueCell } from "../DueCell"
import { PeopleCell } from "../PeopleCell"
import { StatusCell } from "../StatusCell"

interface Props {
  children: any,
  dataIndex: any,
  editing: boolean,
  form: FormInstance
  index: any,
  inputType: any,
  ondatechange: (date: string) => void,
  record: IChecklistTableItem,
  title: any
}

export const EditableCell = ({
  children,
  editing,
  dataIndex,
  index,
  inputType,
  ondatechange,
  record,
  title,
  ...restProps
}: Props) => {

  switch (dataIndex) {
    case "description":
      return <DescriptionCell
        editing={ editing }
        record={ record } />
    case 'due':
      return <DueCell
        editing={ editing }
        record={ record } />
    case 'people':
      return <PeopleCell
        editing={ editing }
        record={ record } />
    case 'status':
      return <StatusCell
        editing={ editing }
        record={ record } />
    default:
      return (
        <td { ...restProps }>
          { children }
        </td>
      )
  }
}