var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const alert = require('alert')
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Logindb')
var db = mongoose.connection;
db.on('error',()=>console.log('Error in Connecting to Database'));
db.once('open',()=>console.log("connected to db"));

app.post("/sign_in",(req,res)=>{
    var name = req.body.userName;
    var password = req.body.userPassword;
    var confpassword = req.body.conformpassword;
    var email = req.body.email;
    var phoneno = req.body.Phoneno;
    var cardnumber = req.body.cardnumber;
    var cv= req.body.cv;
    console.log(name);
    console.log(password);
    console.log(confpassword);
    console.log(email);
    console.log(phoneno);
    console.log(cardnumber);
    console.log(cv);
    var data = {
        "userName" : name,
        "userPassword" : password,
        "conformpassword" : confpassword,
        "email" : email,
        "Phoneno" : phoneno,
        "cardnumber" : cardnumber,
        "cv" : cv
     }

     db.collection('signin').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
     });
     return res.redirect('login_page.html')
})

app.post("/sign_up",(req,res)=>{
    
    var user = req.body.userName;
    var pass = req.body.userPassword;
    var data = {
        "userName": user,
        "userPassword" : pass
    }

    db.collection("Logindb").find( {userName:user,userPassword:pass} ).toArray(function(err, result) {
        if (err) throw err;
        if (result.length === 0){
            alert("Invalid UserName or Password");
        }
        else{
            return res.redirect('login_page.html')
        }
      });
})
app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.redirect('login_page.html');
    }).listen(2000)

console.log("Listening on PORT 2000");