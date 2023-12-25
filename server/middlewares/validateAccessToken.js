// middleware/validateAccessToken.js
const jwt = require('jsonwebtoken');
const { adminDetailModel } = require('../models/admin'); // Adjust the path based on your project structure

const validateAccessToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try {
    const decodedToken = jwt.verify(accessToken, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
    const admin = await adminDetailModel.findOne({ accesstoken: decodedToken.accessToken });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid access token' });
    }

    // Attach the admin object to the request for further use in the route handlers
    req.admin = admin;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid access token' });
  }
};

module.exports = validateAccessToken;
