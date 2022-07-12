import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { useQuery } from "@apollo/client"
import { Skeleton } from "antd"
import Layout, { Content, Header } from "antd/lib/layout/layout"
import React, { useEffect, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { appUser, peopleData, selectedPage } from "../../cache"
import { paths, sessionStorageKeys } from "../../lib/Constants"
import { ChecklistItemStatus, ChecklistsDocument, ChecklistsQuery, useAppQuery, UserDocument, UserQuery } from "../../lib/graphql/graphql"
import { UrlHelper } from "../../lib/Helpers"
import { IChecklistTable, IChecklistTableItem, IUser } from "../../lib/Types"
import { Archive } from "../Archive"
import { Login } from "../Login"
import { NotFound } from "../NotFound"
import { Checklist } from "./components/Checklist"
import { NavColumn } from "./components/NavColumn"
import "./styles.css"

export const App = () => {

  useAppQuery()

  const location = useLocation()
  const navigate = useNavigate()

  const [ collapsed, setCollapsed ] = useState(false);
  const [ checklists, setChecklists ] = useState<IChecklistTable[]>([])
  const [ editingRecordKey, setEditingRecordKey ] = useState('0');

  const { loading: settingsLoading } = useQuery<UserQuery>(UserDocument, {
    onCompleted: (value: UserQuery) => {
      if (value?.user === null) {
        navigate(`/login?next=${ UrlHelper.getReferrer() }`)
      } else {
        if (location.pathname === paths.login) {
          // User is logged in, redirect
          const page = sessionStorage.getItem(sessionStorageKeys.page)
          if (page === null) {
            navigate(paths.root)
          } else {
            navigate(page)
          }
        }
        appUser(value.user)
      }
    }
  })
  const { loading: listsLoading, data: listsData } = useQuery<ChecklistsQuery>(ChecklistsDocument)

  useEffect(() => {
    const list: IChecklistTable[] = []
    const userItems: IUser[] = []
    listsData?.checklists?.forEach(checklist => {
      if (checklist !== null) {
        const listItems = checklist.items.map((item): IChecklistTableItem => {
          return {
            description: item.description,
            due: item.due,
            id: item.id,
            key: item.id.toString(),
            list: checklist.id,
            people: item.people,
            status: item.status,
            tableKey: checklist.id.toString()
          }
        })
        list.push({
          ...checklist,
          items: [ {
            description: "",
            id: '0',
            key: '0',
            list: checklist.id,
            people: [] as Array<IUser>,
            status: ChecklistItemStatus.NotStarted,
            tableKey: checklist.id.toString()
          } ].concat(listItems)
        })
      }
    })
    listsData?.users?.forEach(user => {
      if (user !== null) {
        userItems.push(user)
      }
    })
    setChecklists(list)
    peopleData(userItems)
  }, [ listsData ])

  useEffect(() => {
    selectedPage("app")
  }, [ location ])

  const AppContent = ({ children }: { children: any }) => (
    <>
      <NavColumn collapsed={ collapsed } />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={ {
            padding: 0,
          } }>
          { React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          }) }
        </Header>
        <Content className="site-layout-background main-content">
          <Skeleton
            active
            className="app-skeleton"
            loading={ settingsLoading || listsLoading }>
            { children }
          </Skeleton>
        </Content>
      </Layout>
    </>
  )

  return (
    <Layout>
      <Routes>
        <Route path={ paths.root } element={ (
          <AppContent>
            { checklists.map((list: IChecklistTable) => (
              <Checklist
                editingRecordKey={ editingRecordKey }
                key={ list.id }
                list={ list }
                setEditingRecordKey={ setEditingRecordKey }
              />
            )) }
          </AppContent>
        ) } />
        <Route path={ paths.archive } element={ (
          <AppContent>
            <Archive />
          </AppContent>
        ) } />
        <Route path={ paths.login } element={ <Login /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </Layout>
  )
}