import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import Resume from "../models/Resume.js";

const generateToken=(userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})
    return token;


}

//contoller for user registeration
//POST:/api/users/register


export const registerUser = async (req, res) => {
  try {
    const {name,email,password}=req.body;

    //check if fields are present 
    if(!name||!email||!password){
        return res.status(400).json({message:'Missing required fields'})
    }
    //check if user already exists
    const user=await User.findOne({email}) 
    if(user){
        return  res.status(400).json({message:'User already exist'})
    }
    //create new user
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=await User.create({name,email,password:hashedPassword})

    //return success msg
    const token=generateToken(newUser._id)
    newUser.password=undefined;
    return res.status(201).json({message:'USer created successfully',token,user:newUser})
  } catch (error) {
   return res.status(400).json({message:error.message})
  }
};

//contoller for user login
//POST:/api/users/login

export const loginUser = async (req, res) => {
  try {
    const {email,password}=req.body;

    
    //check if user already exists
    const user=await User.findOne({email}) 
    if(!user){
        return  res.status(400).json({message:'invalid email or password'})
    }
    //check if password is correct
    if(!user.comparePassword(password)){
        return res.status(400).json({message:'invalid email or password'})
    }
 
    //return success msg
    const token=generateToken(user._id)
    user.password=undefined;
    return res.status(200).json({message:'login successfully',token,user})
  } catch (error) {
   return res.status(400).json({message:error.message})
  }
};

//controller for geeting user by id
//GET:/api/users/data

export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing from token" });
    }

    // Use findById (not findOne(userId))
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//conroller for getting user resumes
//GET:/api/users/resumes

export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId;

    // find all resumes for this user
    const resumes = await Resume.find({ userId });

    return res.status(200).json({ resumes }); // now it's an array
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
