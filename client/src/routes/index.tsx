import React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import { Auth } from '../pages/Auth'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from '../pages/Dashboard'
import JobForm from '../components/JobForm'
import PrivateWrapper from '../components/PrivateWrapper'
interface RouteProps {
  authenticated: boolean
  authenticate: (state: boolean) => void
}

export default ({ authenticate, authenticated }: RouteProps) => (
  <main>
    <Switch>
      <Route
        exact
        path="/"
        render={(props: RouteComponentProps) => <Home {...props} />}
      />
      <Route
        exact
        path="/sign-in"
        render={(props: RouteComponentProps) => (
          <Auth {...props} authenticate={authenticate} />
        )}
      />

      <ProtectedRoute
        path="/dashboard"
        authenticated={authenticated}
        component={Dashboard}
      />
      <ProtectedRoute
        path="/jobs/add"
        authenticated={authenticated}
        component={JobForm}
      />
    </Switch>
  </main>
)
