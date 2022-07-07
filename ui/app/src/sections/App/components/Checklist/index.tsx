import { Avatar, Button, DatePicker, Dropdown, Form, Input, Menu, Space, Table, Tooltip } from "antd"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ChecklistItemStatus } from "../../../../lib/graphql/graphql"
import { IChecklistTable, IChecklistTableItem, IUser } from "../../../../lib/Types"
import "./styles.css"

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}: { editing: any, dataIndex: any, title: any, inputType: any, record: any, index: any, children: any }) => {
  switch (dataIndex) {
    case "description":
      return (
        <td { ...restProps }>
          <Form.Item
            className="description"
            name={ dataIndex }>
            <Input />
          </Form.Item>
        </td>
      )
    case 'people':
      return (
        <td { ...restProps }>
          <Dropdown
          className="people-dropdown"
            overlay={ (
              <Menu items={ [ {
                key: 'A',
                label: (
                  <Tooltip title="Ant User" placement="top">
                    <Avatar style={ { backgroundColor: '#f56a00' } }>A</Avatar>
                  </Tooltip>
                )
              } ] } />
            ) }
            placement="bottom">
            <Button className="people-trigger">
              <Avatar.Group>
                { record.people.map((person: IUser) => (
                  <Tooltip title="Ant User" placement="top">
                    <Avatar style={ { backgroundColor: '#f56a00' } }>
                      { person.name?.charAt(0) }
                    </Avatar>
                  </Tooltip>
                )) }
              </Avatar.Group>
            </Button>
          </Dropdown>
        </td>
      )
    default:
      return (
        <td { ...restProps }>
          { children }
        </td>
      )
  }
  // return (
  //   <td { ...restProps }>
  //     { children }
  //     {/* <Form.Item
  //       name={ dataIndex }>
  //         <Input />
  //       </Form.Item> */}
  //   </td>
  // )
  // const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  // return (
  //   <td {...restProps}>
  //     {editing ? (
  //       <Form.Item
  //         name={dataIndex}
  //         style={{
  //           margin: 0,
  //         }}
  //         rules={[
  //           {
  //             required: true,
  //             message: `Please Input ${title}!`,
  //           },
  //         ]}
  //       >
  //         {inputNode}
  //       </Form.Item>
  //     ) : (
  //       children
  //     )}
  //   </td>
  // );
};

interface Props {
  list: IChecklistTable
}

export const Checklist = ({
  list
}: Props) => {

  const { t } = useTranslation()
  const [ form ] = Form.useForm()

  const [ editingKey, setEditingKey ] = useState('0');

  const isEditing = (record: any) => record.key === editingKey;

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
      dataIndex: 'description',
      editable: true,
      title: '',
      width: '65%'
    },
    {
      dataIndex: 'due',
      render: () => (
        <Space direction="vertical">
          <DatePicker
            onChange={ (date, dateString) => console.log(date, dateString) }
            placeholder={ t("due-date") } />
        </Space>
      ),
      title: "Due date",
      width: '15%',
    },
    {
      dataIndex: 'people',
      editable: true,
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
      },
      title: "People",
      width: '10%',
    },
    {
      dataIndex: 'status',
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
      },
      title: "Status",
      width: '10%'
    }
  ]
  const mergedColumns = columns.map(column => {
    if (!column.editable) {
      return column
    }
    return {
      ...column,
      onCell: (record: any) => ({
        record,
        inputType: 'text',
        dataIndex: column.dataIndex,
        title: column.title,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <Form
      component={ false }
      form={ form }>
      <Table
        bordered
        className="checklist-table"
        components={ {
          body: {
            cell: EditableCell,
          },
        } }
        dataSource={ list.items }
        columns={ mergedColumns }
        pagination={ false }
        rowClassName="editable-row"
        title={ () => <h2>{ list.name }</h2> }
      />
    </Form>
  )
}