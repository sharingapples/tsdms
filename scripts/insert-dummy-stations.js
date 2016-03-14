var http = require('http');

var start = 42000;
var count = 10000;
for(var idx=start; idx<(start+count); idx++) {
  var postData = JSON.stringify({
    identifier: idx,
    name: 'Dummy Station ' + idx
  });

  var options = {
    hostname: 'localhost',
    port: 1337,
    path: '/ajax/station',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  }
  try {
    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        console.log('Response: chunk');
      });
    });

    req.write(postData);
    req.end();
  } catch(er) {
    console.error(er);
  }
}
