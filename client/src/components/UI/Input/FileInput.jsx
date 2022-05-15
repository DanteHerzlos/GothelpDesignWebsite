import React, { useState, useEffect } from 'react'
import Modal from '../Modal/Modal'
import cl from './FileInput.module.css'

function FileInput({name, accept, onChange, value}) {
  const [fileName, setFileName] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [modal, setModal] = useState(false)
  


  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])
  
  useEffect(() => {
    if (value) {
      setFileName(value)
      setPreview(window.location.hash + '/' + value)
    }
  }, [])

  const onChangeHandler = (e) => {
    setFileName(e.target.files[0].name)

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    setSelectedFile(e.target.files[0])
  }

  return (
    <div>
    <div className={cl.fileInput}>
      <div className={cl.btn}>
        <label htmlFor='file' className={cl.inputLabel}>File</label>
        <input name={name} accept={accept} onChange={(e) => {onChangeHandler(e); onChange(e)}} id='file' type="file"/>
      </div>
      <div>
        <input placeholder={name} value={fileName} readOnly={true} className={cl.textInput} type="text"/>
      </div>

    </div>
      <div>
        {preview &&  <img onClick={() => setModal(true)} className={cl.preview} src={preview}  alt='preview'/> }
        <Modal visible={modal} setVisible={setModal}>
            <img className={cl.modalImg} src={preview} alt='preview' />
        </Modal>
      </div>
    </div>
  )
}

export default FileInput