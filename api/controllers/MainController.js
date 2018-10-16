const request = require('request');
/**
 * MainController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	'mainAction': function(req, res){
		request.get({
  		url: "http://api.openweathermap.org/data/2.5/weather?q=London&APPID=dc525dad10f9e7cdd65f4f2fb65edfa2"
		}, function(error, response, body) {
  		if (error) {
    		sails.log.error(error);
  		}
 		else {
	 			body = JSON.parse(body);
	    		const description = body["weather"][0]["description"];
	   			const temperature = body["main"]["temp"];
	   			const humidity = body["main"]["humidity"];
	   			var object = {
	   				description,
	   				temperature,
	   				humidity
	   			}
	   			res.json(object);	
	   			return;
	  		}
		});
	}, 

	'history': function(req, res){
		const city_id = req.param('city_id');
		request.get({
  		url: `http://api.openweathermap.org/data/2.5/forecast?id=${city_id}&appid=dc525dad10f9e7cdd65f4f2fb65edfa2`
		}, function(error, response, body) {
  		if (error) {
    		sails.log.error(error);
  		}
 		else {
 				let response_object = JSON.parse(response.body);
 				let data = response_object.list;
 				let city_name = response_object.city.name; 
 				let obj = {
 					data,
 					city_name
 				}
				return res.view('history', obj);
	 			
	  		}
		});	
		
	}  

};

