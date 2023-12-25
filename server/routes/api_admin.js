// routes/api_admin.js
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const {
    adminDetailModel,
    adminSubscriptionDetailModel,
    adminPaymentIntegrationModel,
    adminSocialMediaModel,
    adminfaqModel,
    adminWalletBalanceModel,
    admindefultChatbotModel,
} = require('../models/admin');
const { validate } = require('../models/schema');

// Admin Detail Routes
router.post('/adminDetail/create', async (req, res) => {
    try {

        // Generate access token
        const accessToken = crypto.randomBytes(30).toString('hex');
        const newAdminDetail = await adminDetailModel.create({
            ...req.body,
            accesstoken: accessToken
        });
        res.json(newAdminDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/adminDetail/all', async (req, res) => {
    try {
        const adminDetails = await adminDetailModel.find();
        res.json(adminDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/adminDetail/:id', async (req, res) => {
    try {
        const adminDetail = await adminDetailModel.findById(req.params.id);
        if (!adminDetail) {
            return res.status(404).json({ message: 'Admin detail not found' });
        }
        res.json(adminDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/adminDetail/:id/update', async (req, res) => {
    try {
        const updatedAdminDetail = await adminDetailModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAdminDetail) {
            return res.status(404).json({ message: 'Admin detail not found' });
        }
        res.json(updatedAdminDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/adminDetail/:id/delete', async (req, res) => {
    try {
        const deletedAdminDetail = await adminDetailModel.findByIdAndDelete(req.params.id);
        if (!deletedAdminDetail) {
            return res.status(404).json({ message: 'Admin detail not found' });
        }
        res.json({ message: 'Admin detail deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Admin Subscription Detail Routes
router.post('/adminSubscriptionDetail/create', async (req, res) => {
    try {
        const newSubscriptionDetail = await adminSubscriptionDetailModel.create(req.body);
        res.json(newSubscriptionDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/adminSubscriptionDetail/all', async (req, res) => {
    try {
        const subscriptionDetails = await adminSubscriptionDetailModel.find();
        res.json(subscriptionDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/adminSubscriptionDetail/:id', async (req, res) => {
    try {
        const subscriptionDetail = await adminSubscriptionDetailModel.findById(req.params.id);
        if (!subscriptionDetail) {
            return res.status(404).json({ message: 'Subscription detail not found' });
        }
        res.json(subscriptionDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/adminSubscriptionDetail/:id/update', async (req, res) => {
    try {
        const updatedSubscriptionDetail = await adminSubscriptionDetailModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedSubscriptionDetail) {
            return res.status(404).json({ message: 'Subscription detail not found' });
        }
        res.json(updatedSubscriptionDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/adminSubscriptionDetail/:id/delete', async (req, res) => {
    try {
        const deletedSubscriptionDetail = await adminSubscriptionDetailModel.findByIdAndDelete(req.params.id);
        if (!deletedSubscriptionDetail) {
            return res.status(404).json({ message: 'Subscription detail not found' });
        }
        res.json({ message: 'Subscription detail deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin Payment Integration Routes
router.post('/adminPaymentIntegration/create', async (req, res) => {
    try {
        const newPaymentIntegration = await adminPaymentIntegrationModel.create(req.body);
        res.json(newPaymentIntegration);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/adminPaymentIntegration/all', async (req, res) => {
    try {
        const paymentIntegrations = await adminPaymentIntegrationModel.find();
        res.json(paymentIntegrations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/adminPaymentIntegration/:id', async (req, res) => {
    try {
        const paymentIntegration = await adminPaymentIntegrationModel.findById(req.params.id);
        if (!paymentIntegration) {
            return res.status(404).json({ message: 'Payment integration not found' });
        }
        res.json(paymentIntegration);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/adminPaymentIntegration/:id/update', async (req, res) => {
    try {
        const updatedPaymentIntegration = await adminPaymentIntegrationModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedPaymentIntegration) {
            return res.status(404).json({ message: 'Payment integration not found' });
        }
        res.json(updatedPaymentIntegration);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/adminPaymentIntegration/:id/delete', async (req, res) => {
    try {
        const deletedPaymentIntegration = await adminPaymentIntegrationModel.findByIdAndDelete(req.params.id);
        if (!deletedPaymentIntegration) {
            return res.status(404).json({ message: 'Payment integration not found' });
        }
        res.json({ message: 'Payment integration deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin Social Media Routes
router.post('/adminSocialMedia/create', async (req, res) => {
    try {
        const newSocialMedia = await adminSocialMediaModel.create(req.body);
        res.json(newSocialMedia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/adminSocialMedia/all', async (req, res) => {
    try {
        const socialMediaList = await adminSocialMediaModel.find();
        res.json(socialMediaList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/adminSocialMedia/:id', async (req, res) => {
    try {
        const socialMedia = await adminSocialMediaModel.findById(req.params.id);
        if (!socialMedia) {
            return res.status(404).json({ message: 'Social media not found' });
        }
        res.json(socialMedia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/adminSocialMedia/:id/update', async (req, res) => {
    try {
        const updatedSocialMedia = await adminSocialMediaModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedSocialMedia) {
            return res.status(404).json({ message: 'Social media not found' });
        }
        res.json(updatedSocialMedia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/adminSocialMedia/:id/delete', async (req, res) => {
    try {
        const deletedSocialMedia = await adminSocialMediaModel.findByIdAndDelete(req.params.id);
        if (!deletedSocialMedia) {
            return res.status(404).json({ message: 'Social media not found' });
        }
        res.json({ message: 'Social media deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin FAQ Routes
router.post('/adminfaq/create', async (req, res) => {
    try {
        const newFAQ = await adminfaqModel.create(req.body);
        res.json(newFAQ);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/adminfaq/all', async (req, res) => {
    try {
        const faqList = await adminfaqModel.find();
        res.json(faqList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/adminfaq/:id', async (req, res) => {
    try {
        const faq = await adminfaqModel.findById(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.json(faq);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/adminfaq/:id/update', async (req, res) => {
    try {
        const updatedFAQ = await adminfaqModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedFAQ) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.json(updatedFAQ);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/adminfaq/:id/delete', async (req, res) => {
    try {
        const deletedFAQ = await adminfaqModel.findByIdAndDelete(req.params.id);
        if (!deletedFAQ) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Admin Wallet Balance Routes
router.post('/adminWalletBalance/create', async (req, res) => {
    try {
        const newWalletBalance = await adminWalletBalanceModel.create(req.body);
        res.json(newWalletBalance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/adminWalletBalance/all', async (req, res) => {
    try {
        const walletBalances = await adminWalletBalanceModel.find();
        res.json(walletBalances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/adminWalletBalance/:id', async (req, res) => {
    try {
        const walletBalance = await adminWalletBalanceModel.findById(req.params.id);
        if (!walletBalance) {
            return res.status(404).json({ message: 'Wallet balance not found' });
        }
        res.json(walletBalance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/adminWalletBalance/:id/update', async (req, res) => {
    try {
        const updatedWalletBalance = await adminWalletBalanceModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedWalletBalance) {
            return res.status(404).json({ message: 'Wallet balance not found' });
        }
        res.json(updatedWalletBalance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/adminWalletBalance/:id/delete', async (req, res) => {
    try {
        const deletedWalletBalance = await adminWalletBalanceModel.findByIdAndDelete(req.params.id);
        if (!deletedWalletBalance) {
            return res.status(404).json({ message: 'Wallet balance not found' });
        }
        res.json({ message: 'Wallet balance deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin Default Chatbot Routes
router.post('/admindefultChatbot/create', async (req, res) => {
    try {
        const newDefaultChatbot = await admindefultChatbotModel.create(req.body);
        res.json(newDefaultChatbot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/admindefultChatbot/all', async (req, res) => {
    try {
        const defaultChatbots = await admindefultChatbotModel.find();
        res.json(defaultChatbots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/admindefultChatbot/:id', async (req, res) => {
    try {
        const defaultChatbot = await admindefultChatbotModel.findById(req.params.id);
        if (!defaultChatbot) {
            return res.status(404).json({ message: 'Default chatbot not found' });
        }
        res.json(defaultChatbot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/admindefultChatbot/:id/update', async (req, res) => {
    try {
        const updatedDefaultChatbot = await admindefultChatbotModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedDefaultChatbot) {
            return res.status(404).json({ message: 'Default chatbot not found' });
        }
        res.json(updatedDefaultChatbot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/admindefultChatbot/:id/delete', async (req, res) => {
    try {
        const deletedDefaultChatbot = await admindefultChatbotModel.findByIdAndDelete(req.params.id);
        if (!deletedDefaultChatbot) {
            return res.status(404).json({ message: 'Default chatbot not found' });
        }
        res.json({ message: 'Default chatbot deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;


// admin validate work ....