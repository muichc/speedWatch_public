import React from 'react'
import { Button, Container } from 'semantic-ui-react'

export default function TestStartButton(props) {
  const runTest = props.runTest
  const handleClick = () => {
    props.setState(true)
    runTest(props.setState)
  }
  return (
    <Container>
      {props.loading ? <Button
      primary
      loading
      >props.loading</Button> : <Button 
        primary 
        onClick={handleClick}>Run Speed Test</Button>}
    </Container>
  )
}
