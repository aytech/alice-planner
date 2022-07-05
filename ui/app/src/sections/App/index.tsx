import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons"
import { useQuery } from "@apollo/client"
import { Menu } from "antd"
import Layout, { Content, Header } from "antd/lib/layout/layout"
import Sider from "antd/lib/layout/Sider"
import React, { useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { appSettings } from "../../cache"
import { paths, sessionStorageKeys } from "../../lib/Constants"
import { SettingsDocument, SettingsQuery, useAppQuery } from "../../lib/graphql/graphql"
import { UrlHelper } from "../../lib/Helpers"
import { Login } from "../Login"
import "./styles.css"

export const App = () => {

  useAppQuery()

  const location = useLocation()
  const navigate = useNavigate()

  const [ collapsed, setCollapsed ] = useState(false);

  const { loading: settingsLoading, data: settingsData, refetch: settingsRefetch } = useQuery<SettingsQuery>(SettingsDocument, {
    onCompleted: (value: SettingsQuery) => {
      if (value?.settings === null) {
        // navigate(`/login?next=${ UrlHelper.getReferrer() }`)
      } else {
        if (location.pathname === paths.login) {
          // User is logged in, redirect
          const page = sessionStorage.getItem(sessionStorageKeys.page)
          if (page === null) {
            // navigate("/")
          } else {
            // navigate(page)
          }
        }
        appSettings(value.settings)
      }
    }
  })

  return (
    <Layout>
      <Sider trigger={ null } collapsible collapsed={ collapsed }>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={ [ '1' ] }
          items={ [
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ] }
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={ {
            padding: 0,
          } }
        >
          { React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          }) }
        </Header>
        <Content
          className="site-layout-background main-content"
          style={ {
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          } }>
          <div>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
            <h1>AAAA</h1>
          </div>
        </Content>
      </Layout>
    </Layout>
    // <Layout id="app">
    //   <Skeleton
    //     active
    //     className="app-skeleton"
    //     loading={ settingsLoading }>
    //     <Affix
    //       className="app__affix-header"
    //       offsetTop={ 0 }>
    //       <h1>Header</h1>
    //     </Affix>
    //     <Layout.Header>
    //       <h1>Page title</h1>
    //     </Layout.Header>
    //     <Layout.Content className="app-content">
    //       <Routes>
    //         <Route path="/" element={ <h1>APP</h1> } />
    //         <Route path={ paths.login } element={ <Login settingsRefetch={ settingsRefetch } /> } />
    //         <Route path="*" element={ <h1>Not found</h1> } />
    //       </Routes>
    //     </Layout.Content>
    //   </Skeleton>
    // </Layout >
  )
}