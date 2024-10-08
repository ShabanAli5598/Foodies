let mongodbcon = require('./mongodbcon');
let registrationdb = require('./registrationcon');
let bussinessReg = require('./bussinessReg');
let dealorder = require('./dealcon');
let express = require('express');
let path = require('path');
let fpath = path.join(__dirname,'front-end')
let app = express();
app.use(express.static('front-end'));
app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.get('/', async (req,res)=> {
    res.sendFile(`${fpath}/foodies.html`);
});
   

app.post('/order', async (req,res) =>{
    let result = await mongodbcon();
    let data =  await result.insertOne(
        {
        First_Name : req.body.fname,
        Last_Name : req.body.lname,
        Email: req.body.email,
        Address: req.body.address,
        Phone: req.body.phone,
        Message: req.body.message
    }
)
   
     res.redirect('/');
    
});

app.post('/register', async(req,res)=>{
    let result = await registrationdb();
    let data = await result.insertOne({
        Name : req.body.name,
        Last_Name : req.body.lname,
        Email : req.body.email,
        Password : req.body.password,
        City : req.body.city,
        Zip : req.body.zip,
        Phone : req.body.phone,
    })
    res.sendFile(`${fpath}/navigation files/login.html`);

});


app.post('/login',async(req,res)=>{
    let result = await registrationdb();
    result = await result.findOne({
        Email :req.body.email,
        Password : req.body.password
    })
    if(!result){
        res.send(" email or password are not matched..")
    }else {
        res.redirect('/');
    }
});

app.post('/bussiness-reg', async(req,res)=>{
    let result = await bussinessReg();
    let data = result.insertOne({
        Company_Name : req.body.cname,
        Registration_number : req.body.rnumber,
        Industry : req.body.industry,
        No_of_employees : req.body.nofemp,
        Street : req.body.street,
        Postal_code : req.body.pcode,
        Name : req.body.name,
        Email : req.body.email,
        Phone : req.body.phone

    });
    res.redirect('/');


});

app.post('/dealorder', async(req,res)=> {
    let result = await dealorder();
     result = result.insertOne({
        First_Name : req.body.fname,
        Last_Name: req.body.lname,
        Email: req.body.email,
        Address : req.body.email,
        Phone: req.body.phone,
        Message : req.body.message
     });
     res.sendFile(`${fpath}/navigation files/deal.html`);
});









app.listen(8080,(error)=>{
    if(error) throw error;
    console.log("server is runinng.."); 
});
