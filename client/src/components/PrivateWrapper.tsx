import React, { Component } from 'react'
import { RouteProps } from 'react-router-dom'
import { getUserJobs } from '../services/JobServices'
import { ContextProvider } from '../services/Contexts'
interface iState {
  jobs: any | null
  dupJobs: any | null
  isLoading: boolean
}

interface iProps extends RouteProps {
  children: any
}
interface Job {
  id: string
  name: string
  status: string | null
  expression: string
  runTime: string
}

export default class PrivateWrapper extends Component<iProps, iState> {
  state: iState = {
    jobs: null,
    dupJobs: null,
    isLoading: false
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

  searchJobs = (value: any) => {
    const dups = this.state.dupJobs
    const filtered = this.state.jobs.data.filter((val: any) => {
      switch (true) {
        case val.name.toLowerCase().includes(value):
          return val
        case val.expression.toLowerCase().includes(value):
          return val
        case val.status.toLowerCase().includes(value):
          return val
        case val.runTime.toLowerCase().includes(value):
          return val
      }
    })
    this.setState({
      jobs: value.length ? { ...this.state.jobs, data: filtered } : dups
    })
  }

  addJob = ({ id, name, expression, runTime, status }: Job) => {
    const jobData = {
      data: [
        ...this.state.jobs.data,
        {
          id,
          name,
          expression,
          runTime: new Date(runTime).toLocaleString(),
          status: 'Pending'
        }
      ],
      headers: this.state.jobs.headers
    }
    this.setState({
      jobs: jobData
    })
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
