const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
	icon: {
		type: String, required: true
	},
	number: {
		type: String, required: true
	},
	text: {
		type: String, required: true
	}
});

module.exports = mongoose.model('Stat', statsSchema);