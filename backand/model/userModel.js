import mongoose from "mongoose";

const DataSchema= new mongoose.Schema({
   email:{type:String,unique:true,required:true,lowercase:true},
   password:{type:String,required:true},
   name:{type:String, required:true},
   profession:{type:String, required:true},
   experience:{type:String, required:true},
   institution:{type:String, required:true},
},{
    timestamps:true,
    versionKey:false
}

)

 const UserModel=mongoose.model('users',DataSchema)
 export default UserModel;