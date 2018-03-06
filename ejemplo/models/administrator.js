var mongoose = require('mongoose');

var AdministratorSchema = mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  username:{
    type: String,
    required:true
  },
  role:{
    type: String,
    required:true
  },
  password:{
    type: String,
    required:true
  },
  conjunto:{
    type:String,
    default: undefined
  }
});

var Administrator = module.exports = mongoose.model('Administrator', AdministratorSchema);
