import { Layout, Skeleton } from "antd"
import { Content, Header } from "antd/lib/layout/layout"

export const Splash = () => {
  return (
    <Layout className="site-layout">
      <Header
        className="site-layout-background"
        style={ {
          padding: 0,
        } }>
      </Header>
      <Content className="site-layout-background main-content">
        <Skeleton
          active
          paragraph={ { rows: 3 } }
          className="splash-skeleton" />
        <Skeleton
          active
          paragraph={ { rows: 3 } }
          className="splash-skeleton" />
        <Skeleton
          active
          paragraph={ { rows: 3 } }
          className="splash-skeleton" />
      </Content>
    </Layout>
  )
}