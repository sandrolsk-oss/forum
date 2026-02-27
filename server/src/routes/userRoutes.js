import { Router } from 'express';
import { User } from '../models/index.js';

const router = Router();

// Public route to see all users (netrunners)
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password', 'email'] },
            order: [['created_at', 'DESC']]
        });
        res.json(users);
    } catch (error) {
        console.error('Netrunner fetch error:', error);
        res.status(500).json({ error: 'Failed to retrieve netrunner registry.' });
    }
});

export default router;
