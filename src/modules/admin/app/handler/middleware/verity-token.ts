import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import env from '../../../infrastructure/config/environment';
import StatusCode from '../../../infrastructure/config/staus-code';


// verify token
const middleware = (req: Request, res: Response, next: NextFunction) => {

    // adminToken || token name?
    let token = req.headers['admintoken'] as string

    if (!token) {
        res.status(StatusCode.UNAUTHORIZED).json({ message: 'No token provided' }); // Unauthorized
    }

    token = token.split(' ')[1];

    jwt.verify(token, env.JWT_SIGNATURE, (err, admin) => {

        // err decrypting the token
        if (err) {

            if (err.name === 'TokenExpiredError') {
                res.status(StatusCode.FORBIDDEN).json({ message: 'Token expired' });
            } else {
                res.status(StatusCode.FORBIDDEN).json({ message: 'Token verification failed' });
            }

        }

        //checking the access/role
        if (typeof admin == 'object' && admin?.role != 'admin') {
            return res.status(StatusCode.FORBIDDEN).json({ message: 'Forbidden : Access denied' });
        }

        // attaching the admin email with body
        if (typeof admin == 'object' && admin?.email) {
            req.body.email = admin.email
            next();
        }
    });
};

export default middleware;
