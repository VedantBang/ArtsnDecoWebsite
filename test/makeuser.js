require('../config/db')(process.argv[2] || "online");

const User = require('../models/user');

const bcrypt = require('bcrypt');

(async()=>{
	let hash = await bcrypt.hash('styrofoam', 5);
	await User.replaceOne(
		{ username: 'artsndeco' },
		{ username: 'artsndeco', passhash: hash },
		{ upsert: true }
	);
	console.log('username:artsndeco');
	console.log('password:styrofoam');
	process.exit(0);
})();