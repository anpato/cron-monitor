export interface tabOptions {
  label: string
  language: string
  instructions: string
}
export const IntegrationOptions = (id: string): tabOptions[] => [
  {
    label: 'Node Js',
    language: 'js',
    instructions: `var https = require('https'); \n\n https.get("https://cronhub.io/ping/${id}");
      `
  },
  {
    label: 'Python',
    language: 'python',
    instructions: `import requests \n\n requests.get("https://cronhub.io/ping/${id}")`
  },
  {
    label: 'Bash',
    language: 'sh',
    instructions: `curl --retry 2 https://cronhub.io/ping/${id}`
  },
  {
    label: 'Crontab',
    language: 'sh',
    instructions: `0 0 * * * your_script.sh && curl -fsS --retry 3 https://cronhub.io/ping/${id} > /dev/null`
  }
]
