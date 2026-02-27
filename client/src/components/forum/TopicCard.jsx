import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare, Flame, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopicCard = ({ topic }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Rules setup
    // User: Edit their own, created_by them.
    // Mod: Delete any, edit none? Prompt says "Excluir posts de qualquer usuário", "Sinalizar".
    // Admin: Delete any, edit any.

    const isOwner = user?.nickname === topic.author?.nickname;
    const isAdmin = user?.role === 'admin';
    const isMod = user?.role === 'moderator';

    const canEdit = isOwner || isAdmin;
    const canDelete = isAdmin || isMod; // Note: topic deletion wasn't explicitly mentioned in rules for mods, only posts, but assuming topics too for mock.

    const handleClick = () => {
        navigate(`/forum/topic/${topic.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="glass-panel p-5 border-l-4 border-l-cyan hover:border-l-neonPink transition-all duration-300 mb-4 group cursor-pointer hover:shadow-neonHover"
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-orbitron text-white group-hover:text-cyan transition-colors flex items-center gap-2">
                        {topic.title}
                        {topic.isHot && <Flame size={18} className="text-neonPink animate-pulse" />}
                    </h3>
                    <p className="text-gray-400 font-fira text-sm mt-1">{topic.description}</p>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {canEdit && (
                        <button className="p-2 text-cyan hover:bg-cyan/20 rounded transition-colors" title="Edit" onClick={(e) => { e.stopPropagation(); /* Add logic later */ }}>
                            <Edit size={16} />
                        </button>
                    )}
                    {canDelete && (
                        <button className="p-2 text-neonPink hover:bg-neonPink/20 rounded transition-colors" title="Delete" onClick={(e) => { e.stopPropagation(); /* Add logic later */ }}>
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-6 mt-4 text-xs font-jetbrains text-gray-500">
                <div className="flex items-center gap-2 bg-black/50 px-2 py-1 rounded border border-gray-800">
                    <img src={topic.author?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=anon'} alt="Author" className="w-4 h-4 rounded-full" />
                    <span className="text-matrixGreen">{topic.author?.nickname || 'Unknown'}</span>
                </div>
                <span className="flex items-center gap-1">
                    <MessageSquare size={12} /> {topic.posts?.length || 0} REPLIES
                </span>
                <span>LAST UPDATE: {new Date(topic.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default TopicCard;
