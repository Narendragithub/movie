const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app =  express();
app.set('view engine','ejs');
app.set('views','views');
const errorController= require('./controllers/error');
const movieRoutes = require("./routes/movie");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/',movieRoutes);

app.use(errorController.get404);

app.listen(3001,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Server is started....");
    }
    

});
