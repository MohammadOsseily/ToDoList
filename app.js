const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();


const items = ["Buy the food", "Cook the food", "Eat the food"];
const workList = [];

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

// to be able to use EJS
app.set('view engine', 'ejs');

// get the message and post it.
app.get("/",function (req,res){

    const day = date.getDay();
    res.render('list', {ListTittle: day,item: items});
})

// the post request for the user input
app.post("/", function (req,res){

    const item  = req.body.Users;
    if (req.body.list === "Work"){
        workList.push(item);
        res.redirect("/work");
    }else{
        res.redirect("/");
        items.push(item);
    }

});

app.get("/work", function (req,res){
    const item  = req.body.Users;
    res.render('list', {ListTittle: "Work",item: workList});
    res.redirect("/");

    workList.push(item);
})

// I use this to listen to the port.
app.listen(3000, ()=>console.log("It is doing Fine!"));