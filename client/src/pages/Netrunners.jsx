import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { Users, Shield, Terminal, Search } from 'lucide-react';
import api from '../services/api';

const Netrunners = () => {
    const { user } = useAuth();
    const [netrunners, setNetrunners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get('/users');
                setNetrunners(res.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to securely access registry.');
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredRunners = netrunners.filter(runner =>
        runner.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        runner.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return <Terminal size={16} className="text-neonPink" title="System Administrator" />;
            case 'moderator': return <Shield size={16} className="text-matrixGreen" title="Network Moderator" />;
            default: return <Users size={16} className="text-cyan" title="Standard Node" />;
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return 'text-neonPink border-neonPink';
            case 'moderator': return 'text-matrixGreen border-matrixGreen';
            default: return 'text-cyan border-cyan';
        }
    };

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-gray-800 pb-4 gap-4">
                <div>
                    <h2 className="text-3xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-cyan flex items-center gap-3">
                        <Users size={32} className="text-cyan" /> NETRUNNER REGISTRY
                    </h2>
                    <p className="font-fira text-sm text-gray-400 mt-2">Active nodes currently connected to the mainframe...</p>
                </div>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search node..."
                        className="w-full bg-black/50 border border-gray-700 rounded p-2 pl-9 text-white font-jetbrains text-sm focus:border-cyan focus:outline-none transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-48 text-cyan font-fira animate-pulse">
                    [ ACCESSING MAINFRAME DIRECTORY... ]
                </div>
            ) : error ? (
                <div className="text-center p-8 border border-neonPink text-neonPink bg-black/50 shadow-neonStatic">
                    [SYS_ERR] {error}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRunners.map(runner => (
                        <div key={runner.id} className="glass-panel p-5 border-t border-gray-800 hover:border-cyan transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img
                                        src={runner.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${runner.nickname}`}
                                        alt={runner.nickname}
                                        className={`w-14 h-14 rounded border-2 ${getRoleColor(runner.role).split(' ')[1]} bg-black/50 p-1`}
                                    />
                                    {runner.banned && (
                                        <div className="absolute inset-0 bg-red-900/60 flex items-center justify-center rounded">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-tighter transform -rotate-45">BANNED</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-orbitron text-lg text-white group-hover:text-cyan transition-colors truncate">
                                        {runner.nickname}
                                    </h3>
                                    <div className={`text-xs font-jetbrains uppercase tracking-wider flex items-center gap-1 mt-1 ${getRoleColor(runner.role).split(' ')[0]}`}>
                                        {getRoleIcon(runner.role)} {runner.role}
                                    </div>
                                    <div className="text-[10px] font-fira text-gray-500 mt-2">
                                        UPLINKED: {new Date(runner.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredRunners.length === 0 && (
                        <div className="col-span-full text-center p-8 text-gray-600 font-fira border border-gray-800 border-dashed rounded">
                            No netrunners match that query in the database.
                        </div>
                    )}
                </div>
            )}
        </Layout>
    );
};

export default Netrunners;
