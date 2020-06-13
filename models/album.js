const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	title: { type: String, required: true },
	link: { type: String, required: true },
});

const albumSchema = new mongoose.Schema({
	fest: {
		type: String,
		lowercase: true,
		enum: ['waves','quark','spree','other'],
		required: true
	},
	year: {
		type: Number,
		require: true
	},
	name: {
		type: String,
		default: ''
	},
	theme: {
		type: String,
		default: ''
	},
	images: [imageSchema]
});

module.exports = mongoose.model('Album', albumSchema);