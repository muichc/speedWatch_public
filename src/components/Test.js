import React, {useState} from 'react'


import TestComponents from './TestComponents'
import {Header, Container} from 'semantic-ui-react'
const { ipcRenderer } = window.require("electron");


export default function Test(props) {
  const [currentTest, setCurrentTest] = useState({upload:'-',download:'-'})
  const [loading, setLoading] = useState(false)
  
  
  const runTest = (stateToggler) => {
    setCurrentTest({})
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      setCurrentTest(JSON.parse(arg)['data']['speeds'])
      setLoading(false)
      ipcRenderer.removeAllListeners()
    } )
    ipcRenderer.send('run speed test', 'ping')
  }

  return (
    <>
    <Container text style={{ marginTop: '5.5em' }}>
      <Header id="titleHeader" as='h1'>Speed Test Settings</Header>
    </Container>
    <TestComponents

    currentTest={currentTest}
    loading={loading}
    user={props.user}
    setLoading={setLoading}
    runTest={runTest}
    />
    </>
  )
}
