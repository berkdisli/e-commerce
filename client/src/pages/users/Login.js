import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/api/users/login",
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = response.data;
            localStorage.setItem("token", data.token);
            toast.success(data.message);
            navigate("/");
        } catch (err) {
            toast.error(err.response.data.error.message)
        }
    }
    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                required
                onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit">Login</button>
        </form>
    );
}

export default Login;