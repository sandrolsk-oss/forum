import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import TopicCard from '../components/forum/TopicCard';
import { PlusCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newThread, setNewThread] = useState({ title: '', description: '' });

    const fetchTopics = async () => {
        try {
            const res = await api.get('/topics');
            setTopics(res.data);
        } catch (error) {
            console.error('Failed to fetch topics:', error);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    const handleCreateThread = async (e) => {
        e.preventDefault();
        try {
            await api.post('/topics', newThread);
            setIsModalOpen(false);
            setNewThread({ title: '', description: '' });
            fetchTopics();
        } catch (error) {
            console.error('Failed to secure thread payload', error);
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4">
                <div>
                    <h2 className="text-3xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-matrixGreen to-cyan">
                        MAIN TERMINAL
                    </h2>
                    <p className="font-fira text-sm text-gray-400 mt-2">Latest encrypted transmissions...</p>
                </div>

                {user ? (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="cyber-button text-matrixGreen border-matrixGreen text-sm flex items-center gap-2 shadow-matrixGlow"
                    >
                        <PlusCircle size={18} />
                        NEW THREAD
                    </button>
                ) : (
                    <div className="flex items-center gap-4 text-sm font-fira text-gray-500">
                        Authentication required to post.
                    </div>
                )}
            </div>

            <div className="space-y-4">
                {topics.length > 0 ? topics.map(topic => (
                    <TopicCard key={topic.id} topic={topic} />
                )) : (
                    <div className="text-center p-8 text-gray-500 font-fira border border-gray-800 border-dashed rounded bg-black/50">
                        No threads found in the Matrix. Be the first to start a transmission.
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="glass-panel p-8 w-full max-w-lg border-t-matrixGreen shadow-matrixGlow relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-neonPink transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-2xl font-orbitron text-matrixGreen mb-6">INTIALIZE NEW THREAD</h3>

                        <form onSubmit={handleCreateThread} className="space-y-4">
                            <div>
                                <label className="block text-xs font-fira text-gray-400 mb-1">THREAD TITLE</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white font-jetbrains focus:border-matrixGreen focus:outline-none transition-colors"
                                    value={newThread.title}
                                    onChange={e => setNewThread({ ...newThread, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-fira text-gray-400 mb-1">TRANSMISSION DATA</label>
                                <textarea
                                    required
                                    rows="4"
                                    className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white font-jetbrains focus:border-matrixGreen focus:outline-none transition-colors"
                                    value={newThread.description}
                                    onChange={e => setNewThread({ ...newThread, description: e.target.value })}
                                ></textarea>
                            </div>

                            <button type="submit" className="cyber-button text-black bg-matrixGreen border-matrixGreen w-full shadow-matrixGlow hover:bg-transparent hover:text-matrixGreen transition-all mt-4">
                                BROADCAST PAYLOAD
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Home;
