import HttpError from "../models/Http-error.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    location,
    occupation,
  } = req.body;
  let existUser;
  try {
    existUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("signup failed please try again", 500);
    return next(error);
  }
  if (existUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }
  let hashedPass;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password);
  } catch (err) {
    const error = new HttpError("Could not create user please try again", 500);
    return next(error);
  }
  const createdUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPass,
    picturePath,
    location,
    occupation,
    viewedProfile: Math.floor(Math.random() * 1000),
    impression: Math.floor(Math.random() * 1000),
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("sign up failed please try again", 500);
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWTSECRET,
      { expiresIn: "2h" }
    );
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again later.',500);
    return next(error);
  }

  res.status(201).json({token:token, email: createdUser.email, userId: createdUser.user});
};

export const login = async (req, res, next) => {
  const {email,password} = req.body;
  let existUser;
  try{
    const existUser = await User.findOne({email:email});
  }catch(err){
    const error = new HttpError('login failed, please try again later.',500);
    return next(error);
  }
  if(!existUser){
    const error = new HttpError('Invalid credentials, could not log you in', 403);
    return next(error)
  }
  let ispassMatch;
  try{
    ispassMatch = await bcrypt.compare(password,existUser.password);
  }catch(err){
    const error = new HttpError(
        'Could not log you in, please check your credentials and try again.',
        500
      );
      return next(error);
  }
  if(!ispassMatch){
    const error = new HttpError('Invalid credentials, could not log you in ',403);
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWTSECRET,
      { expiresIn: "2h" }
    );
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again later.',500);
    return next(error);
  }
  delete existUser.password
  res.status(200).json({token,existUser})
  
};
