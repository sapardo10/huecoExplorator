var mongoose = require('mongoose');

var AdministratorSchema = mongoose.Schema({
  username:{
    type: String,
    required:true
  },
  password:{
    type: String,
    required:true
  }
});

var Administrator = module.exports = mongoose.model('Administrator', AdministratorSchema);
