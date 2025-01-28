import mongoose, { Schema, Types } from 'mongoose';
import { TMessageList } from './message.interface';

const eachMessageSchema = new Schema({
  senderId: {
    type: Types.ObjectId,
    ref: 'UserModel',  // Assuming you have a User model to reference
    required: true
  },
  receiverId: [{
    type: Types.ObjectId,
    ref: 'UserModel',  // Assuming the receiver is also a User
    required: true
  }],
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

// Message list schema
const messageListSchema = new Schema({
  userId: [{
    type: Types.ObjectId,
    ref: 'UserModel',  // Assuming user refers to a User model
    required: true
  }],
  messageList: [eachMessageSchema]
});

// Create and export the models
const MessageListModel = mongoose.model<TMessageList>('MessageList', messageListSchema);


export default MessageListModel;
