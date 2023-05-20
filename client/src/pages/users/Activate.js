import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { activateUser } from '../../services/UserService';
import { toast } from "react-toastify";

const Activate = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const handleActivateUser = async () => {
        try {
            const response = await activateUser({ token })
            const data = response.data;
            toast.success(data.message);
            navigate('/login')
        } catch (err) {
            toast.error(err.message)

        }
    }
    return (
        <div>
            <button onClick={handleActivateUser}> Activate User </button>
        </div>
    )
}

export default Activate