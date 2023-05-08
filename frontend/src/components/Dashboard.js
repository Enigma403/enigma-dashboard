import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Err from "./403";

const Dashboard = () => {
    const navigate = useNavigate();
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
    }, [navigate]);

    const handleLogout = async () => {
        try {
            navigate("/", { replace: true });
            await axios.get("http://localhost:3001/auth/logout", { withCredentials: true });
            console.error('Wylogowano')
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (username === false) {
            navigate("/");
        }
    }, [username]);

    return (
        <div>
            {username ? (
                <>
                    <h2>Witaj, {username}</h2>
                    <p>Enigma Dashboard</p>
                    <button onClick={handleLogout}>Wyloguj się</button>
                </>
            ) : (
                <Err/>
            )}
        </div>
    );
};

export default Dashboard;
