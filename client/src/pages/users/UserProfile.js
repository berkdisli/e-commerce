import React from 'react'
import { useLocation } from 'react-router-dom'

const UserProfile = () => {
    const location = useLocation()
    const user = location.state.data;
    const imageUrl = 'http://127.0.0.1:8080/' || 'http://localhost:8080/' + user.image.path;

    return (
        <div>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <h2>{user.phone}</h2>
            <h2>{user.age}</h2>
            <img src={imageUrl} alt="image 1" style={{ width: '300px', height: '300px' }}></img>
        </div>
    )
}

export default UserProfile