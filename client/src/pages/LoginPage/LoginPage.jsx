import React, { useState, useContext} from 'react'
import cl from './LoginPage.module.css'
import { AuthContext } from '../../context'
import { useNavigate } from 'react-router-dom'
import AdminsInput from '../../components/UI/Input/AdminsInput'
import Loader from '../../components/UI/Loader/Loader'
import $api from '../../http'
 
function LoginPage() {
  const { setIsAuth } = useContext(AuthContext)
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const [infoMessage, setInfoMessage] = useState('')
  const infoClass = [cl.infoMessage]
  const [ isLoading, setIsLoading ] = useState(false)

  if (infoMessage){
    infoClass.push(cl._active)
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submitForm = async () => {
    try {
      setIsLoading(true)
      const {data} = await $api.post('/login', {...form})
      localStorage.setItem('token', data.tokens.accessToken)
      setIsAuth(true)
      navigate('/admin')
    } catch (e) {
      setInfoMessage(e.response.data.message)
      console.log(e.response.data.message);
    } finally{
      setIsLoading(false)
    }
  }


  return ( 
    <div className={cl.h100center}>
      <form>
      <div 
        onClick={() => setInfoMessage('')} 
        className={infoClass.join(' ')}
        >{infoMessage}</div>
        <AdminsInput
          onChange={changeHandler} 
          name="email"
          id="email"
          type="email"
        />
        <AdminsInput
          onChange={changeHandler} 
          name="password"
          id="password"
          type="password"
          autoComplete="on"
        />
        <div className={cl.submit}>
          {isLoading ? <div><Loader/></div> : <div className={cl.btn} onClick={submitForm} >Submit</div> }           
        </div>

      </form>
    </div>
  )
}

export default LoginPage