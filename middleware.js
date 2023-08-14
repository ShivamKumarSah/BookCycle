const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    console.log("Token is ", token);

    // if (!token) {
    //     return res.status(401).json({ error: 'Unauthorized: Token missing' });
    // }

    // jwt.verify(token, secretKey, (err, decoded) => {
    //     if (err) {
    //         console.error('Token verification error:', err);
    //         return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    //     }
    //     console.log('Decoded token:', decoded);
    //     req.user = decoded;
    //     next();
    // });

    // jwt.verify(token, secretKey, (err, decoded) => {
    //     if (err) {
    //         console.error('Token verification error:', err);
    //         return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    //     }
    //     console.log('Decoded token:', decoded);

    //     // Make sure decoded.email exists and is correct
    //     if (!decoded.email) {
    //         console.error('Decoded email missing:', decoded);
    //         return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    //     }
    //     req.user = decoded;
    //     next();
    // });
}
module.exports = { verifyToken };
