import React, {  useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import cl from './Admin.module.css'
import AdminTable from '../../components/AdminTable/AdminTable'
import Loader from '../../components/UI/Loader/Loader'
import AdminsNavbar from '../../components/UI/Navbar/AdminsNavbar'
import $api from '../../http/index'


function Admin() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ isLoading, setIsLoading ] = useState(false)
  const [ items, setItems] = useState([{}])
  const [ tables, setTables ] = useState([])
  const [ listState, setListState] = useState(null)
  const [ isCollectionActive, setIsCollectionActive] = useState(true)
  

  //change date format to dd.mm.yyyy, hh:mm:ss
  const timeFormat = (date) => {
    date.map(d => {
        const newFormat = new Date(d['createdAt'])
        if ( d['createdAt'] ) { 
          return d['createdAt'] = newFormat.toLocaleString() 
        }
        return null
    })
  }

  useEffect( () => {
    const getTables = async () => {
      try {
        setIsLoading(true)
        const tableName = searchParams.get('table')
        if (tableName){
          const { data } = await $api.get(`/admin?table=${tableName}`)
          setTables(data.allTables)
          timeFormat(data.data)
          setItems(data.data) 
          setListState(data.allTables.indexOf(tableName))
        }else {
          const { data } = await $api.get('/admin')
          setTables(data.allTables)
        }
      } catch (error) {
        console.log(error.message)
      }finally{
        setIsLoading(false)
      }
    } 
    getTables()
  }, [ searchParams])


  function onClickHendler(index){
    setSearchParams({'table': tables[index]})
    setListState(index)
  }

  const onClickCollapse = () => {
    setIsCollectionActive(!isCollectionActive)
  }
  

  let table
  if (isLoading){
    table =  <Loader/>
  }else if(listState === null ){
    table = null
  }else{
    table = <AdminTable setData={ setItems } data={items} name={searchParams.get('table')}/>
  }

  return (
    <div>
      <AdminsNavbar tableName={searchParams.get('table')}/>
      <div className={cl.content}>
        <div className={isCollectionActive ? `${cl.collection} ${cl.active}` : `${cl.collection}`}>
          {tables.map((name, index) => {
            return <p   
              key={index} 
              onClick={() => onClickHendler(index)} 
              className={index === listState ? `${cl.collectionItem} ${cl.active}` : cl.collectionItem}
            >{name}</p>
          })}
          <p onClick={onClickCollapse} className={`${cl.collectionItem} ${cl.collapseButton}`}>Collapse</p>
        </div>
        {table}
      </div>
    </div>
  )
}

export default Admin