import { CarryOutOutlined, DatabaseOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import Sider from "antd/lib/layout/Sider"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { selectedPage } from "../../../../cache"
import { paths } from "../../../../lib/Constants"

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
            key: 'app',
            icon: <CarryOutOutlined />,
            label: (
              <Link to={ paths.root }>
                { collapsed ? '' : t("nav.active") }
              </Link>
            )
          },
          {
            key: 'archive',
            icon: <DatabaseOutlined />,
            label: (
              <Link to={ paths.archive }>
                { collapsed ? '' : t("nav.archived") }
              </Link>
            )
          }
        ] }
        selectedKeys={ [ selectedPage() ] }
      />
    </Sider>
  )
}