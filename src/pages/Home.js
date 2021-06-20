import React, {useState, useEffect} from 'react'
import Test from '../components/Test'
const { ipcRenderer } = window.require("electron");

export default function Home() {
  const [currentUser, setCurrentUser] = useState({})
  const getUser = () => {
    ipcRenderer.send('get user', 'ping')
    ipcRenderer.on('async-reply', (event, arg) => {
      setCurrentUser(arg)
    } )
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <>
      <Test
      user={currentUser}
      />
    </>
  )
}
