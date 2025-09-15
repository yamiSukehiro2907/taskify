const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connectMongoDB = async () => {
    console.log("Trying to connect to MongoDB")
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connected to MongoDB" + ` \n Host: ${connect.connection.host} \n Port: ${connect.connection.port}`);
    } catch (err) {
        console.error(err)
        process.exit(1);
    }
}

module.exports = connectMongoDB;