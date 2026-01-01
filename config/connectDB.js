const mongoose= require('mongoose');

const connectDB = async()=>{
    try{

        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taskmanagerapp');
        console.log('Database connected successfully');
    }catch(e){
        console.log('Error connecting to database', e);
    }
}

module.exports = connectDB;