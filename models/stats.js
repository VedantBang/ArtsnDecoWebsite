const mongoose = require('mongoose');
const statsSchema = new mongoose.Schema({
	lines: [String]
});
module.exports = mongoose.model('Stat', statsSchema);