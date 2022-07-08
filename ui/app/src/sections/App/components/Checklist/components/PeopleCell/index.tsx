import { useReactiveVar } from "@apollo/client"
import { Avatar, Button, Dropdown, Menu, Tooltip, Typography } from "antd"
import { peopleData } from "../../../../../../cache"
import { IChecklistTableItem, IUser } from "../../../../../../lib/Types"

interface Props {
  editing: boolean
  record: IChecklistTableItem
}

export const PeopleCell = ({
  editing,
  record,
  ...restProps
}: Props) => {

  const people = useReactiveVar(peopleData)

  const getPersonName = (person: IUser) => {
    if (person.name === undefined && person.surname === undefined) {
      return ''
    }
    return `${ person.name } ${ person.surname }`
  }

  return (
    <td { ...restProps }>
      { editing ? (
        <Dropdown
          className="people-dropdown"
          overlay={ (
            <Menu items={
              people.map(person => {
                return {
                  key: person.id,
                  label: (
                    <Tooltip
                      placement="top"
                      title={ getPersonName(person) }>
                      <Avatar
                        style={ { backgroundColor: '#f56a00' } }>
                        <Typography.Link
                          onClick={ () => console.log(`adding ${ person.id } to ${ record.id }`) }>
                          { person.name?.charAt(0) }
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
            <Avatar.Group>
              { record.people.map((person: IUser) => (
                <Tooltip
                  key={ person.id }
                  placement="top"
                  title={ getPersonName(person) }>
                  <Avatar
                    style={ { backgroundColor: '#f56a00' } }>
                    <Typography.Link
                      onClick={ () => {
                        console.log(`removing ${ person.id } from ${ record.id }`)
                      } }>
                      { person.name?.charAt(0) }
                    </Typography.Link>
                  </Avatar>
                </Tooltip>
              )) }
            </Avatar.Group>
          </Button>
        </Dropdown>
      ) : (
        <Avatar.Group>
          { record.people.map((person: IUser) => (
            <Tooltip
              key={ person.id }
              placement="top"
              title={ `${ person.name } ${ person.surname }` }>
              <Avatar
                style={ { backgroundColor: '#f56a00' } }>
                { person.name?.charAt(0) }
              </Avatar>
            </Tooltip>
          )) }
        </Avatar.Group>
      ) }
    </td>
  )
}