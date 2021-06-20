import React from 'react'
import {Header,Container} from 'semantic-ui-react'

export default function TestResults(props) {
  return (
    <Container id="testResults">
      <Header as='h1'>Current Test Results</Header>
      <Header as='h3' className="testSpeeds">Download Speed: {props.results ? props.results.download+' Mb/s' : ''}</Header>
      <Header as='h3' className="testSpeeds">Upload Speed: {props.results ? props.results.upload+' Mb/s' : ''}</Header>
    </Container>
  )
}
