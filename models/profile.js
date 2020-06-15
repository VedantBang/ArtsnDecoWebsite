const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
	name: { type: String, required: true },
	post: String,
	insta: String,
	image: { type: String, required: true }
});
module.exports = mongoose.model('Profile', profileSchema);