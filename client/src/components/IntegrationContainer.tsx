import React from 'react'
import { TabsContainer, Tab, Tabs } from 'react-md'
import Highlight from 'react-highlight-js'
import { IntegrationOptions, tabOptions } from '../services/IntegrationOptions'

interface iProps {
  id: string
}

const IntegrationContainer = ({ id }: iProps) => (
  <TabsContainer
    themed
    panelStyle={{ height: 'auto', overflow: 'hidden' }}
    slideStyle={{ overflow: 'hidden' }}
  >
    <Tabs tabId="integration" centered>
      {IntegrationOptions(id).map((option: tabOptions) => (
        <Tab key={option.label} label={option.label} className="text-visible">
          <div className="instructions-wrapper">
            <Highlight language={option.language} style={{ padding: '1em' }}>
              {option.instructions}
            </Highlight>
          </div>
        </Tab>
      ))}
    </Tabs>
  </TabsContainer>
)

export default IntegrationContainer
