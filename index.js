require('./models/db')
const express = require('express')
//configure routercontroller here
const bodyparser = require('body-parser')
const path = require('path')
const exphbs = require('express-handlebars')

var app = express()

app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());

const customerController = require('./controllers/customerController')
//use middleware function
app.use('/customer', customerController)

//configure express middleware for handlebars
//view dir fpr the app; 
//this file contains handlebars views files.
app.set('views', path.join(__dirname, '/views/'))
// there will be a file mainlayout.hbs--> inside this we will have an overview of the app (html tag, head, body tags...) like a wrapper for childe views.
app.engine('hbs', exphbs({extname:'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}))//contains config details fro expressbars
app.set('view engine', 'hbs')

app.listen(3000, ()=>{
  console.log('Server hosting at port 3000')
})





