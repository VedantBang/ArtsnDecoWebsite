const mongoose = require('mongoose');

const innerStatSchema = new mongoose.Schema({
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

const statsSchema = new mongoose.Schema({
	lines: [innerStatSchema]
});

module.exports = mongoose.model('Stat', statsSchema);