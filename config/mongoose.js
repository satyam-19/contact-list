
// require the library
const mongoose = require('mongoose')

// connect to the databae
mongoose.connect('mongodb://localhost/contact_list_db0');

// acquire connection (to check if its successfull)  
const db = mongoose.connection;  

//error
db.on('error', console.error.bind(console,'error connecting to db'));

//up and running 
db.once('open',function () {
    console.log('successfully connected to db')
});