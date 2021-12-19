const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient


var db


MongoClient.connect('mongodb://localhost:27017/attendence', (err, database) => {
  if (err) return console.log(err)
  db = database.db('attendence')
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {

    res.render('home.ejs')

})

app.get('/add_student', (req,res) =>{
    res.render('add_student.ejs')
})

app.get('/index', (req, res) => {
  db.collection('user').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {user: result})
  })

})



app.post('/quotes', (req, res) => {
  db.collection('user').insertOne({type : "teacher" , ...req.body }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.post('/student', (req, res) => {
  db.collection('user').insertOne({type : "student" , ...req.body }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.render('add_student.ejs')
  })
})