import React, { useEffect, useState } from 'react'
import './styles/App.css'
import { AuthContext } from './context'
import AppRouter from './components/UI/AppRouter'
import axios from 'axios'
import Loader from './components/UI/Loader/Loader'


function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const checkAuth = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('/api/refresh', {withCredentials: true})
      localStorage.setItem('token', response.data.tokens.accessToken)
      setIsAuth(true)
    } catch (e) {
      console.log(e.response.data.message);
    }finally{
      setIsLoading(false)
    }
  } 

  useEffect( () => {
    if (localStorage.getItem('token')){
      checkAuth()
    }
  }, [])

  if(isLoading){
    return (
      <div className='loader'>
        <Loader/>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{isAuth, setIsAuth}}>
      <AppRouter/>
    </AuthContext.Provider>
  );
}

export default App;