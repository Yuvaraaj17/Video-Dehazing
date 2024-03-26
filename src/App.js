import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Fleetmanagement from './Component/Fleetmanagement'
import Signdetect from './Component/Signdetect'

const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element = {<Home />} />
            <Route path='/fleet' element = {<Fleetmanagement />} />
            <Route path='/Signdetect' element={<Signdetect />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App