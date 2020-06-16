const mongoose = require("mongoose");
let url = "mongodb+srv://rohit007:rohit007@cluster0-4dwba.mongodb.net/data?retryWrites=true&w=majority";

async function connect(isLocal) {
	try{
        if(isLocal) url = "mongodb://localhost:27017/data";
    	await mongoose.connect(url, {
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
