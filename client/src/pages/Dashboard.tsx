import React, { Component } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import { getUserJobs } from '../services/JobServices'
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Paper,
  Button,
  FontIcon,
  AccessibleFakeInkedButton,
  AccessibleFakeButton,
  Chip
} from 'react-md'
interface iState {
  jobs: any
  isLoading: boolean
}

interface iProps {
  routerProps: RouteChildrenProps
  authenticated: boolean
}

class Dashboard extends Component<iProps, iState> {
  state: iState = {
    jobs: {},
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

  renderJobStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Chip label={status} className="warn" />
      case 'error':
        return <Chip label={status} className="danger" />
      case 'ok':
        return <Chip label={status} className="ok" />
    }
  }

  displayJobs = () => {
    return (
      <Paper style={styles.container} zDepth={2}>
        <div className="table-btn-wrapper">
          <Button secondary raised>
            Add New Job
          </Button>
        </div>
        <DataTable plain>
          <TableHeader>
            <TableRow>
              {this.state.jobs.headers.map((header: string) => (
                <TableColumn key={header}>{header}</TableColumn>
              ))}
              <TableColumn>Edit</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.state.jobs.data.map((job: any) => {
              // Get Job id here and pass to fake button
              return (
                <TableRow key={job.id}>
                  <TableColumn>{job.id}</TableColumn>
                  <TableColumn>{this.renderJobStatus(job.status)}</TableColumn>
                  <TableColumn>{job.expression}</TableColumn>
                  <TableColumn>{job.runTime}</TableColumn>
                  <TableColumn>{job.name}</TableColumn>
                  <TableColumn>
                    <AccessibleFakeButton secondary="true">
                      <FontIcon>build</FontIcon>
                    </AccessibleFakeButton>
                  </TableColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </DataTable>
      </Paper>
    )
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.jobs).length ? (
          this.displayJobs()
        ) : (
          <h3>Loading</h3>
        )}
      </div>
    )
  }
}

export default Dashboard

const styles = {
  container: {
    margin: ' 6em auto 0 auto',
    width: '70%'
  }
}
