import React from 'react'
import TestStartButton from './TestStartButton'
import TestResults from './TestResults'
import {Header, Container} from 'semantic-ui-react'
export default function TestComponents(props) {
  return (
    <>
      
    <TestStartButton
    runTest={props.runTest}
    loading={props.loading}
    setState={props.setLoading}
    />

<Container id="testExpectations" style={{ marginTop: '2.5em' }}>
        <Header as='h1'>Speed Test</Header>
        <Header as='h3'>Expected Download Speed: {props? props.user.download : ''}Mb/s</Header>
        <Header as='h3'>Expected Upload Speed: {props ? props.user.upload : ''} Mb/s</Header>
        <Header as='h3'>Test Interval: {props ? props.user.interval : ''} minutes</Header>
      </Container>

    <br />
    <br />
    <TestResults
    results={props.currentTest? props.currentTest : {}}
    />
    </>
  )
}
