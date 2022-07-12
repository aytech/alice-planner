import { ApolloError, useMutation } from "@apollo/client"
import { Button, Form, FormProps, Input, Layout, message, Spin } from "antd"
import { Content, Header } from "antd/lib/layout/layout"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { appUser } from "../../cache"
import { errorMessages, refreshTokenName, tokenName } from "../../lib/Constants"
import { TokenAuthDocument, TokenAuthMutation, TokenAuthMutationVariables } from "../../lib/graphql/graphql"
import { UrlHelper } from "../../lib/Helpers"
import "./styles.css"

const layout: FormProps = {
  labelCol: {
    lg: 8,
    md: 8,
    sm: 8
  },
  wrapperCol: {
    lg: 16,
    md: 16,
    sm: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    lg: {
      offset: 8,
      span: 16,
    },
    xs: {
      offset: 0,
      span: 24
    }
  },
};

export const Login = () => {

  const { t } = useTranslation()
  const navigate = useNavigate()

  const [ getToken, { loading: loginLoading } ] = useMutation<TokenAuthMutation, TokenAuthMutationVariables>(TokenAuthDocument, {
    onCompleted: (token: TokenAuthMutation) => {
      if (token.tokenAuth !== undefined && token.tokenAuth !== null) {
        appUser(token.tokenAuth.user)
        localStorage.setItem(tokenName, token.tokenAuth.token)
        localStorage.setItem(refreshTokenName, token.tokenAuth.refreshToken)
        // settingsRefetch()
        navigate(UrlHelper.getReferrer())
      }
    },
    onError: (reason: ApolloError) => {
      switch (reason.message) {
        case errorMessages.invalidCredentials:
          message.error(t("login.invalid-login"))
          break
        default:
          message.error(t("generic-error"))
      }
    }
  })

  const [ form ] = Form.useForm()

  const login = (data: { password: string, username: string }): void => {
    getToken({
      variables: {
        password: data.password.trim(),
        username: data.username.trim()
      }
    })
  }

  return (
    <Layout className="site-layout">
      <Header
        className="site-layout-background"
        style={ {
          padding: 0,
        } }>
      </Header>
      <Content className="site-layout-background main-content">
        <Spin
          spinning={ loginLoading }
          tip={ `${ t("login.in-progress") }...` }>
          <Form
            { ...layout }
            className="login"
            form={ form }
            name="login"
            onFinish={ login }>
            <Form.Item
              label={ t("username") }
              name="username"
              rules={ [ {
                required: true,
                message: t("form.errors.field-required")
              } ] }>
              <Input type="text" placeholder={ t("username") } />
            </Form.Item>
            <Form.Item
              label="Heslo"
              name="password"
              rules={ [ {
                required: true,
                message: t("form.errors.field-required")
              } ] }>
              <Input type="password" placeholder={ t("password") } />
            </Form.Item>
            <Form.Item { ...tailLayout }>
              <Button type="default" htmlType="button" onClick={ () => form.resetFields() }>
                { t("reset") }
              </Button>
              <Button type="primary" htmlType="submit">
                { t("login") }
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Content>
    </Layout>
  )
}