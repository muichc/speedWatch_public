import {useState, useEffect, React} from 'react'

import {Menu, Button, Modal, Form} from 'semantic-ui-react'

const { ipcRenderer } = window.require("electron");

export default function Settings() {
  const [currentUser, setCurrentUser] = useState({})
  const [open, setOpen] = useState(false)
  const [upload, setUpload] = useState('')
  const [download, setDownload] = useState('')
  const [interval, setTestInterval] = useState('')

    const getUser = () => {
    ipcRenderer.send('get user', 'ping')
    ipcRenderer.on('async-reply', (event, arg) => {
      setCurrentUser(arg)
    } )
  }

    const updateUser = () => {
    ipcRenderer.send('update user', {upload, download, interval})
    ipcRenderer.on('async-reply', (event, arg) => {
      setCurrentUser(arg)
    })
  }

  function handleSubmit() {
    updateUser(upload, download, interval)
    setOpen(false)
    getUser()
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <Modal
          basic
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size='small'
          trigger={ <Menu.Item id="navbarSettings">
            Settings
            </Menu.Item>}
        >
          <Modal.Header id="settingsModalHeader">Update Settings</Modal.Header>
          <Form>
            <Form.Field>
              <Modal.Header className="inputHeader">ISP Download</Modal.Header>
              <input onChange={(e) => setDownload(e.target.value)} placeholder={currentUser.download}/>
            </Form.Field>
            
            <Form.Field>
              <Modal.Header className="inputHeader">ISP Upload</Modal.Header>
              <input onChange={(e) => setUpload(e.target.value)} placeholder={currentUser.upload} />
            </Form.Field>
            
            <Form.Field>
              <Modal.Header className="inputHeader">Test Interval (minutes)</Modal.Header>
              <input onChange={(e) => setTestInterval(e.target.value)} placeholder={currentUser.interval} />
            </Form.Field>
            <Modal.Actions>
              <Button id="settingsModalButton"type='submit' onClick={() => handleSubmit()}>Submit</Button>
            </Modal.Actions>
          </Form>
        </Modal>
    </>
  )
}
