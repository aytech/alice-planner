import { Button, Layout, Result } from "antd"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

export const Archive = () => {

  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Layout>
      <Layout.Content>
        <Result
          status="404"
          title={ t("errors.nothing-here") }
          subTitle={ t("errors.more-coming") }
          extra={
            <Button
              onClick={ () => navigate("/") }
              type="primary">
              { t("go-home") }
            </Button>
          } />
      </Layout.Content>
    </Layout>
  )
}