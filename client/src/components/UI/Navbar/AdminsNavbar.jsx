import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context'
import Loader from '../Loader/Loader'
import cl from './AdminsNavbar.module.css'
import $api from '../../../http/index'

function AdminsNavbar({tableName}) {
  const { setIsAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  const [ isLoading, setIsLoading ] = useState(false)


  async function logoutButton(){
    try {
      setIsLoading(true)
      await $api.post('/logout')
      localStorage.removeItem('token')
      setIsAuth(false)
      navigate('/login')
    } catch (error) {
      console.log(error.message);
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <nav className={cl.navbar}>
      <a href='/admin' className={cl.logo}>Admin</a>
      <h3 className={cl.header}>{tableName}</h3>
      {isLoading ? <Loader/> : <a href='/login' className={cl.logout} onClick={logoutButton}>Logout</a>}
    </nav>
  )
}

export default AdminsNavbar