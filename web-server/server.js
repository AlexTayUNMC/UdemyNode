const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT||3000;
var app = express();

hbs.registerPartials(__dirname+'/view/partials');

app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}:${req.method}:${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to connect');
            //next();
        }else{
            next();
        }
    });
   
});
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.use((req,res,next) => {
    res.render(__dirname+'/view/maintainence.hbs');
});
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
    res.render(__dirname + '/view/home.hbs',{
        pageTitle : 'Home page',
        welcomeMessage:'Hola!'
    });

    
});
app.get('/about',(req,res)=>{
    res.render(__dirname+'/view/about.hbs',{
        pageTitle : 'About page',
       
    });
});
app.listen(port,()=>{
    console.log(`server online at ${port}`);
});