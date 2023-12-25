// routes/api.js
const express = require('express');
const   router = express.Router();
const Project = require('../models/schema');
const { Users, Block, Service, SendDetail, Chatbot } = require('../models/user');
const crypto = require('crypto');
// routes/api.js
router.post('/projects', async (req, res) => {
    try {
        const { title, description, additionalInfo } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'title are required.' });
        } else if (!description) {
            return res.status(400).json({ error: 'description are required.' });
        }

        const newProject = new Project({
            title,
            description,
            additionalInfo,
        });

        const savedProject = await newProject.save();

        res.json(savedProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update Project
router.put('/projectsss/', async (req, res) => {
    try {
        const { title, description, additionalInfo } = req.body;
        const projectId = req.params.id;

        // Find the project by ID
        const project = await Project.findOne({ title });
        console.log(project);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Update the project fields
        project.title = title;
        project.description = description;
        project.additionalInfo = additionalInfo;

        // Save the modified project
        const updatedProject = await project.save();

        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a new user
router.post('/users', async (req, res,next) => {
    try {
        const accessToken = crypto.randomBytes(30).toString('hex');


        console.log(req.body);
        const newUsers = new Users({
            ...req.body,
            accesstoken: accessToken,
        });
        const savedUsers = await newUsers.save();
        res.json(savedUsers);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Middleware to check if the access token is valid
const validateAccessToken = async (req, res, next) => {
    const { accesstoken } = req.body;
console.log("jhl",req.body , accesstoken);
    try {
        // Check if the access token exists in the Users collection
        const user = await Users.findOne({ accesstoken });

        if (!user) {
            return res.status(401).json({ error: 'Invalid access token' });
        }

        // Attach the user object to the request for further use
        req.user = user;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error validating access token:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all users
router.get('/users', validateAccessToken, async (req, res) => {
    try {
        // Assuming you want to filter users by user_id
        const users = await Users.find({ _id: req.user._id });
        res.json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/blocks', validateAccessToken, async (req, res) => {
    try {
        // Assuming you want to filter blocks by user_id
        const blocks = await Block.find({ user_id: req.user._id });
        res.json(blocks);
    } catch (error) {
        console.error('Error getting blocks:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Apply the middleware to the relevant routes
router.post('/blocks', validateAccessToken, async (req, res) => {
    try {
        const newBlock = new Block({
            ...req.body,
            user_id: req.user._id,
        });
        const savedBlock = await newBlock.save();
        res.json(savedBlock);
    } catch (error) {
        console.error('Error creating block:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Apply the middleware to the relevant routes
router.post('/services', validateAccessToken, async (req, res) => {
    try {
        const newService = new Service({
            ...req.body,
            user_id: req.user._id,
        });
        const savedService = await newService.save();
        res.json(savedService);
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/services', validateAccessToken, async (req, res) => {
    try {
        // Assuming you want to filter services by user_id
        const services = await Service.find({ user_id: req.user._id });
        res.json(services);
    } catch (error) {
        console.error('Error getting services:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Apply the middleware to the relevant routes
router.post('/sendDetails', validateAccessToken, async (req, res) => {
    try {
        const newDetail = new SendDetail({
            ...req.body,
            user_id: req.user._id,
        });
        const savedDetail = await newDetail.save();
        res.json(savedDetail);
    } catch (error) {
        console.error('Error creating detail:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/sendDetails', validateAccessToken, async (req, res) => {
    try {
        // Assuming you want to filter details by user_id
        const details = await SendDetail.find({ user_id: req.user._id });
        res.json(details);
    } catch (error) {
        console.error('Error getting details:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a new chatbot response
router.post('/chatbots', validateAccessToken, async (req, res) => {
    try {
        const newChatbotResponse = new Chatbot({
            ...req.body,
            user_id: req.user._id,
        });
        const savedChatbotResponse = await newChatbotResponse.save();
        res.json(savedChatbotResponse);
    } catch (error) {
        console.error('Error creating chatbot response:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all chatbot responses
router.get('/chatbots', validateAccessToken, async (req, res) => {
    try {
        // Assuming you want to filter chatbot responses by user_id
        const chatbotResponses = await Chatbot.find({ user_id: req.user._id });
        res.json(chatbotResponses);
    } catch (error) {
        console.error('Error getting chatbot responses:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

