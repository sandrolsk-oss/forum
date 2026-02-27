import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'cyberpunk_neon_secret_2077';

export const register = async (req, res) => {
    try {
        const { nickname, email, password } = req.body;

        const existingUser = await User.findOne({ where: { nickname } });
        if (existingUser) {
            return res.status(400).json({ error: 'Nickname already registered on the network.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            nickname,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Node registered successfully.', user: { id: user.id, nickname: user.nickname, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed.' });
    }
};

export const login = async (req, res) => {
    try {
        const { nickname, password } = req.body;

        const user = await User.findOne({ where: { nickname } });
        if (!user) {
            return res.status(404).json({ error: 'Node not found.' });
        }

        if (user.banned) {
            return res.status(403).json({ error: 'BANNED: Access revoked.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid passphrase.' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

        res.json({
            message: 'Uplink established.',
            token,
            user: {
                id: user.id,
                nickname: user.nickname,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Login failed.' });
    }
};
