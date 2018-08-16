var mongoose = require('mongoose');

var CountrySheme = new mongoose.Schema({
  name: String,
  shortName: String
}, {timestamps: true})

mongoose.model('Country', CountrySheme);