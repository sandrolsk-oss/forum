import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import { Edit2, Save, Cpu } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-cyan mb-8">
                    USER_PROFILE // {user.nickname}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass-panel p-8 flex flex-col items-center justify-center border-t-neonPink">
                        <div className="relative group cursor-pointer">
                            <img
                                src={user.avatar}
                                alt="Avatar"
                                className="w-40 h-40 rounded-full border-4 border-neonPink shadow-neonStatic group-hover:shadow-neonHover transition-all duration-300"
                            />
                            <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Edit2 className="text-white" size={24} />
                            </div>
                        </div>
                        <h3 className="mt-4 text-2xl font-fira text-white">{user.nickname}</h3>
                        <p className="text-matrixGreen font-jetbrains mt-2 uppercase tracking-widest px-3 py-1 bg-matrixGreen/10 rounded-full border border-matrixGreen/30">
                            {user.role}
                        </p>
                    </div>

                    <div className="md:col-span-2 glass-panel p-8 border-l-cyan">
                        <h3 className="text-xl font-orbitron text-cyan mb-6 flex items-center gap-2 border-b border-gray-800 pb-2">
                            <Cpu size={24} />
                            NODE_CONFIGURATION
                        </h3>

                        <form className="space-y-6">
                            <div>
                                <label className="block font-fira text-sm text-gray-400 mb-2">NICKNAME</label>
                                <input
                                    type="text"
                                    defaultValue={user.nickname}
                                    className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white font-jetbrains focus:border-cyan focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block font-fira text-sm text-gray-400 mb-2">EMAIL ADDRESS</label>
                                <input
                                    type="email"
                                    defaultValue={user.email}
                                    className="w-full bg-black/50 border border-gray-700 rounded p-3 text-gray-400 font-jetbrains focus:border-cyan focus:outline-none transition-colors"
                                    disabled
                                />
                                <p className="text-xs text-neonPink mt-1">Contact sysadmin to change encrypted email routing.</p>
                            </div>

                            <div>
                                <label className="block font-fira text-sm text-gray-400 mb-2">BIO_DATA</label>
                                <textarea
                                    rows="4"
                                    placeholder="Enter your runner bio..."
                                    className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white font-jetbrains focus:border-cyan focus:outline-none transition-colors resize-none"
                                ></textarea>
                            </div>

                            <div className="flex justify-end">
                                <button type="button" className="cyber-button text-cyan border-cyan px-6 py-2 shadow-cyanGlow flex items-center gap-2">
                                    <Save size={18} />
                                    UPDATE_NODE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
