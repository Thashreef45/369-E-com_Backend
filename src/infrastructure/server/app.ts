import express, { Application } from 'express';
import cors from 'cors';
import logger from 'morgan';
import env from '../environment'
import dBConnection from '../database/mongoose/setup'

import userRouter from '../../modules/user/app/handler/route'
import adminRouter from '../../modules/admin/app/handler/route'
// import { errorMiddleware } from './error.js';

import nocache from 'nocache';

class ExpressServer {
    private app: Application;
    private port: number;

    constructor(port: number) {
        console.log("The environment port is: ", port);
        this.port = port;
        this.app = express();

        this.initializeCORS();
        this.initializeMiddlewares();
        this.initializeDBConnection()
        this.initializeRoutes();
    }
    
    private initializeMiddlewares() {
        this.app.use(nocache());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        if (env.NODE_ENV === 'development') {
            this.app.use(logger("dev"));
        }
    }

    private initializeDBConnection () {
        dBConnection()
    }

    private initializeRoutes() {
        this.app.use('/user', userRouter);
        this.app.use('/admin',adminRouter);
        // this.app.use('/vendor', userRouter);

        this.app.use("/health", (req, res) => res.json("Health check"));
    }


    private initializeCORS() {
        this.app.use(cors());
    }



    public start(callback: () => void) {
        this.app.listen(this.port, callback);
    }
}

export default ExpressServer