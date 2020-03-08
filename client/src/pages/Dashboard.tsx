import React, { Component } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import { getUserJobs } from '../services/JobServices'
import { Paper, Button, Toolbar } from 'react-md'
import JobTable from '../components/JobTable'
interface iState {
  jobs: any | null
  isLoading: boolean
}

interface iProps {
  routerProps: RouteChildrenProps
  authenticated: boolean
}

class Dashboard extends Component<iProps, iState> {
  state: iState = {
    jobs: null,
    isLoading: false
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    try {
      const jobs = await getUserJobs()
      this.setState({ jobs })
    } catch (error) {}
  }

  displayJobs = () => {
    return (
      <Paper style={styles.container} zDepth={2}>
        <Toolbar
          title="Current Jobs"
          actions={
            <Button secondary raised>
              Add New Job
            </Button>
          }
        ></Toolbar>
        <JobTable jobs={this.state.jobs} />
      </Paper>
    )
  }

  render() {
    return <div>{this.state.jobs ? this.displayJobs() : <h3>Loading</h3>}</div>
  }
}

export default Dashboard

const styles = {
  container: {
    margin: ' 6em auto 0 auto',
    width: '70%'
  }
}
