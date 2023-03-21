import {useState, useCallback} from 'react'


export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const request = useCallback(async (url, method = "GET", body = null, headers = {'Content-Type': 'application/json'}) => {
        setLoading(true)
        const req = await fetch(url, {method, body, headers})

        try {
            if (!req.ok)
                throw new Error(`Could not fetch ${url} with status ${req.status}`)
            const result = await req.json()
            setLoading(false)
            return result

        } catch(e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, error, clearError, request}
}