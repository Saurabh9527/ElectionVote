
import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (token && expiryDate && new Date(expiryDate) > new Date()) {
      setIsLoggedIn(true);
    }
  }, []); 

  return (
    <div>
      {isLoggedIn ? (<Profile/>) : ( <Home />)}
     
    </div>
  )
}

export default App
