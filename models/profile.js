const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
	name: { type: String, required: true },
	post: String,
	insta: String,
});
module.exports = mongoose.model('Profile', profileSchema);