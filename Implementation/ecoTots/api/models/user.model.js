import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    //if user don't have image, default get them an image
    avatar:{
      type: String,
      default: "https://i.fbcd.co/products/resized/resized-750-500/s211206-kids-avatar-e06-mainpreview-4f1ac0a6471e5aa7987daa8ec493a3282b88618b2ab75bb48f827c0dfaece619.jpg"
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;