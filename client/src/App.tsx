import React, { useEffect, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Routes from './routes'
import { Header } from './components/shared'
function App(props: RouteComponentProps) {
  const [isAuthenticated, authenticate] = useState(false)
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
