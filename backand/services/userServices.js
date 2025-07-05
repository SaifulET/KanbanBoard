import UserModel from "../model/userModel.js";
import bcrypt from 'bcrypt';
import { TokenEncode } from "../utility/tokenUtility.js";
import axios  from 'axios';
import FormData from 'form-data';



const IMGBB_API_KEY = '995de580d72236ef4962c4f1435077f1'; // replace with your key

// Upload function for imgbb using buffer 
const uploadToImgbb = async (buffer) => {
  const form = new FormData();
  form.append('key', IMGBB_API_KEY);
  form.append('image', buffer.toString('base64'));

  const res = await axios.post('https://api.imgbb.com/1/upload', form, {
    headers: form.getHeaders(),
  });

  return res.data.data.url;
};

export const register=async(req,res)=>{
    try{
        let {name,email,password}=req.body;
        let isUser= await UserModel.findOne({email:email});
        if(isUser){
            return res.status(400).json({ message: 'Email already in use' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new UserModel({
                    name,
                    email,
                    password: hashedPassword,
                    });

            await user.save();
            res.status(200).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
    });
    }catch(e){
        console.error(e);
        res.status(500).json({ message: 'Server error' });
    }
}
export const login=async(req,res)=>{
    try{
        const {email,password}= req.body;
        const user= await UserModel.findOne({email:email});
        if(!user)return res.status(500).json({ message: 'Invalid Email' });
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)return res.status(400).json({ message: 'Invalid password' });
        let token=TokenEncode(user.email,user._id.toString())
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
        message: 'Login successful',
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        token:token
    });
    }catch(e){
        res.status(500).json({ message: e.toString() });
    }
}
export const UserInfo=async(req,res)=>{
    const email= req.headers.email;
    const user= await UserModel.findOne({email:email});
    if(user){
        res.status(200).json({
        message: 'Checking successful',
        user: {
            name: user.name,
            email: user.email,
            experience:user.experience,
            institution:user.institution,
            profession:user.profession,
            img:user.img
            
        }

    });

    }
    else{
        res.status(500).json({
        message: 'Error in geting user',
    });
    }

}
export const ProfileUpdate=async(req,res)=>{
    try{
        const id= req.headers.user_id
        const reqBody= req.body;
        
    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadToImgbb(req.file.buffer);
    }
    const jsonForm= {reqBody,img:imageUrl}
        const updatedUser = await UserModel.findByIdAndUpdate({_id:id}, jsonForm, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
            res.json({ message: "Profile Updated successfully", user: updatedUser });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
}