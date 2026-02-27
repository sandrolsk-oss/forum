import { Router } from 'express';
import { getTopics, createTopic, getTopicPosts, createPost } from '../controllers/topicController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

// Public routes
router.get('/', getTopics);
router.get('/:id', getTopicPosts);

// Protected routes (require valid node uplink)
router.post('/', authenticate, createTopic);
router.post('/:id/posts', authenticate, createPost);

export default router;
