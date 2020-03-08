import React, { Component } from 'react'
import { RouteChildrenProps } from 'react-router-dom'

interface iState {
  name: string
  expression: string
}

interface iProps extends RouteChildrenProps {
  addJob: Function
}

export default class JobForm extends Component<iProps, iState> {
  state: iState = {
    name: '',
    expression: ''
  }
  render() {
    console.log(this.props)
    return <div>JobForm</div>
  }
}
