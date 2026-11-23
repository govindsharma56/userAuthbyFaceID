import React from 'react'
import SignUp from './SignUp.jsx'
import Login from './Login.jsx'
import { Route,Routes } from 'react-router-dom'
import Home from './Home.jsx'
const App = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      
    </div>
  )
}

export default App