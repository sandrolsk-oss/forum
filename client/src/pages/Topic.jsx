import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Terminal, User, Clock, ArrowLeft } from 'lucide-react';
import api from '../services/api';

const Topic = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [topic, setTopic] = useState(null);
    const [newPost, setNewPost] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchTopicData = async () => {
        try {
            const res = await api.get(`/topics/${id}`);
            setTopic(res.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to decrypt topic data.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopicData();
    }, [id]);

    const handleReply = async (e) => {
        e.preventDefault();
        if (!newPost.trim()) return;

        try {
            await api.post(`/topics/${id}/posts`, { content: newPost });
            setNewPost('');
            fetchTopicData(); // Refresh posts
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to transmit reply.');
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64 text-matrixGreen font-fira animate-pulse">
                    [ DECRYPTING THREAD DATA... ]
                </div>
            </Layout>
        );
    }

    if (error && !topic) {
        return (
            <Layout>
                <div className="text-center p-8 border border-neonPink text-neonPink bg-black/50 shadow-neonStatic">
                    [SYS_ERR] {error}
                    <button onClick={() => navigate('/forum')} className="block mx-auto mt-4 text-cyan hover:underline hover:text-white">
                        return_to_main_board;
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="mb-6">
                <button onClick={() => navigate('/forum')} className="text-gray-400 hover:text-cyan font-fira flex items-center gap-2 text-sm transition-colors">
                    <ArrowLeft size={16} /> RETURN TO TERMINAL
                </button>
            </div>

            {/* Original Topic Post */}
            <div className="glass-panel p-6 border-l-4 border-l-matrixGreen mb-8 shadow-matrixGlow">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-orbitron text-white">{topic.title}</h2>
                    <div className="text-xs font-jetbrains text-gray-500 bg-black/50 px-3 py-1 border border-gray-800 rounded flex items-center gap-2">
                        <Clock size={12} /> {new Date(topic.createdAt).toLocaleString()}
                    </div>
                </div>

                <p className="text-gray-300 font-fira leading-relaxed mb-6 whitespace-pre-wrap">
                    {topic.description}
                </p>

                <div className="flex items-center gap-3 text-xs font-jetbrains mt-4 pt-4 border-t border-gray-800">
                    <img
                        src={topic.author?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=anon'}
                        alt="Author"
                        className="w-8 h-8 rounded-full border border-gray-700"
                    />
                    <div>
                        <span className="text-matrixGreen block">@{topic.author?.nickname || 'Unknown'}</span>
                        <span className="text-gray-500">THREAD CREATOR</span>
                    </div>
                </div>
            </div>

            {/* Replies List */}
            <div className="space-y-4 mb-8">
                <h3 className="font-orbitron text-cyan border-b border-gray-800 pb-2 mb-4 flex items-center gap-2">
                    <MessageSquare size={18} />
                    TRANSMISSION REPLIES ({topic.posts?.length || 0})
                </h3>

                {topic.posts?.length > 0 ? topic.posts.map(post => (
                    <div key={post.id} className="bg-black/40 p-5 border border-gray-800 rounded flex gap-4 hover:border-cyan/50 transition-colors">
                        <div className="flex-shrink-0 text-center">
                            <img
                                src={post.author?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=anon'}
                                alt="Author"
                                className="w-10 h-10 rounded-full border border-gray-700 mb-1 mx-auto"
                            />
                            <span className="text-xs font-jetbrains text-cyan block">@{post.author?.nickname}</span>
                        </div>
                        <div className="flex-grow">
                            <div className="text-xs text-gray-600 font-jetbrains mb-2">
                                LOGGED: {new Date(post.createdAt).toLocaleString()}
                            </div>
                            <p className="font-fira text-gray-300 text-sm whitespace-pre-wrap">
                                {post.content}
                            </p>
                        </div>
                    </div>
                )) : (
                    <div className="text-center p-6 text-gray-600 font-fira border border-gray-800 border-dashed rounded">
                        No replies found. Be the first to append to this node.
                    </div>
                )}
            </div>

            {/* Reply Form */}
            {user ? (
                <div className="glass-panel p-6 border-t-cyan">
                    <h3 className="font-orbitron text-white text-lg mb-4 flex items-center gap-2">
                        <Terminal size={18} className="text-cyan" /> ADD TRANSMISSION
                    </h3>

                    {error && <div className="text-neonPink text-xs mb-2 font-jetbrains">[SYS_ERR] {error}</div>}

                    <form onSubmit={handleReply}>
                        <textarea
                            className="w-full bg-black/60 border border-gray-700 rounded p-4 text-white font-jetbrains focus:border-cyan focus:outline-none transition-colors min-h-[120px]"
                            placeholder="Type your encrypted response here..."
                            value={newPost}
                            onChange={e => setNewPost(e.target.value)}
                            required
                        ></textarea>
                        <div className="flex justify-end mt-4">
                            <button type="submit" className="cyber-button text-black bg-cyan border-cyan shadow-cyanGlow py-2 px-6">
                                SEND RESPONSE
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="p-4 border border-gray-800 bg-black/50 text-center rounded">
                    <p className="font-fira text-sm text-gray-400">
                        Authentication required to transmit replies.
                        <button onClick={() => navigate('/login')} className="text-neonPink ml-2 hover:underline">ACCESS TERMINAL</button>
                    </p>
                </div>
            )}
        </Layout>
    );
};

export default Topic;
