import express from 'express';
import { createListing, deleteListing, getListing, updateListing, getListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing)
router.post('/update/:id', verifyToken, updateListing)
router.get('/get/:id', getListing) //verify token is not used because we need to make it public for the home page as well
router.get('/get', getListings);


export default router;