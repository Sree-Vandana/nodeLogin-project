const mongoose =  require('mongoose')

mongoose.connect('mongodb://localhost:27017/CustomerDB', { useNewUrlParser: true }, (err) => {
  if(!err){console.log('MongoDB connection success!')}
  else { console.log('ERROR: cannot connect to db ', err)}
})

