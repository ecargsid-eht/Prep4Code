import mongoose from 'mongoose';
import Contest from './ContestModel.js';
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required."]
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    bookmarks: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Contest
        }
    ]
})

const User = mongoose.model('User',userSchema);
export default User;