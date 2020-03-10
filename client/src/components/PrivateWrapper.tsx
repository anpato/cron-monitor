import React, { Component } from 'react'
import { RouteProps } from 'react-router-dom'
import { getUserJobs } from '../services/JobServices'
import { ContextProvider } from '../services/Contexts'
import Job from '../types/job'
interface iState {
  jobs: any | null
  dupJobs: any | null
  isLoading: boolean
  searchval: string
}

interface JobObject {
  name: string
  status: string
  expression: string
  runTime: string
}

interface iProps extends RouteProps {
  children: any
}

export default class PrivateWrapper extends Component<iProps, iState> {
  state: iState = {
    jobs: null,
    dupJobs: null,
    isLoading: false,
    searchval: ''
  }
  dups = null
  componentDidMount() {
    this.getJobs()
    this.dups = this.state.dupJobs
  }

  getJobs = async () => {
    try {
      const jobs = await getUserJobs()
      this.setState({ jobs, dupJobs: jobs })
    } catch (error) {}
  }

  filterData = (value: string) => {
    const dups = this.state.dupJobs

    const filtered = this.state.jobs.data.filter((val: JobObject) => {
      let name: string = val.name.toLowerCase()
      let expression: string = val.expression.toLowerCase()
      let status: string = val.status.toLowerCase()
      let runTime: string = val.runTime.toLowerCase()
      let searchVal: string = value.toLowerCase()
      if (
        name.includes(searchVal) ||
        expression.includes(searchVal) ||
        status.includes(searchVal) ||
        runTime.includes(searchVal)
      ) {
        return val
      }
    })
    this.setState({
      jobs: value ? { ...this.state.jobs, data: filtered } : dups
    })
  }

  searchJobs = (value: any) => {
    this.setState({ searchval: value }, () =>
      this.filterData(this.state.searchval)
    )
  }

  updateJob = (job: Job, index: number): void =>
    this.setState((state: iState) => {
      state.jobs.data[index] = job
      return state
    })

  createJob = ({
    id,
    name,
    expression,
    runTime,
    notificationTime,
    wantsNotifications,
    timezone
  }: Job): void => {
    let jobData = {
      data: [
        ...this.state.jobs.data,
        {
          id,
          name,
          expression,
          runTime: new Date(runTime).toLocaleString(),
          status: 'Pending',
          notificationTime,
          wantsNotifications,
          timezone
        }
      ],
      headers: this.state.jobs.headers
    }
    this.setState({
      jobs: jobData
    })
  }

  addJob = (job: Job, update: boolean, index: number) => {
    if (update) {
      this.updateJob(job, index)
    } else {
      this.createJob(job)
    }
  }

  render() {
    return (
      <ContextProvider
        value={{
          jobs: this.state.jobs,
          searchJobs: this.searchJobs,
          addJob: this.addJob
        }}
      >
        {this.props.children}
      </ContextProvider>
    )
  }
}
