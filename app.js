const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",(req,res)=>{
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    const message = req.body.message;
    const data =  {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname,
                    MESSAGE: message
                }
            }
        ]
    };
    const options = {
        auth: {
          username: "Gokul",
          password: "b1d3377a75908e46609aec2ec006bf02-us10"
        }
    };
    var err;
    const url = "https://us10.api.mailchimp.com/3.0/lists/34d6a6c980";
    const jsonData = JSON.stringify(data);
    axios.post(url, data ,options)
    .then((response) => {
        err = 0;
        res.send(response.jsonData);
    })
    .catch(error => {
        err = 1;
        res.send(error.response.jsonData)
    })
    if (err==1){
        res.sendFile(__dirname+"/failure.html");
    }
    else{
        res.sendFile(__dirname+"/success.html");
    }
})
app.post("/failure",(req,res)=>{
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server running in port 3000");
})

//list id
//34d6a6c980

//api key
//b1d3377a75908e46609aec2ec006bf02-us10
