import { ApolloError, useMutation } from "@apollo/client"
import { Button, Form, Input, message, Modal } from "antd"
import { useTranslation } from "react-i18next"
import { CreateChecklistDocument, CreateChecklistMutation, CreateChecklistMutationVariables, UpdateChecklistDocument, UpdateChecklistMutation, UpdateChecklistMutationVariables } from "../../../../../../lib/graphql/graphql"
import { IChecklistTable } from "../../../../../../lib/Types"

interface Props {
  checklist?: IChecklistTable
  close: () => void
  isOpen: boolean
  refetch: () => void
}

export const ChecklistModal = ({
  checklist,
  close,
  isOpen,
  refetch
}: Props) => {

  const { t } = useTranslation()
  const [ form ] = Form.useForm()

  const [ addList, { loading: addLoading } ] = useMutation<CreateChecklistMutation, CreateChecklistMutationVariables>(CreateChecklistDocument, {
    onCompleted: (_: CreateChecklistMutation) => {
      message.success(`${ t("form.messages.list-added") }!`)
      refetch()
      close()
    },
    onError: (error: ApolloError) => message.error(error.message)
  })
  const [ updateList, { loading: updateLoading } ] = useMutation<UpdateChecklistMutation, UpdateChecklistMutationVariables>(UpdateChecklistDocument, {
    onCompleted: (_: UpdateChecklistMutation) => {
      message.info(t("form.messages.list-updated"))
      refetch()
    },
    onError: (error: ApolloError) => message.error(error.message)
  })

  const submitForm = () => {
    form.validateFields()
      .then(() => {
        const data = { name: form.getFieldValue("description") }
        if (checklist === undefined) {
          addList({ variables: { data } })
        } else {
          updateList({ variables: { data: { id: checklist.id, ...data } } })
        }
      })
  }

  const cancel = () => {
    form.resetFields()
    close()
  }

  return (
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
          loading={ addLoading || updateLoading }
          onClick={ submitForm }
          type="primary">
          { checklist === undefined ? t("add") : t("edit") }
        </Button>
      ] }
      onCancel={ () => close }
      visible={ isOpen }
      title={ checklist === undefined ? t("add-list") : t("edit-list") }>
      <Form form={ form }>
        <Form.Item
          initialValue={ checklist?.name }
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
  )
}