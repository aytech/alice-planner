import { ApolloError, useMutation } from "@apollo/client"
import { Avatar, Button, Form, message, Spin, Table, Tooltip } from "antd"
import { useTranslation } from "react-i18next"
import { editedRecord, editingRecordKey, emptyRecord } from "../../../../cache"
import { CreateChecklistItemDocument, CreateChecklistItemMutation, CreateChecklistItemMutationVariables, UpdateChecklistItemDocument, UpdateChecklistItemMutation, UpdateChecklistItemMutationVariables } from "../../../../lib/graphql/graphql"
import { ChecklistHelper } from "../../../../lib/Helpers"
import { IChecklistTable, IChecklistTableItem } from "../../../../lib/Types"
import { EditableCell } from "./components/EditableCell"
import { Header } from "./components/Header"
import { OperationCell } from "./components/OperationCell"
import "./styles.css"

interface Props {
  list: IChecklistTable
  refetch: () => void
}

export const Checklist = ({
  list,
  refetch
}: Props) => {

  const { t } = useTranslation()
  const [ form ] = Form.useForm()

  const [ saveItem, { loading: saveLoading } ] = useMutation<CreateChecklistItemMutation, CreateChecklistItemMutationVariables>(CreateChecklistItemDocument, {
    onCompleted: (_: CreateChecklistItemMutation) => {
      message.success(`${ t("form.messages.list-item-added") }!`)
      editedRecord(emptyRecord)
      refetch()
    },
    onError: (error: ApolloError) => {
      message.error(error.message)
    }
  })

  const [ updateItem, { loading: updateLoading } ] = useMutation<UpdateChecklistItemMutation, UpdateChecklistItemMutationVariables>(UpdateChecklistItemDocument, {
    onCompleted: (_: UpdateChecklistItemMutation) => {
      message.success(`${ t("form.messages.list-item-updated") }!`)
      editedRecord(emptyRecord)
      editingRecordKey('0')
      refetch()
    },
    onError: (error: ApolloError) => message.error(error.message)
  })

  const edit = (record: IChecklistTableItem) => {
    form.setFieldsValue({
      description: record.description,
      due: record.due,
      people: record.people,
      status: record.status
    })
    editedRecord(record)
    editingRecordKey(record.id)
  }

  const cancel = () => {
    form.setFieldsValue({
      description: '',
      due: ''
    });
    editedRecord(emptyRecord)
    editingRecordKey('0')
  }

  const save = (record: IChecklistTableItem) => {
    form.validateFields().then(() => {
      const data: any = {
        description: form.getFieldValue("description"),
        due: record.due,
        list: record.list,
        people: editedRecord().people.map(person => person.id),
        status: editedRecord().status
      }
      if (record.id === '0') {
        saveItem({ variables: { data } })
      } else {
        updateItem({ variables: { data: { ...data, id: record.id } } })
      }
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
      className: "operation",
      dataIndex: "operation",
      render: (_: any, record: IChecklistTableItem) => (
        <OperationCell
          cancel={ cancel }
          edit={ edit }
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
      <Spin
        spinning={ saveLoading || updateLoading }
        tip={ t("processing") }>
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
          title={ () => (
            <Header
              list={ list }
              refetch={ refetch } />
          ) }
        />
      </Spin>
    </Form>
  )
}