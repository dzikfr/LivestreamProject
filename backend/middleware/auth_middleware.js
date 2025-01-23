const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, "../.env") });

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['Authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401);
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403);
            }

            req.user = decoded
            next();
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while authenticating.',
            error: error.message
        });
    }
}

module.exports = authenticateToken