const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const client = require("@mailchimp/mailchimp_marketing");
app = express();
app.use(bodyParser.urlencoded({ extened: true }));
app.use(express.static("public"));



app.get("/", function (req, res) {
    console.log("Server is running");
    res.sendFile(__dirname + "/signup.html");
})
app.post("/", function (req, res) {
    var firstname = req.body.fName;
    var lastname = req.body.lName;
    var email = req.body.email;
    var data = {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstname,
            LNAME: lastname
        }
    };

    client.setConfig({
        apiKey: "20bd7c945c1ec0921f4d591fb8923af6-us12",
        server: "us12",
    });

    const run = async () => {
        const response = await client.lists.addListMember("4524429656", data);        
        console.log(response);
    };
    run();

    res.sendFile(__dirname + "/success.html");

    //API key: 20bd7c945c1ec0921f4d591fb8923af6-us12
    //clien key: 4524429656
})
const port = process.env.PORT;
app.listen(process.env.PORT || 3000, function () {
    console.log("server is listening port:" + port);
})