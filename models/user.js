const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({ username: String, passhash: String });
module.exports = mongoose.model('User', userSchema);