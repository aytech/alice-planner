import { Avatar, Button, DatePicker, Dropdown, Form, Menu, Space, Table, Tooltip } from "antd"
import { useTranslation } from "react-i18next"
import { ChecklistItemStatus } from "../../../../lib/graphql/graphql"
import { IChecklistTable, IChecklistTableItem } from "../../../../lib/Types"
import "./styles.css"

interface Props {
  list: IChecklistTable
}

export const Checklist = ({
  list
}: Props) => {

  const { t } = useTranslation()
  const [ form ] = Form.useForm()

  const statusButtonClassName = (statusName: ChecklistItemStatus): string => {
    switch (statusName) {
      case ChecklistItemStatus.Done:
        return 'status-button button-green'
      case ChecklistItemStatus.InProgress:
        return 'status-button button-orange'
      default:
        return 'status-button'
    }
  }

  const statuses = (selectedStatus?: ChecklistItemStatus): { key: string, label: JSX.Element }[] => {
    return Object.values(ChecklistItemStatus).map((value: string, index: number) => {
      if (value !== selectedStatus) {
        return {
          key: index.toString(),
          label: (
            <Button className={ statusButtonClassName(value as ChecklistItemStatus) }>
              { t(`statuses.${ value }`) }
            </Button>
          )
        }
      }
      return undefined
    }).filter(item => item !== undefined) as { key: string, label: JSX.Element }[]
  }

  const columns = [
    {
      title: '',
      dataIndex: 'description',
      width: '65%'
    },
    {
      title: "Due date",
      dataIndex: 'due',
      width: '15%',
      render: () => (
        <Space direction="vertical">
          <DatePicker
            onChange={ (date, dateString) => console.log(date, dateString) }
            placeholder={ t("due-date") } />
        </Space>
      )
    },
    {
      title: "People",
      dataIndex: 'people',
      width: '10%',
      render: (_: any, record: IChecklistTableItem) => {
        return (
          <Avatar.Group>
            { record.people?.map(person => (
              <Tooltip title="Ant User" placement="top" key={ person.id }>
                <Avatar style={ { backgroundColor: '#f56a00' } }>
                  { person.name?.charAt(0) }
                </Avatar>
              </Tooltip>

            )) }
          </Avatar.Group>
        )
      }
    },
    {
      title: "Status",
      dataIndex: 'status',
      width: '10%',
      render: (_: any, record: IChecklistTableItem) => {
        return (
          <Dropdown
            overlay={ (
              <Menu items={ statuses(record.status) } />
            ) }
            placement="bottom">
            <Button className={ statusButtonClassName(record.status) }>
              { t(`statuses.${ record.status }`) }
            </Button>
          </Dropdown>
        )
      }
    }
  ]

  return (
    <Form
      component={ false }
      form={ form }>
      <Table
        bordered
        className="checklist-table"
        dataSource={ list.items }
        columns={ columns }
        pagination={ false }
        rowClassName="editable-row"
        title={ () => <h2>{ list.name }</h2> }
      />
    </Form>
  )
}