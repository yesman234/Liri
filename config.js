var http = require("https");

var options = {
  "method": "GET",
  "hostname": "api.themoviedb.org",
  "port": null,
  "path": "/3/keyword/1?api_key=096d6bc187836f4e50c4241ee0d9e169",
  "headers": {}
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write("{}");
req.end();