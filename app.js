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

app.use(express.static('public'))

app.get('/', (req, res) => {

    res.render('home.ejs')

})

app.get('/add_student', (req,res) =>{

    db.collection("user").find({}, { projection: { _id: 0, title: 1 } }).toArray(function(err, result) {
  console.log({result})
    if (err) return console.log(err)
    res.render('add_student.ejs', {user: result})
})
})

app.get('/view_teacher', (req, res) => {
  db.collection('user').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('view_teacher.ejs', {user: result})
  })

})
//app.get('/fetch', (req, res) => {
//  //db.collection('user').find({}).toArray((err, result) => {
//  db.collection("user").find({}, { projection: { _id: 0, title: 1 } }).toArray(function(err, result) {
//  console.log({result})
//    if (err) return console.log(err)
//    res.render('add_student.ejs', {user: result})
//  })
//
//
//})

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
    res.render('add_student.ejs',{user: result})
  })
})

app.get('/teacher_view',(req,res) =>{
db.collection('user').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(result)


res.render('teacher_view.ejs',{user : result})
})
})

app.post('/attendance', (req, res) => {
db.collection('present').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')

res.redirect('/')
})
})

