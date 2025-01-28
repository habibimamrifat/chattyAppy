import mongoose, { Schema, Types } from 'mongoose';
import { TFriendList } from './friends.interface';

const eachFriendSchema = new Schema({
  lastMessageAt: {
    type: Date,
    required: true
  },
  friendId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Assuming 'User' is the model for the friend.
    required: true
  },
  messageListRef: {
    type: Schema.Types.ObjectId,
    ref: 'MessageList',  // Assuming MessageList is the collection that stores messages.
    required: true
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