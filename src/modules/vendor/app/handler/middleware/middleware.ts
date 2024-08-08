import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import env from '../../../infrastructure/config/environment';
import StatusCode from '../../../infrastructure/config/staus-code';

const middleware = (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers['token'] as string

    if (!token) {
        res.status(StatusCode.UNAUTHORIZED).json({ message: 'No token provided' }); // Unauthorized
    }

    token = token.split(' ')[1];

    jwt.verify(token, env.JWT_SIGNATURE, (err: any, vendor: any) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token expired' })
                return
            } else {
                res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token verification failed' })
                return
            }
        }

        if (typeof vendor == 'object' && vendor?.role != 'vendor') {
            res.status(StatusCode.FORBIDDEN).json({ message: 'Forbidden : Access denied' })
            return
        }

        if (typeof vendor == 'object' && vendor?.phone) {
            req.body.phone = vendor.phone
            next();
        }
    });
};

export default middleware;
