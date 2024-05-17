import env from '../../environment';
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.MongoDb_Connection);
        console.log('Database Connected');
    } catch (error:any) {
        console.error(`${error.message}`)
        process.exit(1);
    }
};

export default connectDB;