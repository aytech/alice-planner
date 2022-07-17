import { IChecklistTableItem } from "../../../../../../lib/Types"
import { DescriptionCell } from "./components/DescriptionCell"
import { DueCell } from "./components/DueCell"
import { PeopleCell } from "./components/PeopleCell"
import { StatusCell } from "./components/StatusCell"

interface Props {
  children: any,
  dataIndex: any,
  record: IChecklistTableItem,
  revalidate: (field: string) => void
  title: any
}

export const EditableCell = ({
  children,
  dataIndex,
  record,
  revalidate
}: Props) => {
  switch (dataIndex) {
    case "description":
      return <DescriptionCell record={ record } />
    case 'due':
      return <DueCell
        record={ record }
        revalidate={ () => revalidate("due") } />
    case 'people':
      return <PeopleCell
        record={ record }
        revalidate={ () => revalidate("people") } />
    case 'status':
      return <StatusCell record={ record } />
    default:
      return (
        <td>
          { children }
        </td>
      )
  }
}