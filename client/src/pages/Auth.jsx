import React, { useState } from 'react'
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

const initialState = {
  username: '',
  password: '',
  email: ''
}

export const Auth = ({ authenticate, history }) => {
  const [userCredentials, setUserCreds] = useState(initialState)

  const handleChange = (value, e) => {
    setUserCreds({ ...userCredentials, [e.target.name]: value })
  }

  const handleSubmit = async (e, type) => {
    e.preventDefault()
    try {
      switch (type) {
        case 'login':
          loginUser(userCredentials).then(res => {
            setToken(res.token)
            authenticate(true)
            return history.push('/dashboard')
          })
        case 'register':
          registerUser(userCredentials).then(res => history.push('/sign-in'))
      }
    } catch (error) {}
  }

  return (
    <Paper zDepth={1} style={styles.container}>
      <TabsContainer colored style={styles.tabStyle}>
        <Tabs
          tabId="auth-tab"
          indicatorHeight={4}
          centered
          style={styles.tabStyle}
        >
          <Tab label="Sign In">
            <form
              className="input-wrapper"
              onSubmit={e => handleSubmit(e, 'login')}
            >
              <TextField
                name="username"
                label="Username"
                style={styles.inputStyle}
                value={userCredentials.username}
                onChange={handleChange}
                leftIcon={<FontIcon>person</FontIcon>}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                value={userCredentials.password}
                onChange={handleChange}
                style={styles.inputStyle}
                leftIcon={<FontIcon>remove_red_eye</FontIcon>}
              />
              <Button raised secondary type="submit">
                Sign In
              </Button>
            </form>
          </Tab>
          <Tab label="Sign Up">
            <form
              className="input-wrapper"
              onSubmit={e => handleSubmit(e, 'register')}
            >
              <TextField
                name="username"
                label="Username"
                value={userCredentials.username}
                onChange={handleChange}
                style={styles.inputStyle}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={userCredentials.email}
                onChange={handleChange}
                style={styles.inputStyle}
              />
              <TextField
                name="password"
                label="Password"
                onChange={handleChange}
                value={userCredentials.password}
                type="password"
                style={styles.inputStyle}
              />
              <Button raised secondary type="submit">
                Sign In
              </Button>
            </form>
          </Tab>
        </Tabs>
      </TabsContainer>
    </Paper>
  )
}

const styles = {
  container: {
    width: '60%',
    margin: '6em auto'
  },
  tabStyle: {
    width: '100%'
  },
  paperStyle: {},
  inputStyle: {
    width: '70%'
  }
}
