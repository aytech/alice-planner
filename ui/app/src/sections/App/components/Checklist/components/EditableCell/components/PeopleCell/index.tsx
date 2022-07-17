import { UserAddOutlined } from "@ant-design/icons"
import { useReactiveVar } from "@apollo/client"
import { Avatar, Button, Dropdown, Form, Menu, Tooltip, Typography } from "antd"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { editedRecord, editingRecordKey, peopleData } from "../../../../../../../../cache"
import { IChecklistTableItem, IUser } from "../../../../../../../../lib/Types"
import "./styles.css"

interface Props {
  record: IChecklistTableItem
  revalidate: () => void
}

export const PeopleCell = ({
  record,
  revalidate
}: Props) => {

  const { t } = useTranslation()
  const people = useReactiveVar(peopleData)
  const editingKey = useReactiveVar(editingRecordKey)
  const editingRecord = useReactiveVar(editedRecord)

  const [ dropdownItems, setDropdownItems ] = useState<IUser[]>([])

  const getPersonName = (person: IUser) => {
    if (person.name === undefined && person.surname === undefined) {
      return ''
    }
    return `${ person.name } ${ person.surname }`
  }

  const add = (person: IUser) => {
    setDropdownItems(dropdownItems.filter(item => item.id !== person.id))
    editedRecord({
      ...editingRecord,
      people: editingRecord.people.concat(person),
      tableKey: record.tableKey
    })
    revalidate()
  }

  const remove = (person: IUser) => {
    if (record.id === editingKey) {
      setDropdownItems(dropdownItems.concat(person))
      editedRecord({
        ...editingRecord,
        people: editingRecord.people.filter(item => item.id !== person.id)
      })
    }
  }

  useEffect(() => {
    setDropdownItems(people.filter(person => editingRecord.people.find(recordPerson => recordPerson.id === person.id) === undefined))
  }, [ people, editingRecord ])

  const PeopleElement = () => {
    const source: IUser[] = record.id === editingKey && (record.tableKey === editingRecord.tableKey) ? editingRecord.people : record.people
    return (
      <Avatar.Group>
        { source.length > 0 ? source.map((person: IUser) => (
          <Tooltip
            key={ person.id }
            placement="top"
            title={ getPersonName(person) }>
            <Avatar
              className="people-avatar"
              style={ {
                backgroundColor: '#f56a00'
              } }>
              <Typography.Link
                className="people-link"
                onClick={ () => remove(person) }>
                { person.name?.charAt(0) }
              </Typography.Link>
            </Avatar>
          </Tooltip>
        )) : (
          <Tooltip
            placement="top"
            title={ t("person-add") }>
            <Avatar className="people-avatar">
              <Typography.Link className="people-link">
                <UserAddOutlined />
              </Typography.Link>
            </Avatar>
          </Tooltip>
        ) }
      </Avatar.Group>
    )
  }

  const PeopleDropdown = () => {
    return dropdownItems.length > 0 ? (
      <Dropdown
        className="people-dropdown"
        overlay={ (
          <Menu items={
            dropdownItems.map(item => {
              return {
                key: item.id,
                label: (
                  <Tooltip
                    placement="top"
                    title={ getPersonName(item) }>
                    <Avatar
                      style={ { backgroundColor: '#f56a00' } }>
                      <Typography.Link
                        className="people-link"
                        onClick={ () => add(item) }>
                        { item.name?.charAt(0) }
                      </Typography.Link>
                    </Avatar>
                  </Tooltip>
                )
              }
            })
          } />
        ) }
        placement="bottom">
        <Button className="people-trigger">
          <PeopleElement />
        </Button>
      </Dropdown>
    ) : <PeopleElement />
  }

  return (
    <td className="people-cell">
      { record.id === editingKey ? (
        <Form.Item
          className="people"
          name="people"
          rules={ [
            {
              validator: () =>
                editingRecord.people.length > 0 ? Promise.resolve() : Promise.reject(new Error(t("form.errors.people-empty")))
            }
          ] }
          shouldUpdate>
          <PeopleDropdown />
        </Form.Item>
      ) : (
        <PeopleElement />
      ) }
    </td>
  )
}