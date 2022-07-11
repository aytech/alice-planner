import { useReactiveVar } from "@apollo/client"
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
  revalidate,
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
        record={ record }
        revalidate={ () => revalidate("people") } />
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