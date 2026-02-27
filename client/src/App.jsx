import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Topic from './pages/Topic';
import Netrunners from './pages/Netrunners';

function App() {
    return (
        <AuthProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Routes>
                    <Route path="/" element={<Navigate to="/forum" replace />} />
                    <Route path="/forum" element={<Home />} />
                    <Route path="/forum/topic/:id" element={<Topic />} />
                    <Route path="/netrunners" element={<Netrunners />} />
                    <Route path="/login" element={<Login isRegister={false} />} />
                    <Route path="/register" element={<Login isRegister={true} />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
