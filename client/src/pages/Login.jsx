import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import { User, Lock, Mail, Terminal } from 'lucide-react';

const Login = ({ isRegister }) => {
    const { login, registerNode } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ nickname: '', password: '', email: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isRegister) {
                await registerNode(formData.nickname, formData.email, formData.password);
            } else {
                await login(formData.nickname, formData.password);
            }
            navigate('/forum');
        } catch (err) {
            setError(err.response?.data?.error || 'Uplink failed. Check credentials.');
        }
    };

    return (
        <Layout>
            <div className="h-[80vh] flex items-center justify-center">
                <div className="glass-panel p-8 w-full max-w-md border-t-cyan shadow-cyanGlow">
                    <div className="text-center mb-8">
                        <Terminal size={48} className="text-cyan mx-auto mb-4" />
                        <h2 className="text-3xl font-orbitron font-bold text-white tracking-wider">
                            {isRegister ? 'SYSTEM_UPLINK' : 'AUTH_REQUIRED'}
                        </h2>
                        <p className="text-gray-400 font-fira text-sm mt-2">
                            {isRegister ? 'Enter credentials to register node.' : 'Enter credentials to access mainframe.'}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-neonPink/20 border border-neonPink text-white p-3 mb-6 rounded font-fira text-sm flex items-center justify-center shadow-neonStatic">
                            [SYS_ERR] {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan" size={18} />
                            <input
                                type="text"
                                placeholder="NICKNAME"
                                className="w-full bg-black/50 border border-gray-700 rounded p-3 pl-10 text-white font-jetbrains focus:border-cyan focus:outline-none transition-colors"
                                value={formData.nickname}
                                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                                required
                            />
                        </div>

                        {isRegister && (
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan" size={18} />
                                <input
                                    type="email"
                                    placeholder="ENCRYPTED_EMAIL"
                                    className="w-full bg-black/50 border border-gray-700 rounded p-3 pl-10 text-white font-jetbrains focus:border-cyan focus:outline-none transition-colors"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan" size={18} />
                            <input
                                type="password"
                                placeholder="PASSPHRASE"
                                className="w-full bg-black/50 border border-gray-700 rounded p-3 pl-10 text-white font-jetbrains focus:border-cyan focus:outline-none transition-colors"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className="cyber-button text-cyan border-cyan w-full shadow-cyanGlow hover:shadow-neonHover transition-all flex justify-center items-center gap-2">
                            <Terminal size={18} />
                            {isRegister ? 'INITIALIZE' : 'AUTHENTICATE'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm font-fira text-gray-500">
                        {isRegister ? (
                            <p>Existing node? <Link to="/login" className="text-neonPink hover:underline">Connect here</Link></p>
                        ) : (
                            <p>Unregistered node? <Link to="/register" className="text-neonPink hover:underline">Register here</Link></p>
                        )}

                        {/* Quick demo links - Hiding for real auth, but leaving for rapid development  */}
                        <div className="mt-8 pt-4 border-t border-gray-800 flex justify-center gap-4 text-xs">
                            <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        await login('admin', 'Admin#23*');
                                        navigate('/forum');
                                    } catch (e) {
                                        setError('Admin seed missing? Make sure backend is running first.');
                                    }
                                }}
                                className="text-gray-400 hover:text-neonPink transition-colors border border-gray-700 px-2 py-1 rounded"
                                title="Bypass with seed admin"
                            >
                                [QUICK_ADMIN_DEMO]
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
