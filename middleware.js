const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['x-auth-token'];
    try{
        const { id, name, handle, img } = jwt.verify(token, new Buffer(secret, 'base64'));
        req.user = { id, name, handle, img };
        next();
    } catch(error) {
        res.status(401).send({ error: 'Unable to authenticate - please use a valid token' });
    }
    
};

module.exports = {
    authenticate
};