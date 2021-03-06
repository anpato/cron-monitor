import React, { useContext } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import { Paper, Button, Toolbar, TextField } from 'react-md'
import JobTable from '../components/JobTable'
import AuthContext from '../services/Contexts'

const Dashboard = ({ history, location, match }: RouteChildrenProps) => {
  const { jobs, searchJobs } = useContext(AuthContext)

  return (
    <Paper className="table-wrapper" zDepth={2}>
      <Toolbar
        title="Current Jobs"
        prominent
        actions={[
          <TextField id="search" placeholder="Search" onChange={searchJobs} />,
          <Button
            secondary
            raised
            onClick={() =>
              history.push({
                pathname: '/jobs/add'
              })
            }
          >
            Add New Job
          </Button>
        ]}
      ></Toolbar>
      {jobs?.data.length ? (
        <JobTable
          jobs={jobs}
          history={history}
          location={location}
          match={match}
        />
      ) : (
        <div className="no-data-wrapper">
          <h3>No Jobs</h3>
        </div>
      )}
    </Paper>
  )
}
export default Dashboard
