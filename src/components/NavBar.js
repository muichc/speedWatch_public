import React from 'react'
import {Link} from 'react-router-dom'
import {Menu, Container} from 'semantic-ui-react'
import Settings from './Settings'
export default function NavBar() {
  return (
    <>
      <Menu id="navbar" fixed='top' inverted>
        <Container>
          <Menu.Item id="title" as={Link} to='/' header>
          SpeedWatch
          </Menu.Item>
          <Menu.Item id="navbarData" as={Link} to='/data'>Data</Menu.Item>
          <Settings/>
        </Container>
      </Menu>
    </>
  )
}
