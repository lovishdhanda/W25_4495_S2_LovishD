import express from 'express';
import { signnup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signnup);

export default router;