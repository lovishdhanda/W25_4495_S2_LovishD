import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test)
router.post('/update/:id', verifyToken, updateUser) //checking if the person is authenticated or not


export default router;