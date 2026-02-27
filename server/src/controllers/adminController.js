import { User, Post, Topic } from '../models/index.js';

export const banUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) return res.status(404).json({ error: 'Node not found.' });
        if (user.role === 'admin') return res.status(403).json({ error: 'Cannot ban an admin node.' });

        user.banned = true;
        await user.save();

        res.json({ message: `Node ${user.nickname} has been permanently banned from the network.` });
    } catch (error) {
        res.status(500).json({ error: 'System action failed.' });
    }
};

export const promoteModerator = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) return res.status(404).json({ error: 'Node not found.' });

        user.role = 'moderator';
        await user.save();

        res.json({ message: `Node ${user.nickname} promoted to MODERATOR class.` });
    } catch (error) {
        res.status(500).json({ error: 'System action failed.' });
    }
};

export const deletePostAny = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);

        if (!post) return res.status(404).json({ error: 'Payload not found.' });

        await post.destroy();

        res.json({ message: 'Payload successfully purged from mainframe.' });
    } catch (error) {
        res.status(500).json({ error: 'Purge failed.' });
    }
};
