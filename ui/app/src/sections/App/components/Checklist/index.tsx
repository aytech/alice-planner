import { Avatar, Button, Form, Table, Tooltip, Typography } from "antd"
import { useTranslation } from "react-i18next"
import { ChecklistHelper } from "../../../../lib/Helpers"
import { IChecklistTable, IChecklistTableItem } from "../../../../lib/Types"
import { EditableCell } from "./components/EditableCell"
import "./styles.css"

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
    setEditingRecordKey(record.id)
  }

  const cancel = () => {
    form.setFieldsValue({
      description: '',
      due: ''
    });
    setEditingRecordKey('0')
  }

  const save = () => {
    console.log(`saving: ${ form.getFieldValue('people') }`)
  }

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
          <Button className={ ChecklistHelper.statusButtonClassName(record.status) }>
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
        if (record.id === '0' && editingRecordKey === '0') {
          return (
            <Typography.Link
              onClick={ save }>
              { t("save") }
            </Typography.Link>
          )
        }
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={ () => console.log(`saving ${ form.getFieldValue('description') }`) }
              style={ {
                marginRight: 8,
              } }>
              { t("save") }
            </Typography.Link>
            <Typography.Link
              onClick={ cancel }>
              { t("cancel") }
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={ editingRecordKey !== '0' }
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
      onCell: (record: IChecklistTableItem) => ({
        dataIndex: column.dataIndex,
        editing: isEditing(record),
        form,
        inputType: 'text',
        record,
        title: column.title,
        ondatechange: (date: string) => {
          form.setFieldsValue({ 'due': date })
        }
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