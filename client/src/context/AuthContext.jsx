import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // On mount, decode token from local storage if exists
    React.useEffect(() => {
        const token = localStorage.getItem('cyber_token');
        const storedUser = localStorage.getItem('cyber_user');
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (nickname, password) => {
        const response = await api.post('/auth/login', { nickname, password });
        const { token, user: userData } = response.data;

        localStorage.setItem('cyber_token', token);
        localStorage.setItem('cyber_user', JSON.stringify(userData));
        setUser(userData);
        return userData;
    };

    const registerNode = async (nickname, email, password) => {
        await api.post('/auth/register', { nickname, email, password });
        // Automatically login after successful registration
        return login(nickname, password);
    };

    const logout = () => {
        localStorage.removeItem('cyber_token');
        localStorage.removeItem('cyber_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, registerNode, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
