var customer = require('../models/customer.model')
// in this file we deal with __ opeartion realted to customer.

const express = require('express')
var router = express.Router();
const mongoose = require('mongoose')
const Customer = mongoose.model('Customer') 
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

//send a responce of addoredot.bhs to this get, so we add render
router.get('/', (req, res) => {
  //res.json('Sample text')
  res.render('customer/addOrEdit', {
    viewTitle: "Insert your Data" 
  })
}) 

//no need to give /customer, ads this is the base url,
//form data returned will be in the req body attribute
router.post('/', (req, res) => {
  if(req.body._id == '')
    insertRecord(req, res);
    else
    updateRecord(req, res);
});

//insert body data into db
//1. create obj of customer schema
//2. populate the field with body content
function insertRecord(req, res){
  var customer = new Customer();
  customer.name = req.body.name;
  customer.email = req.body.email;
  customer.password = req.body.password;
  customer.save((err, doc) => {
    if(!err){
    res.redirect('customer/list');
    }
    else{
      if(err.name == 'ValidationError'){
        handleValidationError(err, req.body)
        res.render('customer/addOrEdit', {
                    viewTitle: "Insert your Data" ,
                    customer: req.body
                  });
      }
      else
        console.log('got an error: ',err);
    }
  })
}

function updateRecord(req, res){
  Customer.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
    if(!err){res.redirect('customer/list');}
    else{
      if(err.name == 'ValidationError'){
        handleValidationError(err, req.body);
        res.render('customer/ addOrEdit', {
          viewTitle: 'Update Customer',
          customer: req.body
        })
      }
      else{
        console.log("error: ", err)
      }
    }
  })
}

router.get('/list', (req, res) => {
  //res.json('form list')
  Customer.find((err, docs) => {
    if (!err) {
        res.render("customer/list", {
            list: docs
        });
    }
    else {
        console.log('Error in retrieving customer list :' + err);
    }
})
.lean()
});

function handleValidationError(err, body){
  for(field in err.errors){
    switch(err.errors[field].path){
      case 'name': 
        body['nameError'] = err.errors[field].message;
        break;
      case 'email':
        body['emailError'] = err.errors[field].message;
        break;  
      default:
        break;
    
    }
  }
}

router.get('/:id', (req, res) => {
  Customer.findById(req.params.id, (err, doc) => {
    if(!err){
      res.render("customer/addOrEdit", {
        viewTitle: "Update Customer",
        customer: doc
      })
    }
  })
  .lean()
})

router.get('/delete/:id', (req, res) => {
  Customer.findByIdAndRemove(req.params.id, (err, doc) => {
    if(!err){
      res.redirect('/customer/list');
    }
    else{
      console.log("error: "+err)
    }
  })
})


  //export the rouetr obj from the controller
  module.exports = router