import React from 'react'
import { Navigate } from 'react-router-dom'

//If Page not found, this will navigate user back to /
function NotFound() {
    return (
        <Navigate to="/" />
        
    )
}

export default NotFound