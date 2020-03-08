import React from 'react'
import { Tooltipped, AccessibleFakeButton, Chip } from 'react-md'

interface Iprops {
  status: string
}

const StatusSnack = ({ status }: Iprops) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <Tooltipped
          delay={100}
          label="Pending - Job has not run yet"
          position="right"
          setPosition
        >
          <AccessibleFakeButton>
            <Chip label={status} className="warn" />
          </AccessibleFakeButton>
        </Tooltipped>
      )
    case 'down':
      return (
        <Tooltipped
          delay={100}
          label="Down - Job did not run on time"
          position="right"
          setPosition
        >
          <AccessibleFakeButton>
            <Chip label={status} className="danger" />
          </AccessibleFakeButton>
        </Tooltipped>
      )
    case 'active':
      return (
        <Tooltipped
          delay={100}
          label="Active - Good to go!"
          position="right"
          setPosition
        >
          <AccessibleFakeButton>
            <Chip label={status} className="ok" />
          </AccessibleFakeButton>
        </Tooltipped>
      )
    default:
      return <Chip label={status} />
  }
}

export default StatusSnack
