import { PlusCircleOutlined } from "@ant-design/icons"
import { Button, Form, Input, Modal, Space, Tooltip } from "antd"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import "./styles.css"

export const AddChecklist = () => {

  const { t } = useTranslation()
  const [ form ] = Form.useForm()

  const [ isModalVisible, setIsModalVisible ] = useState(false)

  const submitForm = () => {
    form.validateFields()
      .then(() => {
        console.log("Submitting: ", { description: form.getFieldValue("description") })
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