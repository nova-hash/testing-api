const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // You might want to add additional validation for email format
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    // You might want to add additional validation for mobile number format
  },
  companyName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  accesstoken: {
    type: String,
    required: true,
  },
  activeUsers: {
    type: Boolean,
    default: true,
  },
  referenceCode: {
    type: String,
    // You might want to add additional validation for reference code format
  },
  sellerId: {
    type: String,
    // You might want to add additional validation for reseller ID format
  },
}, { timestamps: true });

const Users = mongoose.model('Users', userSchema);

const blockSchema = new mongoose.Schema({
  blocknumber: {
    type: Number,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
}, { timestamps: true });

const Block = mongoose.model('Block', blockSchema);

const serviceSchema = new mongoose.Schema({
  trail: {
    type: Boolean,
    default: true,
  },
  prium: {
    type: Boolean,
    default: false,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

const SendDetail1 = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming you store image URLs
  },
  url: {
    type: String,
  },
  type: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  critera: {
    type: String,
  },
  active: {
    type: String,
    required: true,
    default: false,
  },
}, { timestamps: true });

const SendDetail = mongoose.model('SendDetail', SendDetail1);

const chatbotSchema = new mongoose.Schema({
  trigger: {
    type: String,
    required: true,
    unique: true,
  },
  reply: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
}, { timestamps: true });

const Chatbot = mongoose.model('Chatbot', chatbotSchema);

module.exports = { Users, Block, Service, SendDetail, Chatbot };
