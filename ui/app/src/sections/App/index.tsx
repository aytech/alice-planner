import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { useQuery } from "@apollo/client"
import { Skeleton } from "antd"
import Layout, { Content, Header } from "antd/lib/layout/layout"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { appSettings } from "../../cache"
import { paths, sessionStorageKeys } from "../../lib/Constants"
import { ChecklistItemStatus, ChecklistsDocument, ChecklistsQuery, useAppQuery, UserDocument, UserQuery } from "../../lib/graphql/graphql"
import { IChecklistTable, IChecklistTableItem, IUser } from "../../lib/Types"
import { Checklist } from "./components/Checklist"
import { NavColumn } from "./components/NavColumn"
import "./styles.css"

export const App = () => {

  useAppQuery()

  const location = useLocation()

  const [ collapsed, setCollapsed ] = useState(false);
  const [ checklists, setChecklists ] = useState<IChecklistTable[]>([])
  const [ editingRecordKey, setEditingRecordKey ] = useState('0');

  const { loading: settingsLoading } = useQuery<UserQuery>(UserDocument, {
    onCompleted: (value: UserQuery) => {
      if (value?.user === null) {
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
        appSettings(value.user)
      }
    }
  })
  const { loading: listsLoading, data: listsData } = useQuery<ChecklistsQuery>(ChecklistsDocument)

  useEffect(() => {
    const list: IChecklistTable[] = []
    listsData?.checklists?.forEach(checklist => {
      if (checklist !== null) {
        const listItems = checklist.items.map((item): IChecklistTableItem => {
          return {
            description: item.description,
            due: item.due,
            id: item.id,
            key: item.id.toString(),
            people: item.people,
            status: item.status,
            tableKey: checklist.id.toString()
          }
        })
        list.push({
          ...checklist,
          items: [ {
            id: '0',
            key: '0',
            people: [ {
              id: '0'
            } ] as Array<IUser>,
            status: ChecklistItemStatus.NotStarted,
            tableKey: checklist.id.toString()
          } ].concat(listItems)
        })
      }
    })
    setChecklists(list)
  }, [ listsData ])

  return (
    <Skeleton
      active
      className="app-skeleton"
      loading={ settingsLoading || listsLoading }>
      <Layout>
        <NavColumn collapsed={ collapsed } />
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
            { checklists.map((list: IChecklistTable) => (
              <Checklist
                editingRecordKey={ editingRecordKey }
                key={ list.id }
                list={ list }
                setEditingRecordKey={ setEditingRecordKey } />
            )) }
          </Content>
        </Layout>
      </Layout>
    </Skeleton>
  )
}