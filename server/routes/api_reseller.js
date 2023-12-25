// routes/api_reseller.js

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const {
    ResellerDetail,
    ResellerSubscriptionDetail,
    ResellerPaymentIntegrationDetail,
    ResellerSocialMediaDetail,
    ResellerFAQ,
    ResellerWalletBalance,
    ResellerdefultChatbot,
} = require('../models/reseller');


const resellerController = require('../controller/adminController');
console.log(ResellerDetail);  
// Endpoint for reseller login
router.get('/resellers-login', resellerController.login);


// Middleware to validate access token
const validateAccessToken = async (req, res, next) => {
    const accessToken = req.headers.authorization; // Assuming the access token is passed in the Authorization header
    console.log(accessToken);


    try {
        // Check if the access token exists in the database
        const reseller = await ResellerDetail.findOne({ accesstoken: accessToken });

        if (!reseller) {
            return res.status(401).json({ error: 'Unauthorized - Invalid access token' });
        }

        // Attach the reseller to the request for later use
        req.reseller = reseller;

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error validating access token:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Apply the middleware to routes that require access token validation
router.use(validateAccessToken);

// Create a new reseller
router.post('/resellers', async (req, res) => {
    try {
        const accessToken = crypto.randomBytes(30).toString('hex');
        const refferal_code = crypto.randomBytes(4).toString('hex');
        const newReseller = await ResellerDetail.create({ ...req.body, accesstoken: accessToken, refferal_code: refferal_code });
        res.status(201).json(newReseller);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all resellers
router.get('/resellers', async (req, res) => {
    try {
        const resellers = await ResellerDetail.find();
        res.status(200).json(resellers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific reseller by ID
router.get('/resellers/:id', async (req, res) => {
    try {
        const reseller = await ResellerDetail.findById(req.params.id);
        if (!reseller) {
            return res.status(404).json({ message: 'Reseller not found' });
        }
        res.status(200).json(reseller);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a reseller by ID
router.put('/resellers/:id', async (req, res) => {
    try {
        const updatedReseller = await ResellerDetail.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedReseller) {
            return res.status(404).json({ message: 'Reseller not found' });
        }
        res.status(200).json(updatedReseller);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a reseller by ID
router.delete('/resellers/:id', async (req, res) => {
    try {
        const deletedReseller = await ResellerDetail.findByIdAndDelete(
            req.params.id
        );
        if (!deletedReseller) {
            return res.status(404).json({ message: 'Reseller not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new reseller subscription
router.post('/resellers/:resellerId/subscriptions', async (req, res) => {
    try {
        const subscriptionData = { ...req.body, reseller_id: req.params.resellerId };
        const newSubscription = await ResellerSubscriptionDetail.create(subscriptionData);
        res.status(201).json(newSubscription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Create a new payment integration entry
router.post('/resellers/:resellerId/payment-integrations', async (req, res) => {
    try {
        const paymentIntegrationData = { ...req.body, reseller_id: req.params.resellerId };
        const newPaymentIntegration = await ResellerPaymentIntegrationDetail.create(paymentIntegrationData);
        res.status(201).json(newPaymentIntegration);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Create a new social media entry
router.post('/resellers/:resellerId/social-media', async (req, res) => {
    try {
        const socialMediaData = { ...req.body, reseller_id: req.params.resellerId };
        const newSocialMediaEntry = await ResellerSocialMediaDetail.create(socialMediaData);
        res.status(201).json(newSocialMediaEntry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Create a new FAQ entry
router.post('/resellers/:resellerId/faqs', async (req, res) => {
    try {
        const faqData = { ...req.body, reseller_id: req.params.resellerId };
        const newFAQ = await ResellerFAQ.create(faqData);
        res.status(201).json(newFAQ);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Create a new wallet balance entry
router.post('/resellers/:resellerId/wallet-balances', async (req, res) => {
    try {
        const walletBalanceData = { ...req.body, reseller_id: req.params.resellerId };
        const newWalletBalance = await ResellerWalletBalance.create(walletBalanceData);
        res.status(201).json(newWalletBalance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Create a new default chatbot entry
router.post('/resellers/:resellerId/default-chatbots', async (req, res) => {
    try {
        const chatbotData = { ...req.body, reseller_id: req.params.resellerId };
        const newChatbotEntry = await ResellerdefultChatbot.create(chatbotData);
        res.status(201).json(newChatbotEntry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Fetch all subscriptions for a reseller
router.get('/resellers/:resellerId/subscriptions', async (req, res) => {
    try {
        const subscriptions = await ResellerSubscriptionDetail.find({ reseller_id: req.params.resellerId });
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all payment integrations for a reseller
router.get('/resellers/:resellerId/payment-integrations', async (req, res) => {
    try {
        const paymentIntegrations = await ResellerPaymentIntegrationDetail.find({ reseller_id: req.params.resellerId });
        res.status(200).json(paymentIntegrations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all social media entries for a reseller
router.get('/resellers/:resellerId/social-media', async (req, res) => {
    try {
        const socialMediaEntries = await ResellerSocialMediaDetail.find({ reseller_id: req.params.resellerId });
        res.status(200).json(socialMediaEntries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all FAQs for a reseller
router.get('/resellers/:resellerId/faqs', async (req, res) => {
    try {
        const faqs = await ResellerFAQ.find({ reseller_id: req.params.resellerId });
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch wallet balance for a reseller
router.get('/resellers/:resellerId/wallet-balance', async (req, res) => {
    try {
        const walletBalance = await ResellerWalletBalance.findOne({ reseller_id: req.params.resellerId });
        res.status(200).json(walletBalance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch default chatbots for a reseller
router.get('/resellers/:resellerId/default-chatbots', async (req, res) => {
    try {
        const defaultChatbots = await ResellerdefultChatbot.find({ reseller_id: req.params.resellerId });
        res.status(200).json(defaultChatbots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a reseller subscription by ID
router.put('/resellers/:resellerId/subscriptions/:subscriptionId', async (req, res) => {
    try {
        const updatedSubscription = await ResellerSubscriptionDetail.findByIdAndUpdate(
            req.params.subscriptionId,
            req.body,
            { new: true }
        );
        if (!updatedSubscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json(updatedSubscription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a payment integration entry by ID
router.put('/resellers/:resellerId/payment-integrations/:paymentIntegrationId', async (req, res) => {
    try {
        const updatedPaymentIntegration = await ResellerPaymentIntegrationDetail.findByIdAndUpdate(
            req.params.paymentIntegrationId,
            req.body,
            { new: true }
        );
        if (!updatedPaymentIntegration) {
            return res.status(404).json({ message: 'Payment Integration not found' });
        }
        res.status(200).json(updatedPaymentIntegration);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a social media entry by ID
router.put('/resellers/:resellerId/social-media/:socialMediaId', async (req, res) => {
    try {
        const updatedSocialMediaEntry = await ResellerSocialMediaDetail.findByIdAndUpdate(
            req.params.socialMediaId,
            req.body,
            { new: true }
        );
        if (!updatedSocialMediaEntry) {
            return res.status(404).json({ message: 'Social Media Entry not found' });
        }
        res.status(200).json(updatedSocialMediaEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a FAQ entry by ID
router.put('/resellers/:resellerId/faqs/:faqId', async (req, res) => {
    try {
        const updatedFAQ = await ResellerFAQ.findByIdAndUpdate(
            req.params.faqId,
            req.body,
            { new: true }
        );
        if (!updatedFAQ) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.status(200).json(updatedFAQ);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a wallet balance entry by ID
router.put('/resellers/:resellerId/wallet-balances/:walletBalanceId', async (req, res) => {
    try {
        const updatedWalletBalance = await ResellerWalletBalance.findByIdAndUpdate(
            req.params.walletBalanceId,
            req.body,
            { new: true }
        );
        if (!updatedWalletBalance) {
            return res.status(404).json({ message: 'Wallet Balance not found' });
        }
        res.status(200).json(updatedWalletBalance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a default chatbot entry by ID
router.put('/resellers/:resellerId/default-chatbots/:chatbotId', async (req, res) => {
    try {
        const updatedChatbotEntry = await ResellerdefultChatbot.findByIdAndUpdate(
            req.params.chatbotId,
            req.body,
            { new: true }
        );
        if (!updatedChatbotEntry) {
            return res.status(404).json({ message: 'Chatbot Entry not found' });
        }
        res.status(200).json(updatedChatbotEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Delete a reseller subscription by ID
router.delete('/resellers/:resellerId/subscriptions/:subscriptionId', async (req, res) => {
    try {
        const deletedSubscription = await ResellerSubscriptionDetail.findByIdAndDelete(req.params.subscriptionId);
        if (!deletedSubscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a payment integration entry by ID
router.delete('/resellers/:resellerId/payment-integrations/:paymentIntegrationId', async (req, res) => {
    try {
        const deletedPaymentIntegration = await ResellerPaymentIntegrationDetail.findByIdAndDelete(req.params.paymentIntegrationId);
        if (!deletedPaymentIntegration) {
            return res.status(404).json({ message: 'Payment Integration not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a social media entry by ID
router.delete('/resellers/:resellerId/social-media/:socialMediaId', async (req, res) => {
    try {
        const deletedSocialMediaEntry = await ResellerSocialMediaDetail.findByIdAndDelete(req.params.socialMediaId);
        if (!deletedSocialMediaEntry) {
            return res.status(404).json({ message: 'Social Media Entry not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a FAQ entry by ID
router.delete('/resellers/:resellerId/faqs/:faqId', async (req, res) => {
    try {
        const deletedFAQ = await ResellerFAQ.findByIdAndDelete(req.params.faqId);
        if (!deletedFAQ) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a wallet balance entry by ID
router.delete('/resellers/:resellerId/wallet-balances/:walletBalanceId', async (req, res) => {
    try {
        const deletedWalletBalance = await ResellerWalletBalance.findByIdAndDelete(req.params.walletBalanceId);
        if (!deletedWalletBalance) {
            return res.status(404).json({ message: 'Wallet Balance not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a default chatbot entry by ID
router.delete('/resellers/:resellerId/default-chatbots/:chatbotId', async (req, res) => {
    try {
        const deletedChatbotEntry = await ResellerdefultChatbot.findByIdAndDelete(req.params.chatbotId);
        if (!deletedChatbotEntry) {
            return res.status(404).json({ message: 'Chatbot Entry not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
