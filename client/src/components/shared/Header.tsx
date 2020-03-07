import React from 'react'
import { Link } from 'react-router-dom'
import {
  AccessibleFakeButton,
  Toolbar,
  Button,
  Avatar,
  DropdownMenu,
  ListItem
} from 'react-md'
import { clearToken } from '../../services/TokenService'

interface HeaderProps {
  authenticated: boolean
  authenticate: (state: boolean) => void
  history: any
}

const Header: React.FC<HeaderProps> = ({
  authenticated,
  authenticate,
  history
}) => {
  const swapHeader = () => {
    return authenticated ? (
      <DropdownMenu
        id="User-menu"
        menuItems={[
          <ListItem
            key={1}
            secondary="true"
            primaryText="Log Out"
            onClick={() => {
              history.push('/')
              authenticate(false)
              clearToken()
            }}
          />
        ]}
      >
        <AccessibleFakeButton>
          <Avatar random />
        </AccessibleFakeButton>
      </DropdownMenu>
    ) : (
      <Button
        raised
        secondary
        onClick={() => {
          history.push('/sign-in')
        }}
      >
        Sign In
      </Button>
    )
  }
  return (
    <Toolbar
      colored
      title={<Link to="/">Cron Tracker</Link>}
      zDepth={2}
      actions={swapHeader()}
    />
  )
}

export { Header }
