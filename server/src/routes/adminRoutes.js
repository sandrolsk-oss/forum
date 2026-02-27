import { Router } from 'express';
import { banUser, promoteModerator, deletePostAny } from '../controllers/adminController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = Router();

// Only ADMIN class can access
router.post('/users/:id/ban', authenticate, authorize(['admin']), banUser);
router.post('/users/:id/promote', authenticate, authorize(['admin']), promoteModerator);

// MODERATOR and ADMIN can delete posts
router.delete('/posts/:id', authenticate, authorize(['admin', 'moderator']), deletePostAny);

export default router;
