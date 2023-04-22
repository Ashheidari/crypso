import HttpError from '../models/Http-error.js';
import Post from '../models/Post.js';



/* CREATE */
export const createPost = async (req, res, next)=>{
    const {userId, description, picturePath} = req.body;

     try{
        const newPost = new Post({description,picturePath,user:userId});
        await newPost.save();
        const posts = await Post.find().populate('user');
        res.status(201).json(posts);
        


    }catch (err){
        const error = new HttpError('creating post failed',500);
        return next(error)
    }
}

/* READ */
export const getFeedPosts = async (req, res, next)=>{
    try{
        const posts = await Post.find().populate('user');
        res.status(200).json(posts);

    }catch(err){
        const error = new HttpError('creating post failed',500);
        return next(error)
    }
}

export const getUserPost = async (req, res, next)=>{
    const userId = req.params;
    try{
        const posts = await Post.find({user:userId}).populate('user');
        res.status(200).json(posts);

    }catch (err){
        const error = new HttpError('fetching post failed',500);
        return next(error)
    }

}

/* UPDATE */
export const likePost = async (req, res, next)=>{
    const postId = req.params;
    const userId = req.body
    try{
        const post = await Post.findOne({postId}).populate('user');
        const isLikedbyUser = post.likes.get(userId);
        if(isLikedbyUser){
            post.likes.delete(userId);

        }else{
            post.likes.set(userId, true);
        }
        const updatedPost = Post.findByIdAndUpdate({postId}, {likes:post.likes},{new:true});
        res.status(200).json(updatedPost);
    }catch(err){
        const error = new HttpError('updating post failed');
        return next(error);
    }
}