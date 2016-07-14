var express = require('express');
var app = express();

var pageLoadCount = 0;

app.get('/', function (req, res) {
  pageLoadCount++;
  
  res.send('this server been loaded ' + pageLoadCount + ' time(s)');
});

app.get('/count', function (req, res) {
  res.append('Content-Type','text/json')
  res.json({count: pageLoadCount});
});

app.get('/job', function (req, res) {
    pageLoadCount++;  // count up to 5 times then the server will say yes to a job
    var job = true;
    var url = '';

    if (pageLoadCount == 5) {
        job = true;
        url = 'http://localhost:3000/workToDo'; 
    } else {
        job = false;
        url = '';
    }
    res.append('Content-Type', 'text/json')
    res.json({ job: job, url: url });
});

app.get('/reset', function (req, res) {
    pageLoadCount = 0;
    res.send('server reset.');
});

app.get('/workToDo', function (req, res) {
    var countForFun = 0;
    for (var i = 0; i < 10000000000; i++) { countForFun += 10; }   // just to stall the server to load the webpage
    res.send('Job loaded!  Let get to work!  The server counted up to ' + countForFun);

});

app.listen(3000, function() { 
   console.log('Server running at port 3000');
});
