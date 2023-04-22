import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  description: String,
  picturePath: { type: String, require: true },
  comments:{type:Array,default:[]},
  likes:{type: Map, of:Boolean},
  user:{type:mongoose.Types.ObjectId, require:true, ref:'User'},
});

const Post = mongoose.model('Post',postSchema);

export default Post;

