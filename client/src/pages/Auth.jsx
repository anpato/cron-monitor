import React, { FC, useState, ReactText } from 'react'
import { Paper, TextField, TabsContainer, Tabs, Tab, Button } from 'react-md'

const initialState = {
  username: '',
  password: '',
  email: ''
}

export const Auth = ({ authenticate }) => {
  const [userCredentials, setUserCreds] = useState(initialState)

  const handleChange = (value, e) => {
    setUserCreds({ [e.target.name]: value })
  }

  return (
    <Paper zDepth={1} style={styles.container}>
      <TabsContainer colored style={styles.tabStyle}>
        <Tabs tabId="auth-tab" indicatorHeight={4}>
          <Tab label="Sign In">
            <form className="input-wrapper">
              <TextField
                name="username"
                label="Username"
                style={styles.inputStyle}
                value={userCredentials.username}
                onChange={handleChange}
              />
              <TextField
                name="username"
                label="Password"
                // type="password"
                style={styles.inputStyle}
              />
              <Button raised secondary>
                Sign In
              </Button>
            </form>
          </Tab>
          <Tab label="Sign Up">
            <form className="input-wrapper">
              <TextField
                name="username"
                label="Username"
                style={styles.inputStyle}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                style={styles.inputStyle}
              />
              <TextField
                name="username"
                label="Password"
                // type="password"
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
    height: '100%'
  },
  paperStyle: {},
  inputStyle: {
    width: '70%'
    // margin: 'auto'
  }
}
