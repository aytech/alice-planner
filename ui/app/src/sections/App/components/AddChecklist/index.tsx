import { PlusCircleOutlined } from "@ant-design/icons"
import { Button, Space, Tooltip } from "antd"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ChecklistModal } from "./components/ChecklistModal"
import "./styles.css"

interface Props {
  refetch: () => void
}

export const AddChecklist = ({
  refetch
}: Props) => {

  const { t } = useTranslation()

  const [ isModalVisible, setIsModalVisible ] = useState(false)

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
      <ChecklistModal
        close={ () => setIsModalVisible(false) }
        isOpen={ isModalVisible }
        refetch={ refetch } />
    </>
  )
}