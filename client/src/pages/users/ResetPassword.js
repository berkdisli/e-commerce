import { useState } from "react";
import Input from "../Input"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/UserService";

const ResetPassword = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setUser(prevUser => {
            return { ...prevUser, [e.target.name]: e.target.value }
        })
    }

    const inputs = [
        {
            id: 1,
            type: 'text',
            name: 'email',
            required: true,
        },
    ]

    const inputsForm = inputs.map(input => {
        return (
            <Input {...input} onChange={handleChange} value={user[input.name]} key={input.id} />
        )
    })
    const handleReset = async (e) => {
        try {
            e.preventDefault()
            const response = await resetPassword(user)
            toast(response.data.message)
            setUser({
                email: '',
            })

            navigate('/')
        }
        catch (error) {
            toast(error.response.data.message)
        }
    }

    return (
        <div className="main">
            <form>
                {inputsForm}
                <button onClick={handleReset}>Reset</button>
            </form>

        </div>)
}

export default ResetPassword;