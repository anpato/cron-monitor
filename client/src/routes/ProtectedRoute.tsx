import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import PrivateWrapper from '../components/PrivateWrapper'

interface iProps extends RouteProps {
  authenticated: boolean
}

const ProtectedRoute: React.FC<iProps> = ({
  authenticated,
  ...rest
}: iProps) => {
  return authenticated ? (
    <PrivateWrapper>
      <Route {...rest} />
    </PrivateWrapper>
  ) : (
    <Redirect to="/" />
  )
}

export default ProtectedRoute
