const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({ 
	username: String, 
	passhash: String, 
	visits: {
		type: Number,
		default: 0
	} 
});
module.exports = mongoose.model('User', userSchema);