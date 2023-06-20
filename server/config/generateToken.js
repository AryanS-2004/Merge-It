const jwt = require('jsonwebtoken');

const generateToken  = (id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d"
    });
    return token;
}

module.exports = generateToken;