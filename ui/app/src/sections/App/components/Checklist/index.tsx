import { Avatar, Button, Form, Table, Tooltip } from "antd"
import { useTranslation } from "react-i18next"
import { editedRecord, emptyRecord } from "../../../../cache"
import { ChecklistHelper } from "../../../../lib/Helpers"
import { IChecklistTable, IChecklistTableItem } from "../../../../lib/Types"
import { EditableCell } from "./components/EditableCell"
import { OperationCell } from "./components/OperationCell"
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
      description: record.description,
      due: record.due,
      people: record.people,
      status: record.status
    });
    editedRecord(record)
    setEditingRecordKey(record.id)
  }

  const cancel = () => {
    form.setFieldsValue({
      description: '',
      due: ''
    });
    editedRecord(emptyRecord)
    setEditingRecordKey("0")
  }

  const save = (record: IChecklistTableItem) => {
    form.validateFields().then(() => {
      console.log("Saving: ", {
        description: form.getFieldValue("description"),
        due: record.due,
        list: record.list,
        people: editedRecord().people,
        status: editedRecord().status
      })
    })
  }

  const revalidate = (field: string) => {
    form.validateFields([ field ])
  }

  const columns = [
    {
      dataIndex: 'description',
      title: '',
      width: '65%'
    },
    {
      dataIndex: 'due',
      title: t("due-date"),
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
      title: t("people"),
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
      render: (_: any, record: IChecklistTableItem) => (
        <OperationCell
          cancel={ cancel }
          edit={ edit }
          editingKey={ editingRecordKey }
          editing={ isEditing(record) }
          record={ record }
          save={ save } />
      ),
      title: '',
      width: '15%'
    }
  ]
  const mergedColumns = columns.map(column => {
    return {
      ...column,
      onCell: (record: IChecklistTableItem) => ({
        dataIndex: column.dataIndex,
        editing: isEditing(record),
        record,
        revalidate,
        title: column.title
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