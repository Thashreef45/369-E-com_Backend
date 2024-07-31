import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import env from '../../../infrastructure/config/environment';
import StatusCode from '../../../infrastructure/config/status-code';

const otpMiddleware = (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers['token'] as string
    
    if (!token) {
        res.status(StatusCode.UNAUTHORIZED).json({ message: 'No token provided' }); // Unauthorized
    }
    
    token = token.split(' ')[1];
    
    jwt.verify(token, env.OTP_JWT_SIGNATURE, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token expired' }); 
            } else {
                res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token verification failed' });
            }
        }

        if (typeof user == 'object' && user?.role != 'user'){
            return res.status(StatusCode.FORBIDDEN).json({ message: 'Forbidden : Access denied' });
        }
        if(typeof user == 'object' &&  user?.phone){
            req.body.phone =  user.phone
            next(); 
        }
    });
};

export default otpMiddleware;
