const dotenv = require( "dotenv");
const jwt = require('jsonwebtoken');
dotenv.config();

module.exports = (req,res,next) =>{ 
    if(!req.headers.authorization){
        res.status(401).json({
            'error':'Acesso não autorizado'
        })
    }

    const [,token] = req.headers.authorization.split(' ');
    try {
        jwt.verify(token, process.env.JWT_Secret)
        next();
    } catch (err) {
        res.status(401).json({ error: 'Acesso não autorizado!' })
    }
}
