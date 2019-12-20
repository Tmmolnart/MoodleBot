var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

var moodle_client = require("moodle-client");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(bodyParser.json({type: 'application/json'}));

app.listen(process.env.PORT || 8080, function() {
console.log("express serves listening", this.address().port, app.settings.env);
});

app.get("/",function(req,res) {
res.json({"fulfillmentText": "this is a GET response"});
});

var winston = require("winston");
var logger = winston.createLogger({
level: "debug",
format: winston.format.simple(),
transports: [
new winston.transports.Console()
]
});

app.post("/",function(req,res) {

var intent = req.body.queryResult.intent.displayName; //get intent name


if (intent =="pageGetPages") { //console.log('intent = pageGetPages');
moodle_client.init({
logger:logger,
wwwroot: "http://127.0.0.1",
username: "wsuser",
    password: "MT54659x."
//password: "MT54659x.",
//service: "nodejs_service"
}).then(function(client,k) {
    return do_something(client);

}).catch(function(err) {
    console.log("Unable to initialize the client: " + err);
});

function do_something(client) {

    return client.call({
        wsfunction: "mod_page_get_pages_by_courses",
method: "POST",
args: {
courseids: [2] //first course
}

    }).then(function(users) {

var jsonResponse_fullT_fullM = '{"fulfillmentText":"I can read these pages. Please tell the number of the page or Click the buttons","fulfillmentMessages": [';

j=0;
var cards = "";
var l = users.pages.length;
while (j < l) {

// JO card kep nelkul
var card = '{"card": {"title": "'+users.pages[j].name+'","imageUri": "https://image.flaticon.com/icons/svg/67/67994.svg","buttons": [{"text": "'+(j+1)+'. button","payload":"' +(j+1)+'. page","postback": "'+(j+1)+'. page"}]}}';
if(j==0){var cards = cards + card;} else{var cards = cards + "," + card;}
j++
}

var fulfillM_card_end = "]";
var cards = cards + fulfillM_card_end;

//source SLACK text
var sourcePayload = `,"source": "example.com","payload": {"google": {"expectUserResponse": true,"richResponse": {"items": [{"simpleResponse": {"textToSpeech": "this is a simple response"}}]}},"facebook": {"text": "Hello, Facebook!"},"slack": {"text": "This is a text response for Slack."},"line": {"text": "This is a text response for LINE."},"hangouts": {"text": "This is a text response for hangouts."}}`;   

var followupEventInput = `,"followupEventInput": {"name": "","languageCode": "en-US","parameters": {"param": "paramvalue"}}`;

/*
var sourcePayload = `,
      "source": "example.com",
      "payload": {
        "google": {
          "expectUserResponse": true,
          "richResponse": {
            "items": [
              {
                "simpleResponse": {
                  "textToSpeech": "this is a simple response"
                }
              }
            ]
          }
        },
        "facebook": {
          "text": "Hello, Facebook!"
        },
        "slack": {
          "text": "This is a text response for Slack."
        },
         "line": {
          "text": "This is a text response for LINE."
        },
         "hangouts": {
          "text": "This is a text response for hangouts."
        }
      }`;
      
var outputContexts = `,
      "outputContexts": [
        {
          "name": "",
          "lifespanCount": 5,
          "parameters": {
            "param": "param value"
          }
        }
      ]`;
      
var followupEventInput = `,
      "followupEventInput": {
        "name": "event name",
        "languageCode": "en-US",
        "parameters": {
          "param": "param value"
        }
      }`;
      */
      
var jsonResponse = jsonResponse_fullT_fullM.concat(cards);


var jsonResponseend = "}";
var jsonResponse = jsonResponse + jsonResponseend;
var jsonResponse = JSON.parse(jsonResponse);

/*
{
      "fulfillmentText": "This is a text response",
      "fulfillmentMessages": [
        {
          "card": {
            "title": "card title",
            "subtitle": "card text",
            "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
            "buttons": [
              {
                "text": "button text",
                "postback": "https://assistant.google.com/"
              }
            ]
          }
        }
      ],
      "source": "example.com",
      "payload": {
        "google": {
          "expectUserResponse": true,
          "richResponse": {
            "items": [
              {
                "simpleResponse": {
                  "textToSpeech": "this is a simple response"
                }
              }
            ]
          }
        },
        "facebook": {
          "text": "Hello, Facebook!"
        },
        "slack": {
          "text": "This is a text response for Slack."
        },
         "line": {
          "text": "This is a text response for LINE."
        },
         "hangouts": {
          "text": "This is a text response for hangouts."
        }
      },
      "outputContexts": [
        {
          "name": "projects/${PROJECT_ID}/agent/sessions/${SESSION_ID}/contexts/context name",
          "lifespanCount": 5,
          "parameters": {
            "param": "param value"
          }
        }
      ],
      "followupEventInput": {
        "name": "event name",
        "languageCode": "en-US",
        "parameters": {
          "param": "param value"
        }
      }
    }
*/  

console.log("util jsonResponse: ");
const util = require('util');
console.log(util.inspect(jsonResponse,false,null,true));
console.log('QUERY RESULT page list');
console.log(util.inspect(req.body.queryResult,null,true));

function strip_html_tags(str)
{
if ((str===null) || (str===''))
return false;
else
str = str.toString();
return str.replace(/<[^>]*>/g, '');
}

function find_tts_in_pagename(page_name)
{
var tts_y_n = page_name.indexOf("tts");
return tts_y_n >= 0;
}

res.json(jsonResponse);
//});

        return;
    });
}

} //###### ###### if (intent =="pageGetPages") END


if (intent =="pageRead") {
moodle_client.init({
logger:logger,
wwwroot: "http://127.0.0.1",
username: "wsuser",
    password: "MT54659x."
//password: "MT54659x.",
//service: "nodejs_service"
}).then(function(client,k) {
    return do_something(client);

}).catch(function(err) {
    console.log("Unable to initialize the client: " + err);
});

function do_something(client) {

    return client.call({
        wsfunction: "mod_page_get_pages_by_courses",
method: "POST",
args: {
courseids: [2] //first course
}

    }).then(function(users) {

//var jsonResponse_fullT_fullM = '{"fulfillmentText":"Click the buttons","fulfillmentMessages": [';

var pageidnumpage = req.body.queryResult.parameters['page-id'];
var pageidnum = pageidnumpage.replace(". page","");
var pageidnum = pageidnum-1;

var jsonResponse = {"fulfillmentText": "title: " + users.pages[pageidnum].name + " content: " + strip_html_tags(users.pages[pageidnum].content)};

//var jsonResponse = JSON.parse(jsonResponse);

console.log("util jsonResponse: ");
const util = require('util');
//console.log(util.inspect(jsonResponse,false,null,true));
console.log('QUERY RESULT pageread');
//console.log(util.inspect(req.body.queryResult,null,true));
console.log(util.inspect(req.body.queryResult.parameters['page-id'],null,true));

function strip_html_tags(str)
{
if ((str===null) || (str===''))
return false;
else
str = str.toString();
return str.replace(/<[^>]*>/g, '');
}

function find_tts_in_pagename(page_name)
{
var tts_y_n = page_name.indexOf("tts");
return tts_y_n >= 0;
}

res.json(jsonResponse);
//});

        return;
    });
}

} //###### ###### if (intent =="pageRead") END



}); //app.post END
