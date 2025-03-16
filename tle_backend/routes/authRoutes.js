import express from 'express';
import { verifyJWT } from '../middleware/authenticate.js';
import { getUser, handleBookmark, handleLogin, handleRegister } from "../controllers/userController.js";
const router = express.Router();


router.get('/get-user',verifyJWT,getUser);
router.post('/register',handleRegister);
router.post('/login',handleLogin);
router.post('/bookmark/:id',verifyJWT,handleBookmark);

export default router