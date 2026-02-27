import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="glass-panel border-b-neonPink shadow-neonStatic flex justify-between items-center py-4 px-8 fixed top-0 w-full z-40 bg-opacity-80 pb-4">
            <div className="flex items-center gap-4">
                <Link to="/forum">
                    <h1 className="text-3xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-cyan animate-flicker cursor-pointer hover:scale-105 transition-transform">
                        CYBER FORUM
                    </h1>
                </Link>
            </div>

            <div className="flex items-center gap-6">
                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="font-fira text-sm text-cyan">{user.nickname}</p>
                            <p className="font-jetbrains text-xs text-matrixGreen uppercase tracking-widest">{user.role}</p>
                        </div>
                        <img
                            src={user.avatar}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border-2 border-neonPink shadow-neonHover cursor-pointer hover:scale-110 transition-transform"
                        />
                        <button
                            onClick={logout}
                            className="px-3 py-1 bg-transparent border border-cyan text-cyan hover:bg-cyan hover:text-black font-jetbrains text-xs transition-colors"
                        >
                            DISCONNECT
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <button onClick={() => navigate('/login')} className="px-4 py-2 text-cyan hover:text-white font-jetbrains text-sm transition-colors">LOGIN</button>
                        <button onClick={() => navigate('/register')} className="cyber-button text-neonPink border-neonPink text-sm py-2 px-4 shadow-neonStatic hover:shadow-neonHover font-orbitron">
                            REGISTER
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
