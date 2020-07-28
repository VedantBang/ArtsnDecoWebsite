const mongoose = require("mongoose");

async function delay(time){
	return new Promise((a,b) => setTimeout(a,time));
}

async function connect(runType) {
	try{
        let url = require('../utilities/env').MONGOURL;
        switch(runType){
        	case "online":
        		break;
        	case "local":
        		url = "mongodb://localhost:27017/data"
        		break;
        	case "docker":
                await delay(7000);
        		url = "mongodb://mongo:27017/data"
        		break;
        }
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
