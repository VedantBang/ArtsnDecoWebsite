const mongoose = require("mongoose");
async function connect() {
	try {
    	await mongoose.connect("mongodb://localhost:27017/data", {
      		useUnifiedTopology: true,
      		useNewUrlParser: true,
    	});
    	console.log("Connected to \x1b[32mDatabase\x1b[0m");
  	} catch (err) {
    	console.log("\x1b[31mERROR\x1b[0m", err);
    	process.exit(0);
  	}
}
module.exports = connect;
