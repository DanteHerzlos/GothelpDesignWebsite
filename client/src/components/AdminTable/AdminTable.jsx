import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminsButton from '../UI/Button/AdminsButton'
import Hint from '../UI/Hint/Hint'
import cl from './AdminTable.module.css'
import $api from '../../http/index'


function AdminTable({data, name, setData}) {
  const navigate = useNavigate()
  const [ disableButton, setDisableButton] = useState('false')
  const [ hint, setHint ] = useState('')
  const [position, setPosition]= useState({x: 0, y: 0})

 
  const creatOnClick = () =>{
    navigate(`/admin/${name}`)
  }

  const deleteOnClick = async (e) => {
    if (disableButton === 'true') return
    if (window.confirm(`Are you sure you want to delete note with id: ${e.target.id}?`)){
      try {
        setDisableButton('true')
        const body = data.filter(d => d['id'].toString() === e.target.id)
        await $api.delete(`/admin?table=${name}`, {data: body[0]})
        data = data.filter(d => d['id'].toString() !== e.target.id)
        if (!data[0]) data = [{}]
        setData(data)
      } catch (error) {
        console.log(error.message);
      }finally{
        setDisableButton('false')
      }
    }
  }

  const editOnClick = (e) => {
    navigate(`/admin/${name}?edit=true&id=${e.target.id}`)
  }

  const onClickHint = (e) => {
    setPosition({x: e.pageX, y: e.pageY})
    const imgName = data.filter((d) => d.id.toString() === e.target.id)
    if (imgName.length && imgName[0].imgPath){
      setHint(window.location.hash + '/' + imgName[0].imgPath)
    }
  }

  const onMouseMoveHandler = (e) => {
    if (
      Math.abs(position.x - e.pageX) >= 20 || 
      Math.abs(position.y - e.pageY) >= 20){
        setHint('')
      }
  }

  return (
    <div className={cl.tableWrap} onMouseMove={onMouseMoveHandler}>
      <Hint position={position} imgPath={hint}/>
      <table className={cl.dbTable}>
          <thead>
              <tr>
              { Object.keys(data[0]).map((p, index) => {
                  return <th key={index}>{p}</th>
              })}
                  <th>
                      <AdminsButton onClick={creatOnClick}>Add new +</AdminsButton>
                  </th>
              </tr>
          </thead>
          <tbody  onClick={onClickHint} >
            {(Object.keys(data[0]).length !== 0)  && data.map((d, index) => {
              return(
              <tr   key={index}>
                  { Object.values(d).map((value, i) => {
                      return <td id={d['id']} key={i}>{value}</td>
                  })}
                  <td>
                      <AdminsButton id={d['id']} onClick={editOnClick}>Edit</AdminsButton>
                      <AdminsButton isdisabled={disableButton} id={d['id']} onClick={deleteOnClick} isred={'true'} >Delete</AdminsButton>
                  </td>
              </tr>
            )})}
          </tbody>
      </table>
    </div>
  )
}

export default AdminTable