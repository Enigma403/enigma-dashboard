import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/sign-in", {
                email,
                password
            }, {
                withCredentials: true
            });
            navigate("/dashboard");
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Logowanie</h1>
            {error && <p>{error}</p>}
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div>
                <label>Hasło:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <button type="submit">Zaloguj się</button>
        </form>
    );
};

export default Login;
