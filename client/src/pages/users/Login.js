import { useState } from "react";
import Input from "../Input"
import { loginUser } from "../../services/UserService"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { admin, login } from "../../features/userSlice";

function Login() {
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate()

    const handleChange = (event) => {
        setUser(prevUser => {
            return { ...prevUser, [event.target.name]: event.target.value }
        })
    }
    const inputs = [
        {
            id: 1,
            type: 'email',
            name: 'email',
            required: true,
        },
        {
            id: 2,
            type: 'password',
            name: 'password',
            required: true,
        }]

    const inputsForm = inputs.map(input => {
        return (
            <Input {...input} onChange={handleChange} value={user[input.name]} key={input.id} />
        )
    })

    const handleLogin = async (e) => {
        try {
            // console.log(user.email, user.password)
            e.preventDefault()
            const response = await loginUser(user)
            // console.log(response)
            toast(response.data.message)
            setUser({
                email: '',
                password: ''
            })
            dispatch(login())
            localStorage.setItem('userId', response.data.alreadyAnUser._id)
            navigate('/profile')
            if (response.data.alreadyAnUser.is_admin) {
                dispatch(admin())
                navigate('/admin', { state: { id: response.data.alreadyAnUser._id } })
            }

        } catch (error) {
            toast(error)
        }

    }
    return (
        <div className="main" >
            <form>
                {inputsForm}
                <button onClick={handleLogin}>Login</button>
                <a href='/reset-password' className="white">Forget your password?</a>
            </form>
        </div>
    );
}



export default Login;