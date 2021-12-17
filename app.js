const express = require('express');
const app = express();
app.set('view engine', 'ejs');  


//routes
app.get('/index', (req,res)=>{
    res.render('pages/index');
});

app.get('/add_student', (req,res) =>{
    res.render('pages/add_student')
})


//Database
const MongoClient = require('mongodb').MongoClient
MongoClient.connect("mongodb://localhost:27017/ yelp-camp", (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
})


app.listen(3000, () => {
    console.log('Serving on port 3000');

})