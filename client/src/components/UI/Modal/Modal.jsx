import React from 'react'
import cl from './Modal.module.css'

function Modal({children, visible, setVisible}) {

    const setVisibleClass = [cl.modal]
    if (visible === true){
        setVisibleClass.push(cl.active)
    }



    return (
        <div className={setVisibleClass.join(' ')} onClick={() => setVisible(false)}>
            <span className={cl.close} onClick={() => setVisible(false)}>&times;</span>
            <div className={cl.content} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal