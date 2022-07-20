import { CarryOutOutlined, DatabaseOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import Sider from "antd/lib/layout/Sider"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router-dom"
import { paths } from "../../../../lib/Constants"

interface Props {
  collapsed: boolean
}

export const NavColumn = ({
  collapsed
}: Props) => {

  const location = useLocation()
  const { t } = useTranslation()

  const [ selectedPages, setSelectedPages ] = useState<string[]>([])

  const getItem = (key: string, icon: React.ReactNode, label: React.ReactNode) => {
    return { key, icon, label }
  }

  const menuItems = [
    getItem("1", <CarryOutOutlined />, (
      <Link to={ paths.root }>
        { collapsed ? '' : t("nav.active") }
      </Link>
    )),
    getItem("2", <DatabaseOutlined />, (
      <Link to={ paths.archive }>
        { collapsed ? '' : t("nav.archived") }
      </Link>
    ))
  ]

  useEffect(() => {
    switch(location.pathname) {
      case "/archive":
        setSelectedPages(["2"])
        break
      default:
        setSelectedPages(["1"])
    }
  }, [ location ])

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
        items={ menuItems }
        selectedKeys={ selectedPages }
      />
    </Sider>
  )
}