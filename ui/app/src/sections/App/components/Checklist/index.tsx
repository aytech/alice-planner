import { Avatar, Button, DatePicker, Dropdown, Form, Input, Menu, Popconfirm, Space, Table, Tooltip, Typography } from "antd"
import { useTranslation } from "react-i18next"
import { ChecklistItemStatus } from "../../../../lib/graphql/graphql"
import { IChecklistTable, IChecklistTableItem, IUser } from "../../../../lib/Types"
import "./styles.css"

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

  const { t } = useTranslation()

  switch (dataIndex) {
    case "description":
      return (
        <td { ...restProps }>
          { editing ? (
            <Form.Item
              className="description"
              name={ dataIndex }>
              <Input />
            </Form.Item>
          ) : children }
        </td>
      )
    case 'people':
      return (
        <td { ...restProps }>
          { editing ? (
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
                    <Tooltip title="Ant User" placement="top" key={ person.id }>
                      <Avatar style={ { backgroundColor: '#f56a00' } }>
                        { person.name?.charAt(0) }
                      </Avatar>
                    </Tooltip>
                  )) }
                </Avatar.Group>
              </Button>
            </Dropdown>
          ) : children }
        </td>
      )
    case 'due':
      return (
        <td { ...restProps }>
          { editing ? (
            <Space direction="vertical">
              <DatePicker
                onChange={ (date, dateString) => console.log(date, dateString) }
                placeholder={ t("due-date") } />
            </Space>
          ) : children }
        </td>
      )
    case 'status':
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
      return (
        <td { ...restProps }>
          { editing ? (
            <Dropdown
              overlay={ (
                <Menu items={ statuses(record.status) } />
              ) }
              placement="bottom">
              <Button className={ statusButtonClassName(record.status) }>
                { t(`statuses.${ record.status }`) }
              </Button>
            </Dropdown>
          ) : children }
        </td>
      )
    default:
      return (
        <td { ...restProps }>
          { children }
        </td>
      )
  }
};

interface Props {
  editingRecordKey: string
  list: IChecklistTable
  setEditingRecordKey: (key: string) => void
}

export const Checklist = ({
  editingRecordKey,
  list,
  setEditingRecordKey
}: Props) => {

  const { t } = useTranslation()
  const [ form ] = Form.useForm()

  const isEditing = (record: IChecklistTableItem) => record.id === editingRecordKey;

  const edit = (record: IChecklistTableItem) => {
    form.setFieldsValue({
      description: '',
      due: '',
      ...record,
    });
    setEditingRecordKey(record.id);
  };

  const columns = [
    {
      dataIndex: 'description',
      title: '',
      width: '65%'
    },
    {
      dataIndex: 'due',
      title: "Due date",
      width: '15%',
    },
    {
      dataIndex: 'people',
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
          <Button className={ statusButtonClassName(record.status) }>
            { t(`statuses.${ record.status }`) }
          </Button>
        )
      },
      title: "Status",
      width: '10%'
    },
    {
      dataIndex: 'operation',
      render: (_: any, record: IChecklistTableItem) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={ () => console.log(`saving ${ record.key }`) }
              style={ {
                marginRight: 8,
              } }>
              { t("save") }
            </Typography.Link>
            <Popconfirm
              title={ `${ t("cancel") }?` }
              onConfirm={ () => setEditingRecordKey('') }>
              <Typography.Link>
                { t("cancel") }
              </Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={ editingRecordKey !== '' }
            onClick={ () => edit(record) }>
            { t("edit") }
          </Typography.Link>
        );
      },
      title: 'operation',
      width: '15%'
    }
  ]
  const mergedColumns = columns.map(column => {
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