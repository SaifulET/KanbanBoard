import mongoose from "mongoose";

const DataSchema= new mongoose.Schema({
   email:{type:String,unique:true,required:true,lowercase:true},
   password:{type:String,required:true},
   name:{type:String, required:true},
   img:{type:String, },
   profession:{type:String, },
   experience:{type:String, },
   institution:{type:String,},
},{
    timestamps:true,
    versionKey:false
}

)

 const UserModel=mongoose.model('users',DataSchema)
 export default UserModel;