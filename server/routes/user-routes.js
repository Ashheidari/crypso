import express from 'express';
import {isAuth} from '../middleware/auth-check.js';
import {getUser, getUserFriends, addOrRemoveFriend } from '../controllers/user.js'



const router = express.Router();

/* READ */
router.get('/:id',isAuth,getUser);
router.get('/friend/:id',isAuth,getUserFriends);


/* UPDATE */
router.patch('/:id/:friendId',isAuth,addOrRemoveFriend);

export default router;