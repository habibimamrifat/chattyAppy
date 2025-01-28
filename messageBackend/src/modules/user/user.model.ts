import mongoose, { Schema, Types } from 'mongoose';
import { TUser } from './user.interface';

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
  password: {
    type: String,
    required: true
  },
  friendListRef: {
    type: Schema.Types.ObjectId,
    ref: 'FriendList',
    required: true
  },
  role: {
    type: String,
    required: true
  },
  isLoggedIn: {
    type: Boolean,
    default: false
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



// Create and export the model
const UserModel = mongoose.model<TUser>('User', userSchema);
export default UserModel;
