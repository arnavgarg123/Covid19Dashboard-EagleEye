var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require("cors");
var indexRouter = require('./routes/index');
const path = require('path');

const fs = require('fs');
const VisualRecognitionV4 = require('ibm-watson/visual-recognition/v4');
const {
  IamAuthenticator
} = require('ibm-watson/auth');

const visualRecognition = new VisualRecognitionV4({
  version: '2019-02-11',
  authenticator: new IamAuthenticator({
    apikey: 'MlpYBCcZAg9-6P3sXHhd5W7kvc550FO3ue5uzacDIQ22'
  }),
  url: 'https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/d359470a-fa38-4166-8e1e-a0295f9ad7ab',
});



app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(cors());

app.post('/CallVisualRecognitionAPI', function(req, ressignin) {
  console.log("Inside node js server signin ");
  console.log("request.body");
  console.log(req.body);

  const params = {
    imagesFile: [{
        data: fs.createReadStream('./images/1.jpg'),
        contentType: 'image/jpeg',
      },
      {
        data: fs.createReadStream('./images/2.jpg'),
        contentType: 'image/jpeg',
      },
      {
        data: fs.createReadStream('./images/3.jpg'),
        contentType: 'image/jpeg',
      },
      {
        data: fs.createReadStream('./images/4.jpg'),
        contentType: 'image/jpeg',
      },
      {
        data: fs.createReadStream('./images/5.jpg'),
        contentType: 'image/jpeg',
      },
      {
        data: fs.createReadStream('./images/6.jpg'),
        contentType: 'image/jpeg',
      },
      {
        data: fs.createReadStream('./images/7.jpg'),
        contentType: 'image/jpeg',
      },
      {
        data: fs.createReadStream('./images/8.jpg'),
        contentType: 'image/jpeg',
      }
    ],
    collectionIds: ['0799502a-7c37-4794-ab0b-e25611db7c5f'],
    features: ['objects'],
    threshold: 0.20
  };

  visualRecognition.analyze(params)
    .then(response => {
      console.log(JSON.stringify(response.result, null, 2));

      // ressignin.send(response);

      responsePark1AR1 = response.result.images[0].objects.collections[0].objects;
      responsePark2NAR1 = response.result.images[1].objects.collections[0].objects;
      responsePark3AR1 = response.result.images[2].objects.collections[0].objects;
      responePark4AR1 = response.result.images[3].objects.collections[0].objects;

      responseBeach1AR1 = response.result.images[4].objects.collections[0].objects;
      responseBeach2NAR1 = response.result.images[5].objects.collections[0].objects;
      responseBeach3AR1 = response.result.images[6].objects.collections[0].objects;
      responeBeach4NAR1 = response.result.images[7].objects.collections[0].objects;

      // removing duplicates and extracting highest threshold
      responsePark1AR1unique = removeDuplicate(responsePark1AR1);
      responsePark2NAR1unique = removeDuplicate(responsePark2NAR1);
      responsePark3AR1unique = removeDuplicate(responsePark3AR1);
      responePark4AR1unique = removeDuplicate(responePark4AR1);

      responseBeach1AR1unique = removeDuplicate(responseBeach1AR1);
      responseBeach2NAR1unique = removeDuplicate(responseBeach2NAR1);
      responseBeach3AR1unique = removeDuplicate(responseBeach3AR1);
      responeBeach4NAR1unique = removeDuplicate(responeBeach4NAR1);

      finaljsontoreturn = {
        "s1": responsePark1AR1unique,
        "s2": responsePark2NAR1unique,
        "s3": responsePark3AR1unique,
        "s4": responePark4AR1unique,
        "s5": responseBeach1AR1unique,
        "s6": responseBeach2NAR1unique,
        "s7": responseBeach3AR1unique,
        "s8": responeBeach4NAR1unique
      }
      console.log(responsePark2NAR1unique);
      ressignin.send(JSON.stringify(finaljsontoreturn, null, 2));
    })
    .catch(err => {
      console.log('error: ', err);
    });

});


function removeDuplicate(array) {
  hash = Object.create(null),
    unique = array.reduce(function(r, o) {
      if (!(o.object in hash)) {
        hash[o.object] = r.push(o) - 1;
        return r;
      }
      if (o.score > r[hash[o.object]].score) {
        r[hash[o.object]] = o;
      }
      return r;
    }, []);
  return unique;
}

app.use("/api", indexRouter);

app.listen(3000, () => console.log('app listening on port 3000!'));