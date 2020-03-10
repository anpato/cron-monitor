import React, { MouseEventHandler } from 'react'
import { TextField, SelectField, Divider, Button, FontIcon } from 'react-md'
import timeZones from '../services/Timezones'
import times from '../services/times'
import { RouteChildrenProps } from 'react-router-dom'

interface Iprops {
  title: string
  timeZone: string
  notification: string
  expression: string
  disabled: boolean
  handleChange: any
  checkExpression: any
  error: boolean
  expectedRunTime: string
  history: any
  onSubmit: MouseEventHandler
}

const JobForm = ({
  title,
  disabled,
  handleChange,
  expression,
  timeZone,
  notification,
  checkExpression,
  error,
  expectedRunTime,
  history,
  onSubmit
}: Iprops) => {
  return (
    <div className="form-wrapper">
      <div className="setup">
        <h3>1. Configure Cron Time</h3>
        <Divider />
        <div className="input-wrapper">
          <TextField
            id="expression"
            name="expression"
            label="Expression"
            error={error}
            errorText="Invalid Expression"
            placeholder="* * * * *"
            onBlur={checkExpression}
            defaultValue={expression}
            onChange={(value, e) => handleChange(value, e, 'expression')}
          />
          <SelectField
            id="timezone"
            menuItems={timeZones}
            name="timeZone"
            onChange={(value, e) => handleChange(value, e, 'timeZone')}
            defaultValue={timeZones.find((zone: string) => zone === timeZone)}
          />
        </div>
        <div className="check-wrapper">
          {expectedRunTime ? (
            <p>
              Next expected run is:
              <span className="run-time"> {expectedRunTime}</span>
            </p>
          ) : null}
        </div>
      </div>
      <div className="alerts">
        <h3>2. Notifications Preference</h3>
        <Divider />
        <div className="input-wrapper ">
          <SelectField
            id="warning-times"
            menuItems={times}
            name="notification"
            onChange={(value, e) => handleChange(value, e, 'notification')}
            defaultValue={times.find((time: string) => time === notification)}
          />
          <p>after the job does not run on schedule</p>
        </div>
      </div>
      <div className="label-job">
        <h3>3. Name and Save</h3>
        <Divider />
        <div className="input-wrapper ">
          <TextField
            id="job-title"
            name="name"
            value={title}
            onChange={(value, e) => handleChange(value, e, 'name')}
          />
          <Button
            raised
            secondary
            disabled={disabled}
            onClick={onSubmit}
            iconChildren={
              <FontIcon style={{ color: '#f8f8f8' }}>check</FontIcon>
            }
          >
            Save
          </Button>
          <Button raised onClick={() => history.push('/dashboard')}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default JobForm
