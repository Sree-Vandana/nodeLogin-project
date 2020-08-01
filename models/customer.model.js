//this file defines schema and structure of customer document

const mongoose = require('mongoose')

//customer schema definition
var customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required:  'this field is required'
  },
  email:{
    type: String,
    required: 'this field is required'
  },
  password: {
    type: String,
    required:'password is must to secure your account'
  }
});

// Custom validation for email
customerSchema.path('email').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

//register this customerSchema inside mongoose
module.exports = mongoose.model('Customer', customerSchema);
/**in order to insert a new record into mongoDB we will call asave fumction from schema object 'customers'(pural form..--> collection name) */
