import { IChecklistTableItem } from "../../../../../../lib/Types"
import { DescriptionCell } from "./components/DescriptionCell"
import { DueCell } from "./components/DueCell"
import { PeopleCell } from "./components/PeopleCell"
import { StatusCell } from "./components/StatusCell"

interface Props {
  children: any,
  dataIndex: any,
  editing: boolean,
  record: IChecklistTableItem,
  revalidate: (field: string) => void
  title: any
}

export const EditableCell = ({
  children,
  dataIndex,
  editing,
  record,
  revalidate
}: Props) => {
  switch (dataIndex) {
    case "description":
      return <DescriptionCell
        editing={ editing }
        record={ record } />
    case 'due':
      return <DueCell
        editing={ editing }
        record={ record }
        revalidate={ () => revalidate("due") } />
    case 'people':
      return <PeopleCell
        editing={ editing }
        record={ record }
        revalidate={ () => revalidate("people") } />
    case 'status':
      return <StatusCell
        editing={ editing }
        record={ record } />
    default:
      return (
        <td>
          { children }
        </td>
      )
  }
}