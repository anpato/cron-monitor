import React, { Component, ReactText } from 'react'
import { RouteChildrenProps, RouteComponentProps } from 'react-router-dom'
import { Paper, TabsContainer, Tabs, Tab, Toolbar, FontIcon } from 'react-md'
import { v4 as uuid } from 'uuid'
import IntegrationContainer from '../components/IntegrationContainer'
import JobForm from '../components/JobForm'
import cronParser from 'cron-parser'
import { isValidCron } from 'cron-validator'
import AuthContext from '../services/Contexts'
import Job from '../types/job'
import { updateJob } from '../services/JobServices'

interface iState {
  id: string
  name: string
  expression: string
  timezone: string
  notification?: string
  isValidExpression: boolean
  wantsNotifications: boolean
  nextRun: string
  update: boolean
  currentTarget: number | null
}
interface RouterState {
  job: Job
  index: number
}

interface iProps extends RouteComponentProps<{}, any, RouterState> {
  addJob: Function
}

export default class JobManagement extends Component<iProps, iState> {
  state: iState = {
    id: uuid() || '',
    name: 'My New Cron',
    expression: '',
    notification: '5 minutes',
    wantsNotifications: false,
    timezone: 'UTC',
    isValidExpression: false,
    nextRun: '',
    update: false,
    currentTarget: null
  }
  static contextType = AuthContext

  componentDidMount() {
    if (this.props.location.state) {
      const jobData = this.props.location.state
      console.log(jobData)
      let job = jobData.job
      const {
        id,
        name,
        expression,
        runTime,
        wantsNotifications,
        notificationTime,
        timezone
      } = job
      this.setState(
        {
          expression: expression,
          id,
          name,
          nextRun: runTime,
          wantsNotifications: wantsNotifications,
          notification: notificationTime,
          timezone,
          update: true,
          currentTarget: jobData.index
        },
        () => this.setState({ isValidExpression: true })
      )
    }
  }

  handleFormChange = (value: ReactText, event: Event, name: string): void => {
    this.setState((state: iState) => ({
      ...state,
      [name]: value
    }))
  }

  handleSubmit = (e: any): void => {
    const {
      id,
      expression,
      name,
      nextRun,
      update,
      notification,
      wantsNotifications,
      timezone
    } = this.state
    e.preventDefault()
    if (update) {
      updateJob(id, {
        id,
        expression,
        name,
        runTime: nextRun,
        notificationTime: notification,
        wantsNotifications,
        timezone
      }).then((res: Job) => {
        this.context.addJob(
          {
            id: res.id,
            expression: res.expression,
            name: res.name,
            runTime: res.runTime,
            status: res.status,
            notificationTime: notification,
            wantsNotifications,
            timezone: res.timezone
          },
          true,
          this.state.currentTarget
        )
        return this.props.history.push('/dashboard')
      })
    } else {
      this.context.addJob({ id, expression, name, runTime: nextRun }, false)
      this.props.history.push('/dashboard')
    }
  }

  handleCheckExpression = () => {
    const regex = /(\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*/
    if (this.state.expression.match(regex)) {
      const isValid: boolean = isValidCron(this.state.expression)
      this.setState(
        {
          isValidExpression: isValid
        },
        () => this.handleExpectedRunTime()
      )
    }
  }

  handleExpectedRunTime = () => {
    const options = {
      currentDate: Date.now(),
      tz: this.state.timezone
    }
    if (this.state.expression.length) {
      const interval = cronParser.parseExpression(
        this.state.expression,
        options
      )
      this.setState({ nextRun: interval.next().toString() })
    }
  }

  render() {
    const {
      notification,
      name,
      timezone,
      expression,
      isValidExpression,
      wantsNotifications
    } = this.state
    return (
      <Paper className="management-wrapper">
        <TabsContainer
          toolbar={<Toolbar themed title={this.state.name} />}
          style={{ padding: '2em' }}
          panelStyle={{ minHeight: '60vh', overflow: 'hidden' }}
          slideStyle={{ overflow: 'hidden', minHeight: '100%' }}
        >
          <Tabs tabId="Overview" defaultTabIndex={1}>
            <Tab
              label="Edit Monitor"
              className="text-visible"
              icon={<FontIcon>edit</FontIcon>}
            >
              <JobForm
                title={name}
                disabled={isValidExpression ? false : true}
                handleChange={this.handleFormChange}
                notification={notification}
                expression={expression}
                timeZone={timezone}
                error={expression.length && !isValidExpression ? true : false}
                wantsNotifications={wantsNotifications}
                checkExpression={this.handleCheckExpression}
                expectedRunTime={this.state.nextRun}
                history={this.props.history}
                onSubmit={this.handleSubmit}
              />
            </Tab>
            <Tab
              label="How to integrate"
              className="text-visible"
              icon={<FontIcon>code</FontIcon>}
            >
              <IntegrationContainer id={this.state.id} />
            </Tab>
          </Tabs>
        </TabsContainer>
      </Paper>
    )
  }
}
