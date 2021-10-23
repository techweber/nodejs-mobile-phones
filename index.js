var express = require('express');
var app = new express();
var request = require('request');
var server_port = 4000;

var api_url = "https://api-mobilespecs.azharimm.site/v2/latest";

app.listen(server_port, function(){
	console.log("Server started at " + server_port);
});

app.get("/",function(expReq, expRes){

	request({
		uri: api_url,
		method: 'GET'
	},
		function(err,res,body){
			var data = JSON.parse(body);

			var finalResponse = `<table><thead>
								<th>Phone Name</th>
								<th>Image</th>
								</thead><tbody>`;

			data = data.data.phones;

			for ( var rec in data){
					finalResponse += `<tr>
									  <td>${data[rec].phone_name}</td>
									  <td><img src="${data[rec].image}" /></td>
									  </tr>`;
			}

			finalResponse += `</tbody></table></body></html>`;
			expRes.send(finalResponse);

		}
	)



});

