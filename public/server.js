'use strict'
//first we import our dependencies…
var express = require('express');
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('../model/comments');

//dbconfg cloud datastore
// Imports the Google Cloud client library
var Datastore = require('@google-cloud/datastore');

// Your Google Cloud Platform project ID
var projectId = 'massive-graph-195401';

var storage = Datastore({
    keyFilename: './Project-a3894419e0fb.json'
  });

// The kind for the new entity
var kind = 'UserInfo';

//db config mongodb
//mongoose.connect('mongodb://admin:1234@ds117758.mlab.com:17758/dbadmin');

//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

//adding the /comments route to our /api router
router.route('/comments')
    
    //retrieve all comments from the database
    .get(function(req, res) {
        //looks at our Comment Schema
        // Comment.find(function(err, comments) {
        //     if (err)
        //     res.send(err);
        //     //responds with a json object of our database comments.
        //     res.json(comments)
        // });
        var name =  'email';
        const taskKey = storage.key(['UserInfo', name]);

        storage.get(taskKey).then(comments => {
            //console.log(comments);
            res.json(comments);
          });
    })
    
    //post new comment to the database
    .post(function(req, res) {
        //console.log(`Saved ${req.body.email}: ${req.body.uname}`);
        // The name/ID for the new entity
        var name =  Date.now();
        // The Cloud Datastore key for the new entity
        var taskKey = storage.key([kind, name]);
        //var comment = new Comment();
        //body parser lets us use the req.body
        //comment.uname = req.body.uname;
        //comment.email = req.body.email;
        // Prepares the new entity
        var task = {
            key: taskKey,
            data: {
            uname: req.body.uname,
            email: req.body.email
            },
        };
        storage
            .save(task)
            .then(() => {
                console.log(`Saved ${task.data.uname}: ${task.data.email}`);
                res.json({ message: 'Comment successfully added!' });
            })
            .catch(err => {
                console.error('ERROR:', err);
                res.send(err);
            });
        // comment.save(function(err) {
        //     if (err)
        //     res.send(err);
        //     res.json({ message: 'Comment successfully added!' });
        // });
    });

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});