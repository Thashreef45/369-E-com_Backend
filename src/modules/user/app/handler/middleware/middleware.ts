import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import env from '../../../infrastructure/config/environment';

const middleware = (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers['token'] as string
    
    if (!token) {
        res.status(401).json({ message: 'No token provided' }); // Unauthorized
    }

    token = token.split(' ')[1];
    
    jwt.verify(token, env.JWT_SIGNATURE, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(403).json({ message: 'Token expired' }); 
            } else {
                res.status(403).json({ message: 'Token verification failed' });
            }
            if (typeof user == 'object' && user?.role != 'user'){
                return res.status(403).json({ message: 'Forbidden : Access denied' });
            }
        }
        if(typeof user == 'object' &&  user?.phone){
            req.body.phone =  user.phone
            next(); 
        }
    });
};

export default middleware;
