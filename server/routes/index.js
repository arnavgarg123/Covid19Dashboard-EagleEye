var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const AssistantV2 = require('ibm-watson/assistant/v2');
const request = require("request");
const url = "https://bing.com/covid/data";
var fetch = require('node-fetch');
const {
  WatsonMLScoringEndpoint
} = require("watson-ml-model-utils");
/********* Discovery ********** */
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const {
  IamAuthenticator
} = require('ibm-watson/auth');

const discovery = new DiscoveryV1({
  version: '2019-04-30',
  authenticator: new IamAuthenticator({
    apikey: 'TXcaw5W_0Efc00Gyyf5HZ5CvY3JLXjuSw0YPC4e2AQqY',
  }),
  url: 'https://api.eu-gb.discovery.watson.cloud.ibm.com/instances/96f00cc9-4f27-4aeb-8405-50d6104c8001',
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
      resp.send(res)
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;