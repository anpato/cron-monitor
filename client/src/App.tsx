import React, { useEffect, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Routes from './routes'
import { Header } from './components/shared'
import { getToken } from './services/TokenService'

function App(props: RouteComponentProps) {
  const [isAuthenticated, authenticate] = useState(false)
  useEffect((): any => {
    const token = getToken()
    if (token) {
      authenticate(true)
      props.history.push('/dashboard')
    }
  }, [isAuthenticated, props.history])
  return (
    <>
      <Header
        authenticated={isAuthenticated}
        authenticate={authenticate}
        history={props.history}
      />
      <Routes authenticate={authenticate} authenticated={isAuthenticated} />
    </>
  )
}

export default withRouter(App)
