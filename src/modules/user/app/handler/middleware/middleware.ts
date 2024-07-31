import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import env from '../../../infrastructure/config/environment';
import StatusCode from '../../../infrastructure/config/status-code'

import { createAccessToken,createRefreshToken } from '../../../infrastructure/services/generateToken';

const middleware = async (req: Request, res: Response, next: NextFunction) => {

    // let token = req.headers['accessToken'] as string;
    // let refreshToken = req.headers['refreshToken'] as string;
    let token = req.headers['accessToken'] as string || req.cookies.accessToken
    let refreshToken = req.headers['refreshToken'] as string || req.cookies.refreshToken

    if (!token) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: 'No token provided' });
    }

    token = token.split(' ')[1];

    jwt.verify(token, env.JWT_SIGNATURE, async (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {

                const output = await validateRefreshToken(refreshToken);
                if (!output.success) {
                    return res.status(output.status).json({ message: output.message });
                }

                res.cookie('accessToken', output.accessToken, {
                    httpOnly: true,
                    // secure: env. === 'production',
                    sameSite: 'strict'
                });

                res.cookie('refreshToken', output.refreshToken, {
                    httpOnly: true,
                    // secure: env. === 'production',
                    sameSite: 'strict'
                });

                req.body.accessToken = output.accessToken;
                req.body.refreshToken = output.refreshToken;
                req.body.phone = (output.user as JwtPayload).phone;
                next();

            } else {
                return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token verification failed' });
            }
        } else {
            const user = decoded as JwtPayload;
            if (user.role !== 'user') {
                return res.status(StatusCode.FORBIDDEN).json({ message: 'Forbidden: Access denied' });
            }
            req.body.phone = user.phone;
            next();
        }
    });
};

export default middleware;




const validateRefreshToken = async (refreshToken: string): Promise<ValidateRefreshOutput> => {

    if (!refreshToken) return {
        message: "No refresh token provided",
        status: StatusCode.UNAUTHORIZED,
        success: false
    }

    let token = refreshToken.split(' ')[1];

    return new Promise((resolve) => {

        jwt.verify(token, env.REFRESH_JWT_SIGNATURE, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    resolve({
                        message: 'Refresh token expired',
                        status: StatusCode.UNAUTHORIZED,
                        success: false
                    })
                } else {
                    resolve({
                        message: 'Refresh token verification failed',
                        status: StatusCode.UNAUTHORIZED,
                        success: false
                    })
                }
            } else {

                const user = decoded as JwtPayload;
                const newAccessToken = createAccessToken(user.phone)
                const newRefreshToken = createRefreshToken(user.phone)

                resolve({
                    message: 'New tokens generated',
                    status: StatusCode.OK,
                    success: true,
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                    user: user
                });
            }
        });
    });
};



interface ValidateRefreshOutput {
    message: string;
    success: boolean;
    status: StatusCode;
    accessToken?: string;
    refreshToken?: string;
    user?: JwtPayload;
}
