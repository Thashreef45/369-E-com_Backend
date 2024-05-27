import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import env from '../../../infrastructure/config/environment';


// verify token
const middleware = (req: Request, res: Response, next: NextFunction) => {

    // adminToken || token name?
    let token = req.headers['adminToken'] as string
    
    if (!token) {
        res.status(401).json({ message: 'No token provided' }); // Unauthorized
    }

    token = token.split(' ')[1];
    
    jwt.verify(token, env.JWT_SIGNATURE, (err, admin) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(403).json({ message: 'Token expired' }); 
            } else {
                res.status(403).json({ message: 'Token verification failed' });
            }
            if (typeof admin == 'object' && admin?.role != 'admin'){
                return res.status(403).json({ message: 'Forbidden : Access denied' });
            }
        }
        if(typeof admin == 'object' &&  admin?.email){
            req.body.email =  admin.email
            next(); 
        }
    });
};

export default middleware;
