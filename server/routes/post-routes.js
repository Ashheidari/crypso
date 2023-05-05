import express from 'express';
import fileUpload from '../middleware/file-upload.js';
import {createPost, getFeedPosts, getUserPost, likePost} from '../controllers/post.js';
import {isAuth} from '../middleware/auth-check.js';

const router = express.Router();

/* CREATE */
router.post('/create',isAuth ,fileUpload.single('picture'),createPost);

/* READ */
router.get('/',isAuth ,getFeedPosts);

router.get('/:userId/posts',isAuth,getUserPost);

/* UPDATE */
router.patch('/:postId/like',isAuth, likePost);






export default router;