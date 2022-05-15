import { useState, useCallback } from "react"

export const API_URL = 'http://localhost:5000/api'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback( async (url, method = 'GET', body = null, headers = {}, multi = false) => {

        url = API_URL + url
        if (body && !multi) {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
        }

        setLoading(true)
        try {
            let response
            if (multi){
                response = await fetch(url, { method, body, cache: "no-cache" })
            }else{
                response = await fetch(url, { method, body, headers, cache: "no-cache" })
            }
            const data = await response.json()

            if(!response.ok) {
                throw new Error(data.message || 'Somthing goes wrong')
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = () => setError(null)

    return { loading, request, error, clearError}
}