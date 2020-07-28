require('dotenv').config();

module.exports = {
	MONGOURL: process.env.MONGOURL,
	JWTKEY: process.env.JWTKEY
}

if(require.main === module){
	console.log(module.exports);
}