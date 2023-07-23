import mongoose from 'mongoose';

const connectMongoDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('MongoDB Conneted');
  } catch (error) {
    console.log('Error while connecting mongoDB : ' + error.message);
  }
};
export default connectMongoDB;
