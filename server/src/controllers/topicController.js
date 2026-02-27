import { Topic, Post, User } from '../models/index.js';

export const getTopics = async (req, res) => {
    try {
        const topics = await Topic.findAll({
            include: [
                { model: User, as: 'author', attributes: ['nickname', 'avatar'] }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json(topics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve topics from mainframe.' });
    }
};

export const createTopic = async (req, res) => {
    try {
        const { title, description } = req.body;
        const topic = await Topic.create({
            title,
            description,
            user_id: req.user.id
        });
        res.status(201).json({ message: 'Topic securely transmitted.', topic });
    } catch (error) {
        res.status(500).json({ error: 'Transmission failed.' });
    }
};

export const getTopicPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const topic = await Topic.findByPk(id, {
            include: [
                { model: Post, as: 'posts', include: [{ model: User, as: 'author', attributes: ['nickname', 'avatar'] }] }
            ]
        });

        if (!topic) return res.status(404).json({ error: 'Node thread not found.' });

        res.json(topic);
    } catch (error) {
        res.status(500).json({ error: 'Failed to decrypt posts.' });
    }
};

// Users can only edit THEIR OWN posts. Moderators can delete ANY post. Admins can edit ANY post.
export const createPost = async (req, res) => {
    try {
        const { id } = req.params; // topic ID
        const { content } = req.body;

        const post = await Post.create({
            content,
            topic_id: id,
            user_id: req.user.id
        });

        res.status(201).json({ message: 'Payload delivered.', post });
    } catch (error) {
        res.status(500).json({ error: 'Failed to deliver payload.' });
    }
};
