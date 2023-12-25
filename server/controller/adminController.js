
const {
    ResellerDetail,
} = require('../models/reseller');
 // Assuming your model is in a file named ResellerDetail
console.log(ResellerDetail);  
const login = async (req, res) => {
    try {
        const { username, password } = req.query;

        console.log(req.query);

        // Perform your login logic here
        // For simplicity, let's just check if the username and password match a reseller in the database
        const reseller = await ResellerDetail.findOne({ email: username, password: password }).maxTimeMS(30000);

        console.log(reseller);

        if (reseller) {
            // Login successful
            res.json({ message: 'Login successful', reseller });
        } else {
            // Login failed
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    login,
};
