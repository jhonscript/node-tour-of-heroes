const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const heroSchema = new Schema({
  name: String
},
{
  collection: 'heroes'
});

const Hero = mongoose.model('Hero', heroSchema);
module.exports = Hero