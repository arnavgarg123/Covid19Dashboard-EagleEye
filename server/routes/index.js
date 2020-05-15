var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const AssistantV2 = require('ibm-watson/assistant/v2');
const request = require("request");
const url = "https://bing.com/covid/data";
var fetch = require('node-fetch');
var Cloudant = require('@cloudant/cloudant');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const {
  WatsonMLScoringEndpoint
} = require("watson-ml-model-utils");
/********* Discovery ********** */
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const {
  IamAuthenticator
} = require('ibm-watson/auth');

const accountSid = 'AC47c50eedd8aec69a76f40c3a10d23706';
const authToken = 'd1f9c3a1d65c5aee91b275d34ba728e1';
const client = require('twilio')(accountSid, authToken);

const discovery = new DiscoveryV1({
  version: '2019-04-30',
  authenticator: new IamAuthenticator({
    apikey: '4OkZY4V7mFE33f7ToN-KokAy-o-Fph1zxCryN8yGYN6o',
  }),
  url: 'https://gateway-lon.watsonplatform.net/discovery/api',
});
/********* End ********** */

require('custom-env').env('staging')
var sEssionID = null;
var uSerID = null;
/********* Creating Watson Assistant Object ********** */
const assistant = new AssistantV2({
  version: '2020-02-05',
  authenticator: new IamAuthenticator({
    apikey: process.env.API_KEY,
  }),
  url: process.env.URL,
});

var cloudant = new Cloudant({
  account: '5e4652a6-5c83-4a6b-bdea-d59e541a9214-bluemix',
  plugins: {
    iamauth: {
      iamApiKey: '3YU6xJFL3nRhQfuK7dg1yorNJsh2fooBpiqeIgNW4Whl'
    }
  }
});

var wml_credentials = {
  "apikey": "5aLBMzzHrv5FfIAamrsGF_iA89Ju00QBqdIkX5Qlbxc8",
  "iam_apikey_description": "Auto-generated for key ba6f45a9-82cb-4e61-b100-0da09a9dc2ea",
  "iam_apikey_name": "Service credentials-1",
  "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Writer",
  "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/629a516fab9945cb9250e277769a9062::serviceid:ServiceId-9e7f7e03-0c7b-4c87-ad17-4adc3f7fa2ef",
  "instance_id": "a0a92b42-1092-4ba7-9604-f85bbe71c053",
  "url": "https://eu-gb.ml.cloud.ibm.com"
};
//const features = [];
//const endpoint = new WatsonMLScoringEndpoint(features);

var apikey = '5aLBMzzHrv5FfIAamrsGF_iA89Ju00QBqdIkX5Qlbxc8';
var IBM_Cloud_IAM_uid = "bx";
var IBM_Cloud_IAM_pwd = "bx";
var btoa = require("btoa");
var options = {
  url: "https://iam.bluemix.net/oidc/token",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Basic " + btoa(IBM_Cloud_IAM_uid + ":" + IBM_Cloud_IAM_pwd)
  },
  body: "apikey=" + apikey + "&grant_type=urn:ibm:params:oauth:grant-type:apikey"
};
var iam_token;
request.post(options, function(error, response, body) {
  var iam_token1 = JSON.parse(body)["access_token"];
  iam_token = iam_token1;
});


//var function_deployment_endpoint_url = "https://eu-gb.ml.cloud.ibm.com/v3/wml_instances/a0a92b42-1092-4ba7-9604-f85bbe71c053/deployments/eb63bf62-008c-4c2d-b757-28dc8c291d76/online";
router.post('/getNews', (req, resp, next) => {
  const queryParams = {
    environmentId: 'system',
    collectionId: 'news-en',
    naturalLanguageQuery: 'covid cure',
    count: 10,
    passages: true,
  };


  discovery.query(queryParams)
    .then(queryResponse => {

      resp.send(queryResponse.result.results);
      //console.log(JSON.stringify(queryResponse.result.results[0].text) + ".... Read more at " + JSON.stringify(queryResponse.result.results[0].url, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });
});
router.post('/NewUser', (req, resp, next) => {
  console.log("____________________________________");
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Covid");
    var myobj = {
      email: req.body.email,
      Password: req.body.Password,
      book: req.body.book,
    };
    dbo.collection("user").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      resp.send(true);
    });
  });
});

router.post('/Verify', (req, resp, next) => {
  console.log("____________________________________");
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Covid");
    dbo.collection("user").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      resp.send(result);
      db.close();
    });
  });
});

router.post('/getRec', (req, resp, next) => {
  var endpoint_url = "https://eu-gb.ml.cloud.ibm.com/v3/wml_instances/a0a92b42-1092-4ba7-9604-f85bbe71c053/deployments/eb63bf62-008c-4c2d-b757-28dc8c291d76/online";
  instance_id = 'a0a92b42-1092-4ba7-9604-f85bbe71c053';
  var options = {
    url: endpoint_url,
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + iam_token,
      "ML-Instance-ID": instance_id
    },
    body: JSON.stringify({
      "values": [1]
    })
  };
  //console.log("+++++++++++++++++++++++++")
  //console.log(iam_token)
  //console.log("+++++++++++++++++++++++++")
  var request = require('request');
  request.post(options, function(error, response, body) {
    if (error) {
      console.log(error);
    } else {
      //console.log(body);
      resp.send(body);
    }

  });
});

router.post('/setLoc', (req, resp, next) => {

  console.log("____________________________________");
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Covid");
    var myobj = {
      lat: req.body.lat,
      long: req.body.lng,
      message: req.body.msg,
    };
    dbo.collection("location").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      resp.send(true);
    });
  });
});

router.post('/getLoc', (req, resp, next) => {



  console.log("____________________________________");
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Covid");
    dbo.collection("location").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      resp.send(result);
      db.close();
    });
  });
});

router.post('/getCases', (req, resp, next) => {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
});

router.post('/CreateSession', (req, resp, next) => {

  //console.log(req.body);
  assistant.createSession({
      //assistantId: 'b4e71061-5863-485b-ab88-bf0358627cfa'
      assistantId: process.env.ASSISTANT_ID
    })
    .then(res => {
      console.log(JSON.stringify(res, null, 2));
      resp.send(res);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/AskWatson', (req, resp, next) => {
  console.log("Send chat and post called with Input:", req.body);
  assistant.message({
      assistantId: process.env.ASSISTANT_ID,
      sessionId: req.body.session_id,
      input: {
        'message_type': 'text',
        'text': req.body.question
      }
    })
    .then(res => {
      //console.log(JSON.stringify(res, null, 2));
      cloudant.db.use('covidzoneclassification').list({
        include_docs: true
      }, function(err, body) {
        var str = res.result.output.generic[0].text;
        var st = str.split(" ");
        console.log("Str split");
        console.log(st);
        for (var i = 0; i < body.total_rows; i++) {
          if (st[0] == 'visit' && body.rows[i].doc.zone == 'green') {
            if (body.rows[i].doc.postcode == st[1] || body.rows[i].doc.location == st[1]) {
              res.result.output.generic[0].text = "The area you wish to visit is in green zone. Please do take some precautions to ensure your safety and others safety.";
            }
          }

          if (st[0] == 'visit' && body.rows[i].doc.zone == 'red') {
            if (body.rows[i].doc.postcode == st[1] || body.rows[i].doc.location.toLowerCase() == st[1].toLowerCase()) {
              var j = i;
              while (body.rows[j].doc.zone == 'red') {
                j++;
              }
              var first = body.rows[j].doc.location;
              j = j + 1;
              while (body.rows[j].doc.zone == 'red') {
                j++;
              }
              var second = body.rows[j].doc.location;
              j = j + 1;
              while (body.rows[j].doc.zone == 'red') {
                j++;
              }
              var third = body.rows[j].doc.location;
              res.result.output.generic[0].text = "The area you wish to visit is in high risk area. Some recommended areas in green zone are -\n1. " + first + ", \n2. " + second + ", \n3. " + third;
            }
          }
          if (st[0] == 'supply') {
            var shop = ["Coles", "Woolworths", "ALDI", "IGA", "Woolies"];
            var randomItem = shop[Math.floor(Math.random() * shop.length)];
            if (body.rows[i].doc.postcode == st[1] && body.rows[i].doc.zone == 'green') {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", "https://platform.clickatell.com/messages/http/send?apiKey=Ni31A3NMRHW9tO4bGz3qHA==&to=918217099893&content=" + "Your query has been raised. Your reference number is " + Math.floor(100000 + Math.random() * 900000), true);
              xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                  console.log('success')
                }
              };
              xhr.send();
              /*client.messages.create({
                  body: "Your query has been raised. Your reference number is " + Math.floor(100000 + Math.random() * 900000),
                  from: '+12058801481',
                  to: '+918428275272'
                })
                .then(message => console.log(message.sid));*/
              var randNum = Math.floor(100000 + Math.random() * 900000);
              res.result.output.generic[0].text = "You are in green zone. Please visit " + randomItem + " to get your food supplies. \nA message has been sent to your registered mobile number with your reference number.";
            }
            if (body.rows[i].doc.postcode == st[1] && body.rows[i].doc.zone == 'red') {
              var randNum = Math.floor(100000 + Math.random() * 900000);
              var xhr = new XMLHttpRequest();
              xhr.open("GET", "https://platform.clickatell.com/messages/http/send?apiKey=Ni31A3NMRHW9tO4bGz3qHA==&to=918217099893&content=" + "Your query has been raised. Your reference number is " + randNum, true);
              xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                  console.log('success')
                }
              };
              xhr.send();
              /*client.messages.create({
                  body: "Your query has been raised. Your reference number is " + randNum,
                  from: '+12058801481',
                  to: '+918428275272'
                })
                .then(message => console.log(message.sid));*/
              res.result.output.generic[0].text = "Your area is in red zone. We will deliver food kit in some time. Your request number is - \n " + randNum + ". \nA message has been sent to your registered mobile number with your reference number.";
            }
          }
        }
        if (st[0] == "Call" && st[1] == "Ambulance") {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", "https://platform.clickatell.com/messages/http/send?apiKey=Ni31A3NMRHW9tO4bGz3qHA==&to=918217099893&content=" + "Ambulance requested.", true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
              console.log('success')
            }
          };
          xhr.send();
          /*client.messages.create({
              body: "Ambulance requested.",
              from: '+12058801481',
              to: '+918428275272'
            })
            .then(message => console.log(message.sid))*/
          var xhr = new XMLHttpRequest();
          var num = Math.floor(100000 + Math.random() * 900000);
          xhr.open("GET", "https://platform.clickatell.com/messages/http/send?apiKey=Ni31A3NMRHW9tO4bGz3qHA==&to=918217099893&content=" + "Ambulance has been called. Your reference number is " + num + " Name of the driver - Jack Noah. Mobile number of the driver - +61 81758845", true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
              console.log('success')
            }
          };
          xhr.send();
          /*client.messages.create({
              body: "Ambulance has been called. Your reference number is " + num + " Name of the driver - Jack Noah. Mobile number of the driver - +61 81758845",
              from: '+12058801481',
              to: '+918428275272'
            })
            .then(message => console.log(message.sid))*/
          res.result.output.generic[0].text = "Ambulance has been called. It will arrive at your location in some time. \nYour reference number is \n" + num + ". \nA message has been sent to your registered mobile number with your reference number and the driver details.";
        }
        resp.send(res)
      });

    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;