var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var connectionstring = "[REDACTED URL]";
mongoose.connect(connectionstring, { useMongoClient: true });

mongoose.Promise = global.Promise;

var studentSchema = new mongoose.Schema({
    buffID: String,
    firstName: String,
    lastName: String
});

var Student = mongoose.model('StudentData', studentSchema);

router.get('/student/add/:firstname/:lastname/:buffID', function(req, res, next) {
    
    var rand = new Student(
        { 
            buffID: req.params.buffID,
            firstName: req.params.firstname,
            lastName: req.params.lastname
        }
    );
    rand.save(function (err) {
        if (err) {
         console.log(err);
         res.send('There was an error.');
        } else {
             //var message = req.params.firstname + ' ' + req.params.lastname + ' has been saved to the database with the Buff ID ' + req.params.buffID + '.';
             //console.log(message);        
            
                res.render('addStudent', 
                    {
                        firstname: req.params.firstname,
                        lastname:  req.params.lastname,
                        buffID:    req.params.buffID
                    }
                );
            }
    });    
});

router.delete('/student/remove/', function(req, res, next) {
    res.render('removeStudent', { title: 'Remove Student' });
});

router.get('/Test', function(req, res, next) {
   res.render('test', { title: 'Test Page' }); 
});

router.get('/HomeTest', function(req,res,next) {
    res.render('homeTest',{ title: 'Test Home Page' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});
module.exports = router;
