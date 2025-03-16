import express from 'express';
import { getContests,createContest } from '../controllers/contestController.js';

const router = express.Router()

router.get('/',getContests);
router.post('/',createContest)

export default router