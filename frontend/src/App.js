import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import axios from "axios";

function App() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/dashboard", {
                    withCredentials: true
                });
                setUsername(response.data);
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={username ? <Navigate to="/dashboard" /> : <Login />} />
                    <Route path="/register" element={username ? <Navigate to="/dashboard" /> : <Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
