import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3001/auth/sign-up",
                {
                    name: name,
                    email: email,
                    password: password,
                },
                { withCredentials: true }
            );

            if (response.status === 201) {
                window.location.href = "/";
            }
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Rejestracja</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Imię:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Hasło:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <button type="submit">Zarejestruj się</button>
            </form>
            <Link to="/">Zaloguj się!</Link>
        </div>
    );
};

export default Signup;
