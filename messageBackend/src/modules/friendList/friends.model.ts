import mongoose, { Schema
 } from 'mongoose';
import { TEachFriend, TFriendList } from './friends.interface';
import { optional } from 'zod';

const groupSchema = new Schema({
  groupOwnerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
  groupName: {
      type: String,
      required: true,
  },
  groupMemberList: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    minlength: 3, // Ensure the group has at least 3 members
},
  deletedBy: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      optional:true
  }],
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});


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
  groupDetail:{
    type:groupSchema,
    required:false
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