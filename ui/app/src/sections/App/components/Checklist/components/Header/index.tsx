import { DeleteOutlined, PlusCircleOutlined, SnippetsOutlined } from "@ant-design/icons"
import { Button, Col, Row, Tooltip } from "antd"
import { useTranslation } from "react-i18next"
import "./styles.css"

interface Props {
  name?: string | null
}

export const Header = ({
  name
}: Props) => {

  const { t } = useTranslation()

  return (
    <Row>
      <Col
        className="header-title"
        sm={ 12 } xs={ 24 }>
        <h2><strong>{ name }</strong></h2>
      </Col>
      <Col
        className="header-actions"
        sm={ 12 } xs={ 24 }>
        <Row>
          <Col
            className="header-action"
            xs={ 8 } md={ 18 }>
            <Tooltip title={ t("add-list") } placement="top">
              <Button icon={ <PlusCircleOutlined /> } />
            </Tooltip>
          </Col>
          <Col
            className="header-action"
            xs={ 8 } md={ 3 }>
            <Tooltip title={ t("archive-list") } placement="top">
              <Button icon={ <SnippetsOutlined /> } />
            </Tooltip>
          </Col>
          <Col
            className="header-action"
            sm={ 8 } md={ 3 }>
            <Tooltip title={ t("delete-list") } placement="top">
              <Button icon={ <DeleteOutlined /> } />
            </Tooltip>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}