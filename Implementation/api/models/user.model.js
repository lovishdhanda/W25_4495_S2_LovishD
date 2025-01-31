import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, //#everybody should have a different username
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false, //2 users can have same password
    },
},  {timestamps: true}
)

const User = mongoose.model('User', userSchema);

export default User;