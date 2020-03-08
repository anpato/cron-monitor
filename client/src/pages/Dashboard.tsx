import React, { useContext } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import { Paper, Button, Toolbar, TextField } from 'react-md'
import JobTable from '../components/JobTable'
import AuthContext from '../services/Contexts'

const Dashboard = ({ history }: RouteChildrenProps) => {
  const { jobs, searchJobs } = useContext(AuthContext)

  return (
    <Paper style={styles.container} zDepth={2}>
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
        <JobTable jobs={jobs} />
      ) : (
        <div className="no-data-wrapper">
          <h3>No Jobs</h3>
        </div>
      )}
    </Paper>
  )
}
export default Dashboard
const styles = {
  container: {
    margin: ' 6em auto 0 auto',
    width: '70%'
  }
}
