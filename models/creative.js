const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  	title: { type: String, required: true },
  	link: { type: String, required: true },
});

const creativeSchema = new mongoose.Schema({
  	images: [imageSchema],
});
module.exports = mongoose.model('Creative', creativeSchema);