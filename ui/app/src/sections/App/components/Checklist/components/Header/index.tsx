import { DeleteOutlined, SnippetsOutlined } from "@ant-design/icons"
import { Button, Col, Row, Tooltip } from "antd"
import { useTranslation } from "react-i18next"
import { IChecklistTable } from "../../../../../../lib/Types"
import "./styles.css"

interface Props {
  list: IChecklistTable
}

export const Header = ({
  list
}: Props) => {

  const { t } = useTranslation()

  const archive = () => {
    console.log(`Archiving ${ list.id }`)
  }

  const remove = () => {
    console.log(`Removing ${ list.id }`)
  }

  return (
    <Row>
      <Col
        className="header-title"
        sm={ 12 } xs={ 24 }>
        <h2><strong>{ list.name }</strong></h2>
      </Col>
      <Col
        className="header-actions"
        sm={ 12 } xs={ 24 }>
        <Row>
          <Col xs={ 8 } md={ 18 } />
          <Col
            className="header-action"
            xs={ 8 } md={ 3 }>
            <Tooltip title={ t("archive-list") } placement="top">
              <Button icon={ <SnippetsOutlined /> } onClick={ archive } />
            </Tooltip>
          </Col>
          <Col
            className="header-action"
            sm={ 8 } md={ 3 }>
            <Tooltip title={ t("delete-list") } placement="top">
              <Button icon={ <DeleteOutlined /> } onClick={ remove } />
            </Tooltip>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}