import React, { Component } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import { Paper, TabsContainer, Tabs, Tab, Toolbar } from 'react-md'
import Highlight from 'react-highlight-js'
import { v4 as uuid } from 'uuid'
import { IntegrationOptions, tabOptions } from '../services/IntegrationOptions'

interface iState {
  id: string
  name: string
  expression: string
}

interface iProps extends RouteChildrenProps {
  addJob: Function
}

export default class JobForm extends Component<iProps, iState> {
  state: iState = {
    id: uuid(),
    name: 'My New Cron',
    expression: ''
  }
  render() {
    return (
      <Paper style={{ width: '80%', margin: '2em auto' }}>
        <TabsContainer
          toolbar={<Toolbar themed title={this.state.name} />}
          style={{ padding: '2em' }}
          panelStyle={{ height: 'auto', overflow: 'hidden' }}
          slideStyle={{ overflow: 'hidden' }}
        >
          <Tabs tabId="Overview">
            <Tab label="How to integrate" className="text-visible">
              <TabsContainer
                themed
                panelStyle={{ height: 'auto', overflow: 'hidden' }}
                slideStyle={{ overflow: 'hidden' }}
              >
                <Tabs tabId="integration" centered>
                  {IntegrationOptions(this.state.id).map(
                    (option: tabOptions) => (
                      <Tab label={option.label} className="text-visible">
                        <div className="instructions-wrapper">
                          <Highlight
                            language={option.language}
                            style={{ padding: '1em' }}
                          >
                            {option.instructions}
                          </Highlight>
                        </div>
                      </Tab>
                    )
                  )}
                </Tabs>
              </TabsContainer>
            </Tab>
            <Tab label="How to integrate" className="text-visible"></Tab>
          </Tabs>
        </TabsContainer>
      </Paper>
    )
  }
}
