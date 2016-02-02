/** 
 *Including all the module dependencies
 */

var express= require('express');
var bodyParser= require('body-parser');
var path= require('path');
var request = require('request');
var cheerio = require('cheerio');
var ejs= require('ejs');
var app= express();
var urls24= [], urls7= [];
var totalIssues=0, issuesIn7Days=0, issuesIn24Hours=0, issuesRest=0;
var link='', totalNumber='';

//The server will look for static files like html, css, images and javascript files.
//These files will be placed in a folder called public
app.use(express.static(__dirname + "/public"));
//Returns middleware
//req.body is generated
var urlencodedParser=  bodyParser.urlencoded({ extended: false });

//Routes HTTP GET request to the specified path- will match request to index.html
//Callback function is used as the second parameter
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

//Routes HTTP POST requests to the specified path- will match to /add
//POST /add gets urlencoded bodies
app.post('/add', urlencodedParser,  function(req, res){
	var url= req.body.url;

	//link is the url we will scrape from
	link= url + '/issues';

    /**
     *This the structure of our request call.
     *First parameter is the url
     *Callback function takes three parameters: an error, response status code and the html.
     */
	request(link, function(error, response, html){

	//Checking if there is no error, 200 is the HTTP status for OK	
	if(!error && response.statusCode == 200){

		//cheerio library gives us JQuery functionality
		var $ =cheerio.load(html);

		//Initializing to an empty array
		urls7=[], urls24=[];

		//Initializing to an empty string
		totalNumber='';

		//Using a unique class as a starting point for the total number of opened issues
		$('a.btn-link.selected').filter(function(){
			var number=$(this).text();
			number= number.trim();
			var index= number.indexOf('O');
			totalNumber= number.substr(0, index-1);
		});

		//Using the unique class as a starting point for the different opened issues
		$('a.tooltipped.tooltipped-s.muted-link').each(function(i, element){

			//Storing the filtered data into a variable
			//In the examining DOM, we noticed that the date of issues rested in the previous tag of the 'a' tag
			var issueLink= $(this).prev().text();

            //dateOfEachLink is the date of each issue opened in the form(Month Day, Year)
			var dateOfEachLink= new Date(issueLink);

			//currentDate is the current date of the system
			var currentDate= new Date();
			var month = new Array();

			//Getting the name of each month as a string
			month[0] = "Jan";
			month[1] = "Feb";
			month[2] = "Mar";
			month[3] = "Apr";
			month[4] = "May";
			month[5] = "Jun";
			month[6] = "Jul";
			month[7] = "Aug";
			month[8] = "Sep";
			month[9] = "Oct";
			month[10] = "Nov";
			month[11] = "Dec";

			var monthString = month[currentDate.getMonth()]; 
			var currentDate= monthString +" " + currentDate.getDate() +", " + currentDate.getFullYear();

			//Getting the currentDate in the form (Month Day, Year)
			var CurrentDateInString= new Date(currentDate);

			//Calculating the time difference in days(between today's date and the date of the issue opened) 

			/**
			 *If the time difference is less than or equal to 24 hrs, 
			 *then the issue is opened in the last 24 hrs
			 */
			if(Math.abs(CurrentDateInString.getTime()-dateOfEachLink.getTime())/(1000 * 3600 ) <= 24){
				urls24.push(issueLink);
			}

			/**
			 *If the time difference is greater than 24 hrs and less than or equal to 168 hrs(7 days), 
			 *then the issue is opened more than 24 hours ago but less than 7 days ago
			 */
			else if(Math.abs(CurrentDateInString.getTime()-dateOfEachLink.getTime())/(1000 * 3600 ) > 24 && Math.abs(CurrentDateInString.getTime()-dateOfEachLink.getTime())/(1000 * 3600 ) <= 168 ){
				urls7.push(issueLink);
			}


		});


	        //Putting the value of the number of different issues into their respective variables
			totalIssues = parseInt(totalNumber);
			issuesIn24Hours = urls24.length;
			issuesIn7Days = urls7.length;
			issuesRest =  (parseInt(totalNumber))-(urls7.length)-(urls24.length);

    }
    else if(error){
		console.log("Error! Wrong input link.");
	}
    //redirect the request to our current working directory of our application
	

	//Setting EJS as the view engine
	app.set('view engine', 'ejs');

	//Join the current folder with the folder views which contains index.ejs
	app.set('views', path.join(__dirname, 'views'));
		
		/**
		 *res.sender() is used to send a view to the user
		 *res.sender() will look into the views folder for the view
		 */
		res.render('index', {
			data1: totalIssues,
			data2: issuesIn24Hours,
			data3: issuesIn7Days,
			data4: issuesRest		
		});

	});

});


//Invoking the app.listen() method
//Listens for connections on the port 8081
app.listen(8081, function(){
	console.log("Ready on port 8081...")
});





