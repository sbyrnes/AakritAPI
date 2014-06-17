/** Aakrit REST API response server
 *  Sean Byrnes
 *  Copyright 2014, Fogstack
 */

// Custom modules
var httputils = require('./httputils');

var restify = require('restify');

console.log('Starting server...');

console.time('Server-Start');

// ================= AAKRIT RESPONSES =================== //
var responses = new Array();
responses[0] = "Get the ball and look for number 7.";
responses[1] = "Productive day: Check.";
responses[2] = "Pirlo has to be one of the most gifted players to ever kick a football. ";
responses[3] = "I was thinking about adopting a kitten... Hmmm";
responses[4] = "Finally!";

// ================= SERVER START =================== //

var server = restify.createServer();
server.use(restify.CORS());

//============================================================================= //
//Chat APIS
server.get('/chat', function (req, res, next) {
	var chatRequest = httputils.extractURLData(req.url);
	buildResponse(chatRequest, res);
	return next();
});
server.post('/chat', function(req, res, next) {
	httputils.extractPostData(req,
							  function(chatRequest)
							  {
									buildResponse(chatRequest, res);
							  });
	return next();
});

//Process
function buildResponse(chatRequest, res)
{
	res.json(200, {response: responses[Math.floor(Math.random() * responses.length)]});
}

//================= SERVER CONFIG =================== //

server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
});

//================= SERVER END =================== //
console.timeEnd('Server-Start');

//process.on('SIGKILL', function () {
//console.log('Goodbye');
//});
