import React, { useState, ReactText, FormEvent } from 'react'
import {
  Paper,
  TextField,
  TabsContainer,
  Tabs,
  Tab,
  Button,
  FontIcon
} from 'react-md'
import { registerUser, loginUser } from '../services/Authservices'
import { setToken } from '../services/TokenService'
import { RouteChildrenProps } from 'react-router-dom'

interface iState {
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
}

const authState: iState = {
  username: '',
  password: '',
  email: '',
  firstName: '',
  lastName: ''
}

interface Iprops extends RouteChildrenProps {
  authenticate: Function
}

interface AuthResp {
  user: any
  token: string
}

export const Auth = ({ authenticate, history }: Iprops) => {
  const [userCredentials, setUserCreds] = useState(authState)
  const [active, setActiveTab] = useState(0)
  const [error, setError] = useState('')

  const handleChange = (value: ReactText, e: Event, name: string) => {
    setUserCreds({ ...userCredentials, [name]: value })
  }

  const handleSubmit = async (e: FormEvent, type: string) => {
    e.preventDefault()
    switch (type) {
      case 'login':
        loginUser({
          username: userCredentials.username,
          password: userCredentials.password
        })
          .then((res: any): void => {
            setToken(res.token)
            authenticate(true)
            return history.push('/dashboard')
          })
          .catch(() => {
            setError('Invalid Credentials')
            setUserCreds({ ...userCredentials, password: '' })
          })
        break
      case 'register':
        registerUser(userCredentials)
          .then(res => setActiveTab(0))
          .catch(() => setError('There was a problem Registering Your Account'))
        break
    }
  }

  const tabChange = (num: number) => {
    setActiveTab(num)
    setError('')
    setUserCreds(authState)
  }
  console.log(error)
  return (
    <Paper zDepth={1} style={styles.container}>
      <TabsContainer
        colored
        style={styles.tabStyle}
        activeTabIndex={active}
        onTabChange={tabChange}
      >
        <Tabs
          tabId="auth-tab"
          indicatorHeight={4}
          centered
          style={styles.tabStyle}
        >
          <Tab label="Sign In">
            <form
              className="auth-input-wrapper"
              onSubmit={e => handleSubmit(e, 'login')}
            >
              <TextField
                id="username"
                name="username"
                label="Username"
                required
                style={styles.inputStyle}
                value={userCredentials.username}
                onChange={(val, e) => handleChange(val, e, 'username')}
                leftIcon={<FontIcon>person</FontIcon>}
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                required
                value={userCredentials.password}
                onChange={(val, e) => handleChange(val, e, 'password')}
                style={styles.inputStyle}
                leftIcon={<FontIcon>remove_red_eye</FontIcon>}
              />
              <Button raised secondary type="submit">
                Sign In
              </Button>
              {error ? <p className="error">{error}</p> : null}
            </form>
          </Tab>
          <Tab label="Sign Up">
            <form
              className="auth-input-wrapper"
              onSubmit={e => handleSubmit(e, 'register')}
            >
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                required
                value={userCredentials.firstName}
                onChange={(val, e) => handleChange(val, e, 'firstName')}
                style={styles.inputStyle}
              />
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                required
                value={userCredentials.lastName}
                onChange={(val, e) => handleChange(val, e, 'lastName')}
                style={styles.inputStyle}
              />
              <TextField
                id="username"
                name="username"
                label="Username"
                required
                value={userCredentials.username}
                onChange={(val, e) => handleChange(val, e, 'username')}
                style={styles.inputStyle}
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                required
                value={userCredentials.email}
                onChange={(val, e) => handleChange(val, e, 'email')}
                style={styles.inputStyle}
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                required
                onChange={(val, e) => handleChange(val, e, 'password')}
                value={userCredentials.password}
                type="password"
                style={styles.inputStyle}
              />
              <Button raised secondary type="submit">
                Sign In
              </Button>
              {error ? <p className="error">{error}</p> : null}
            </form>
          </Tab>
        </Tabs>
      </TabsContainer>
    </Paper>
  )
}

const styles = {
  container: {
    width: '80%',
    margin: '6em auto'
  },
  tabStyle: {
    width: '100%'
  },
  paperStyle: {},
  inputStyle: {
    width: '70%',
    margin: 'auto'
  }
}
