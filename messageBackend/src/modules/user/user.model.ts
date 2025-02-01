import mongoose, { Schema, Types } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from "bcrypt";
import config from '../../config';

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  img: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  friendRequests:{
    type: [String],
    default: []
  },
  friendListRef: {
    type: Schema.Types.ObjectId,
    ref: 'FriendList',
    required: false
  },
  role: {
    type: String,
    required: true
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
    required:false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  loggedOutTime: {
    type: Date,
    default: null
  }
},{
    timestamps: true
});

userSchema.pre("save", async function (next) {
  try {
    const existingUser = await UserModel.findOne({ email: this.email });
    console.log(existingUser);
    if (existingUser) {
      throw new Error("Email already exists");
    }
   else {  next()}
  } catch (error:any) {
    next(error);
  }
});

// **Hash password before saving**
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Hash only if password is modified

  try {
    const saltRounds = parseInt(config.salt_rounds) || 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error:any) {
    next(error);
  }
});

userSchema.post("save", function () {
  this.password = "";
});


// Create and export the model
const UserModel = mongoose.model<TUser>('User', userSchema);
export default UserModel;
