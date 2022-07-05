import { CarryOutOutlined, DatabaseOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import Sider from "antd/lib/layout/Sider"
import { useTranslation } from "react-i18next"

interface Props {
  collapsed: boolean
}

export const NavColumn = ({
  collapsed
}: Props) => {

  const { t } = useTranslation()

  return (
    <Sider
      collapsed={ collapsed }
      collapsible
      trigger={ null }>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={ [ '1' ] }
        items={ [
          {
            key: '1',
            icon: <CarryOutOutlined />,
            label: collapsed ? '' : t("nav.active"),
          },
          {
            key: '2',
            icon: <DatabaseOutlined />,
            label: collapsed ? '' : t("nav.archived"),
          }
        ] }
      />
    </Sider>
  )
}