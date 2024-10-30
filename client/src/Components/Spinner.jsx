import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Spinner = ({path = 'login'}) => {

    const [count, setCount] = useState(3)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue) => --preValue)
        }, 1000);
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        })
        return () => {
            clearInterval(interval)
        }
    }, [count, navigate, location, path])

    return (
        <>
            <div className="flex flex-row justify-center items-center h-screen">
                <h1 className='text-2xl font-bold pr-[10px]'>Redirection to you in {count} sec.</h1>
                <div className="animate-spin rounded-full w-10 h-10 border-4 border-t-white border-gray-700"></div>
            </div>
        </>
    )
}

export default Spinner
