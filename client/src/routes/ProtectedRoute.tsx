import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

interface iProps extends RouteProps {
  authenticated: boolean
}

const ProtectedRoute: React.FC<iProps> = props =>
  props.authenticated ? <Route {...props} /> : <Redirect to="/" />

export default ProtectedRoute
