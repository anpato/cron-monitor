import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

export default (props: RouteComponentProps) => {
  console.log(props)
  return <div className="main">Home</div>
}
