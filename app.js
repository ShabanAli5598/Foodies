let mongodbcon = require('./mongodbcon');
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




app.listen(8080,(error)=>{
    if(error) throw error;
    console.log("server is runinng.."); 
});
