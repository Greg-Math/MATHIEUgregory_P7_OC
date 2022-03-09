const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        const userId = decodedToken.userId
        req.auth = userId
        req.isadmin = decodedToken.admin
        if (!userId) { 
            return res.status(401).json({
                error: new Error('Unauthorized request.')
            })
        } 
        else {
            next()
        }
    }
    catch(error) {
        res.status(500).json({
        error: new Error('Invalid request!')
    });
  }
};