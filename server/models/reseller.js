const mongoose = require('mongoose');

const resellerDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
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
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
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
  role: {
    type: String,
    require:true,
    default:'reseller',
  },

  // seller_id: {
  //   type:  mongoose.Schema.Types.ObjectId,
  //   ref:'ResellerDetail',
  //   require:true,
  // },


}, { timestamps: true });

const ResellerDetail = mongoose.model('ResellerDetail', resellerDetailSchema);


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
  reseller_id: {
    type:  mongoose.Schema.Types.ObjectId,
    ref:'ResellerDetail',
    require:true,
  },
}, { timestamps: true });

const ResellerSubscriptionDetail = mongoose.model('ResellerSubscriptionDetail', subscriptionDetailSchema);

const paymentIntegrationSchema = new mongoose.Schema({
    key: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    reseller_id: {
      type:  mongoose.Schema.Types.ObjectId,
      ref:'ResellerDetail',
      require:true,
    },
  }, { timestamps: true });
  
  const ResellerPaymentIntegrationDetail = mongoose.model('ResellerPaymentIntegrationDetail', paymentIntegrationSchema);
  

  const socialMediaSchema = new mongoose.Schema({
    social_media_name: {
      type: String,
      required: true,
      unique: true,
    },
    social_media_icon: {
        type: String,
        required: true,
      },
    social_media_address: {
        type: String,
        required: true,
        unique: true,
      },
      reseller_id: {
        type:  mongoose.Schema.Types.ObjectId,
        ref:'ResellerDetail',
      },
  }, { timestamps: true });
  
  const ResellerSocialMediaDetail = mongoose.model('ResellerSocialMediaDetail', socialMediaSchema);
  

  const faqSchema = new mongoose.Schema({
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    reseller_id: {
      type:  mongoose.Schema.Types.ObjectId,
      ref:'ResellerDetail',
      require:true,
    },
  }, { timestamps: true });
  
  const ResellerFAQ = mongoose.model('ResellerFAQ', faqSchema);


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
    reseller_id: {
      type:  mongoose.Schema.Types.ObjectId,
      ref:'ResellerDetail',
      require:true,
    },
  }, { timestamps: true });
  
  const ResellerWalletBalance = mongoose.model('ResellerWalletBalance', walletBalanceSchema);
  

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
     reseller_id: {
    type:  mongoose.Schema.Types.ObjectId,
    ref:'ResellerDetail',
    require:true,
  },
  
  }, { timestamps: true });
  
  const ResellerdefultChatbot = mongoose.model('ResellerdefultChatbot', defultChatbotSchema);
  





module.exports = {ResellerSubscriptionDetail, ResellerDetail, ResellerPaymentIntegrationDetail, ResellerSocialMediaDetail, ResellerFAQ, ResellerWalletBalance, ResellerdefultChatbot};

