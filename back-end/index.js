const express = require("express")
const app = express();
const dotenv = require("dotenv")
const mongoose = require('mongoose')
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const addProblemRoute = require('./routes/addproblem');
const path = require('path')
// const codeforcesInfo = require('./routes/codeforcesinfo');
const axios =require('axios')
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connect to MOngoDB");
}).catch((err)=>console.log(err));

app.use('/api/auth',authRoute);
app.use('/api/users',userRoute); 
app.use('/api/addproblem',addProblemRoute);
// app.use('/api/codeforcesinfo',codeforcesInfo);

app.use(express.static(path.join(__dirname,'./front-end/build')));

app.get("*",function(req,res){
	res.sendFile(path.join(__dirname,"./front-end/build/index.html"))
})

// const API_KEY = 'd2fee9bcdfb0f12e5275c87a80d6a6713f0d09c9';

app.post('/api/userinfo', (req, res) => {
  //getting the required data from the request
  let handles = req.body.handles;

  let config = {
    method: 'POST',
    url: 'https://codeforces.com/api/user.info?handles='+handles,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: `handles=${handles}`
  };

  //calling the Codeforces API
  axios(config)
    .then(response => {
		
      res.send(response.data);
      console.log(response.data);

    })
    .catch(error => {
      console.log(error);
    });
});

app.post("/api/compile", (req, res) => {
	//getting the required data from the request
	let code = req.body.code;
	let language = req.body.language;
	let input = req.body.input;

	if (language === "python") {
		language="py"
	}

	let data = ({
		// "script": code,
		// "language": language,

		stdin: input,
		script : code,
        language: language,
        versionIndex: "0",
        clientId: "da5602b76d8915ce178ca7292a3895ac",
        clientSecret:"df88e0ac461d92d3de100dd754cba39e29c3784b6a16bc3e5db9202f6f61fb0d"
	});
	let config = {
		method: 'POST',
		url: 'https://api.jdoodle.com/v1/execute',
		headers: {
			'Content-Type': 'application/json'
		},
		data:data
	};
	//calling the code compilation API
	axios(config)
		.then((response)=>{
			res.send(response.data)
			console.log(response.data)
		}).catch((error)=>{
			console.log(error);
		});
})

app.listen("5000",()=>{ 
    console.log("Backed is running");
})
