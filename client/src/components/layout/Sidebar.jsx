import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Terminal, Users, Shield, MessageSquare, Settings } from 'lucide-react';

const Sidebar = () => {
    const { user } = useAuth();

    return (
        <aside className="w-64 glass-panel border-r-cyan mt-[76px] fixed h-[calc(100vh-76px)] flex flex-col pt-6 pb-6 shadow-cyanGlow hidden md:flex z-30">

            <div className="px-6 mb-8">
                <h3 className="font-fira text-matrixGreen text-sm mb-2 border-b border-matrixGreen pb-1 opacity-70">SYSTEM_NAV</h3>
                <nav className="flex flex-col gap-2 mt-4">
                    <Link to="/forum" className="flex items-center gap-3 text-gray-300 hover:text-cyan hover:translate-x-2 transition-all group">
                        <MessageSquare size={18} className="group-hover:drop-shadow-[0_0_8px_rgba(0,243,255,1)]" />
                        <span className="font-jetbrains text-sm">Main Board</span>
                    </Link>
                    <Link to="/netrunners" className="flex items-center gap-3 text-gray-300 hover:text-cyan hover:translate-x-2 transition-all group mt-2">
                        <Users size={18} className="group-hover:drop-shadow-[0_0_8px_rgba(0,243,255,1)]" />
                        <span className="font-jetbrains text-sm">Netrunners</span>
                    </Link>
                    {user && (
                        <Link to="/profile" className="flex items-center gap-3 text-gray-300 hover:text-neonPink hover:translate-x-2 transition-all group mt-2">
                            <Terminal size={18} className="group-hover:drop-shadow-[0_0_8px_rgba(255,0,127,1)]" />
                            <span className="font-jetbrains text-sm">My Terminal</span>
                        </Link>
                    )}
                </nav>
            </div>

            {(user?.role === 'admin' || user?.role === 'moderator') && (
                <div className="px-6 mb-8">
                    <h3 className="font-fira text-neonPink text-sm mb-2 border-b border-neonPink pb-1 opacity-70">SYS_ADMIN</h3>
                    <nav className="flex flex-col gap-2 mt-4">
                        <div className="flex items-center gap-3 text-gray-500 transition-all group cursor-not-allowed" title="Not available in demo">
                            <Shield size={18} />
                            <span className="font-jetbrains text-sm">Moderation</span>
                        </div>
                        {user?.role === 'admin' && (
                            <div className="flex items-center gap-3 text-gray-500 transition-all group mt-2 cursor-not-allowed" title="Not available in demo">
                                <Settings size={18} />
                                <span className="font-jetbrains text-sm">Node Settings</span>
                            </div>
                        )}
                    </nav>
                </div>
            )}

            <div className="px-6 mt-auto">
                <div className="p-4 bg-black/50 border border-gray-800 rounded">
                    <p className="text-xs font-jetbrains text-matrixGreen opacity-80 mb-1">&gt; STATUS: ONLINE</p>
                    <p className="text-xs font-jetbrains text-gray-500">&gt; USERS: 4,096</p>
                    <p className="text-xs font-jetbrains text-gray-500">&gt; LATENCY: 12ms</p>
                </div>
            </div>

        </aside>
    );
};

export default Sidebar;
