
const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.DB_CONNECTION);

        console.log('db online')


    } catch (error) {
        console.log(error)
        throw new Error('Failed connecting to database.')
    }
}

module.exports = {
    dbConnection
}


