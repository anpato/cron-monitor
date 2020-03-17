import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import FocusComp from '../assets/focus_comp.png'
export default (props: RouteComponentProps) => {
  console.log(props)
  return (
    <div className="main">
      <section className="hero">
        <div className="image-wrapper">
          <img src={FocusComp} />
        </div>
        <div className="hero-text">
          <h1>Cron Doctor</h1>
          <h3>Work in Peace</h3>
        </div>
      </section>
    </div>
  )
}
