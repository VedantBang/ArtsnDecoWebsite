const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
	name: { type: String, required: true },
	post: String,
	insta: String,
	facebook: String,
	image: String,
	contact: String,
	visible: {
		type: Number,
		default: 0
	}
});
module.exports = mongoose.model('Profile', profileSchema);