import mongoose, { Schema
 } from 'mongoose';
import { TEachFriend, TFriendList } from './friends.interface';


const eachFriendSchema = new Schema<TEachFriend>({
  friendId: {
    type: Schema.Types.Mixed, // Allows both ObjectId and string "GROUP"
    required: true,
    validate: {
      validator: function (value: any) {
        return mongoose.isValidObjectId(value) || value === "GROUP";
      },
      message: "friendId must be a valid ObjectId or the string 'GROUP'",
    },
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
  isGroup:{type: Boolean,default:false},
   
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