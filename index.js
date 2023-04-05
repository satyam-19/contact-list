
const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// const contactList = [
//     {
//         name : "jss",
//         phone : "123455678451390"
//     },
//     {
//         name : "name2",
//         phone : "1233157890"
//     },
//     {
//         name : "name3",
//         phone : "123315484567890"
//     },
   
// ]

app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
        console.log('error in fetching contacts from db');
        return;
        }

        return res.render('home',{
        title: "my contact list",
        contact_list: contacts
        });

    });

  
})

app.post('/create-contact', function(req,res){
   
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }

        console.log('************',newContact);
        return res.redirect('/');
    });

});






// for query param 
app.get('/delete-contact',function(req,res) {
    
    let id = req.query.id;

    
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting the contact from db');
            return;
        }
        
         return res.redirect('back');
    });

    
});





app.get('/practice',function(req,res){
    return res.render('practice',{title: "practice mode"});
})



app.listen(port,function(err){
    if(err){
        console.log('error' , err);
    }
    else{
        console.log('server is up ', port);
    }
})