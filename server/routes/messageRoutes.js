import express from 'express';
import { getMessage, sendMessage } from '../controllers/messageController.js';
import protectRoutes from '../middleware/protectRoutes.js';

const router = express.Router();

router.get('/:id', protectRoutes, getMessage);
router.post('/send/:id', protectRoutes, sendMessage);

export default router;
