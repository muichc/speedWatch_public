import React from 'react'
import { Route } from 'react-router-dom'

import Home from '../pages/Home'
import Data from '../pages/Data'

const Routes = () => {
  return (
    <>
      <Route exact path='/' component={Home} />
      <Route exact path='/data' component={Data} />
    </>
  )
}

export default Routes