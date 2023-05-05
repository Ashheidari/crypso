import HttpError from "../models/Http-error.js";
import User from "../models/User.js";



export const getUser = async (req, res, next) =>{
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);
        res.status(200).json(user);
    }catch(err){
        const error = new HttpError('user not found', 404);
        next(error);
    }
}

export const getUserFriends = async (req, res, next)=>{
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);

        const firends = await Promise.all(user.firends.map((friendId)=>{
           return User.findById(friendId);
        }));
        const formateFriends = firends.map(({_id, firstName, lastName, occupation, location, picturePath})=>{_id, firstName, lastName, occupation, location, picturePath} );
        res.status(200).json(formateFriends)
    }
    catch(err){
        const error = new HttpError('user not found', 404);
        return next(error);
    }
}

export const addOrRemoveFriend = async (req, res, next) =>{
    try {
        const {userId,friendId} = req.params;
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);
        if (user.friends.include(friendId)){
            user.friends = user.friends.filter((id)=> id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== userId);
        }else{
            user.friends.push(friendId);
            friend.friends.push(userId);
        }
        await user.save();
        await friend.save();
        const formateFriends = firends.map(({_id, firstName, lastName, occupation, location, picturePath})=>{_id, firstName, lastName, occupation, location, picturePath} );
        res.status(200).json(formateFriends)
    }
    catch(err){
        const error = new HttpError('can not add or remove friend', 404)
        return next(error);
    }
}