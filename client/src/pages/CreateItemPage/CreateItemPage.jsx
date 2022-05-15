import React, { useEffect, useState } from 'react'
import AdminsButton from '../../components/UI/Button/AdminsButton'
import AdminsInput from '../../components/UI/Input/AdminsInput'
import AdminsNavbar from '../../components/UI/Navbar/AdminsNavbar'
import FileInput from '../../components/UI/Input/FileInput'
import cl from './CreateItemPage.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import $api from '../../http/index'



function CreateItemPage() {
  const [ searchParams ] = useSearchParams();
  const [ form, setForm ] = useState({})
  const [ isLoading, setIsLoading ] = useState(false)
  const [ fields, setFields ] = useState([])
  const [ values, setValues ] = useState({})
  const navigate = useNavigate()
  const location = window.location.pathname + window.location.search

  useEffect(() => {
    setIsLoading(true)
    const getData = async () => {
      try {
        const { data } = await $api.get(location)
        setFields(data.fields)
        if (Object.keys(data.values).length !== 0){
          setValues(data.values)
          setForm(data.values)
        }
      } catch (error) {
        console.log(error.message);
      }finally{
        setIsLoading(false)
      }
    }
    getData()
  }, [location])

  const onChangeHandler = (e) => {
    values[e.target.name] = e.target.value

    if (e.target.name === 'imgPath'){
      setForm({...form, 'image': e.target.files[0]})
    }else{
    setForm({...form, [e.target.name]: e.target.value})
    }
  }

  const onClickSubmit = async () => {
    setIsLoading(true)
    const fd = new FormData()
    for ( let key in form) {
      fd.append(key, form[key])
    }
    try {
      if (searchParams.get('edit')){
        await $api.put(location, fd)
      }else{
        await $api.post(location, fd)
      }
      navigate(-1)
    } catch (error) {
      console.log(error.mesage)
    } finally{
      setIsLoading(false)
    }
  }

  const onClickCancel = () => {
    navigate(-1)
  }

  
  const Inputs = fields.map((name, index) => {
    if (name === 'imgPath'){ 
      return <FileInput value={values[name] || ''} onChange={onChangeHandler} accept="image/*" key={index} name={name}/> 
    } 
    if (name === 'encryptedPassword'){
      return <AdminsInput onChange={onChangeHandler} type='password' key={index} name={name} id={name}/>
    }
    return <AdminsInput value={values[name] || ''} onChange={onChangeHandler} key={index} name={name} id={name}/>
  })


  return (
    <div>
      <AdminsNavbar/>
      <div className={cl.content}>
        {Inputs}
        <AdminsButton onClick={onClickSubmit}>Submit</AdminsButton>
        <AdminsButton onClick={onClickCancel} isred={'true'}>Cancel</AdminsButton>
      </div>
      <div className={cl.loader}>
        {isLoading && <Loader/>}  
      </div>
    </div>
  )
}

export default CreateItemPage