const mongoose = require('mongoose');

const adminDetailSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  companyName: {
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
    // You might want to add additional validation for country code format
  },
  accesstoken: {
    type: String,
    required: true,
  },
  activeUsers: {
    type: Boolean,
    default: true,
  },
  refferal_code: {
    type: String,
    require:true,
  },


}, { timestamps: true });

const adminDetail = mongoose.model('adminDetail', adminDetailSchema);


const subscriptionDetailSchema = new mongoose.Schema({
  plan: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  key_fetcher: {
    type: String,
    // You can specify additional properties or validations for the key_fetcher field if needed
  },
}, { timestamps: true });

const adminSubscriptionDetail = mongoose.model('adminSubscriptionDetail', subscriptionDetailSchema);

const paymentIntegrationSchema = new mongoose.Schema({
  paymentgatway: {
    type: String,
    required: true,
  },
  key: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }, { timestamps: true });
  
  const adminPaymentIntegrationDetail = mongoose.model('adminPaymentIntegrationDetail', paymentIntegrationSchema);
  
  const socialMediaSchema = new mongoose.Schema({
    social_media_name: {
      type: String,
      required: true,
      unique: true,
    },
    social_media_address: {
        type: String,
        required: true,
        unique: true,
      },
  }, { timestamps: true });
  
  const adminSocialMediaDetail = mongoose.model('adminSocialMediaDetail', socialMediaSchema);
  
  const faqSchema = new mongoose.Schema({
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  }, { timestamps: true });
  
  const adminfaq = mongoose.model('adminfaq', faqSchema);

  const walletBalanceSchema = new mongoose.Schema({
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users', // Assuming there's a Users model referenced by this ObjectId
    },
    amount: {
      type: Number,
      required: true,
    },
    deduct: {
      type: Number,
      default: 0,
    },
    add: {
      type: Number,
      default: 0,
    },
    previous_balance: {
      type: Number,
      default: 0,
    },
  }, { timestamps: true });
  
  const adminWalletBalance = mongoose.model('adminWalletBalance', walletBalanceSchema);
  
  const defultChatbotSchema = new mongoose.Schema({
    trigger: {
      type: String,
      required: true,
      unique: true,
    },
    reply: {
      type: String,
      required: true,
    },
  
  }, { timestamps: true });
  
  const admindefultChatbot = mongoose.model('admindefultChatbot', defultChatbotSchema);
  
module.exports = {adminSubscriptionDetail, adminDetail, adminPaymentIntegrationDetail, adminSocialMediaDetail, adminfaq,adminWalletBalance,admindefultChatbot};

