import mongoose, { Schema
 } from 'mongoose';
import { TEachFriend, TFriendList } from './friends.interface';


const eachFriendSchema = new Schema<TEachFriend>({
  friendId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  
    required: true
  },

  messageListRef: {
    type: Schema.Types.ObjectId,
    ref: 'MessageList', 
    required: true
  },
  lastMessageAt: {
    type: Date,
    required: true,
    default:Date.now 
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
    required: false,
  }
});

// Friend list schema
const friendListSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  
    required: true
  },
  friendList: {
    type:[eachFriendSchema],
  default: []
}  
});

// Create and export the model
const FriendListModel = mongoose.model<TFriendList>('FriendList', friendListSchema);
export default FriendListModel;