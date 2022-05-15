import { useState, useEffect } from 'react'

const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(false)
  const [isEmailError, setIsEmailError] = useState(false)
  const [isPhoneNumError, setIsPhoneNumError] = useState(false)


  useEffect(() => {
    for(const validation in validations){
      switch(validation){
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true)
          break
        case 'isEmail':
          // eslint-disable-next-line
          const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
          re.test(String(value).toLowerCase()) ? setIsEmailError(false) : setIsEmailError(true)
          break
        case 'isPhoneNumber':
          // eslint-disable-next-line
          const reNum = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
          reNum.test(String(value).toLowerCase()) ? setIsPhoneNumError(false) : setIsPhoneNumError(true)
          break
        default:
          break
      }
    }
  }, [value, validations])

  return {
    isEmpty,
    isEmailError,
    isPhoneNumError
  }
}

export default useValidation