import { PlusCircleOutlined } from "@ant-design/icons"
import { ApolloError, useMutation } from "@apollo/client"
import { Button, Form, Input, message, Modal, Space, Tooltip } from "antd"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { CreateChecklistDocument, CreateChecklistItemMutation, CreateChecklistMutation, CreateChecklistMutationVariables } from "../../../../lib/graphql/graphql"
import "./styles.css"

interface Props {
  refetch: () => void
}

export const AddChecklist = ({
  refetch
}: Props) => {

  const { t } = useTranslation()
  const [ form ] = Form.useForm()

  const [ addList, { loading } ] = useMutation<CreateChecklistMutation, CreateChecklistMutationVariables>(CreateChecklistDocument, {
    onCompleted: (_: CreateChecklistItemMutation) => {
      message.success(`${ t("form.messages.list-added") }!`)
      refetch()
    },
    onError: (error: ApolloError) => message.error(error.message)
  })

  const [ isModalVisible, setIsModalVisible ] = useState(false)

  const submitForm = () => {
    form.validateFields()
      .then(() => {
        addList({ variables: { data: { name: form.getFieldValue("description") } } })
      })
  }

  const cancel = () => {
    form.resetFields()
    setIsModalVisible(false)
  }

  return (
    <>
      <Space className="new-checklist" size={ 24 }>
        <Tooltip title={ t("add-list") } placement="top">
          <Button
            icon={ <PlusCircleOutlined /> }
            loading={ loading }
            onClick={ () => setIsModalVisible(true) }
            size="large" />
        </Tooltip>
      </Space>
      <Modal
        footer={ [
          <Button
            danger
            key="cancel"
            onClick={ cancel }>
            { t("cancel") }
          </Button>,
          <Button
            ghost
            key="submit"
            onClick={ submitForm }
            type="primary">
            { t("send") }
          </Button>
        ] }
        onCancel={ () => setIsModalVisible(false) }
        visible={ isModalVisible }
        title={ t("new-list") }>
        <Form form={ form }>
          <Form.Item
            name="description"
            rules={ [
              {
                required: true,
                message: t("form.errors.list-empty")
              }
            ] }>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}