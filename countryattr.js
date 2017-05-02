// //start the functions
// //press start
// 	//re-set the clock and start countdown
// 		//randomly choose country from countryArray
// 		var randCountry = country[i];
// 		//pull country data from rest country API for randCountry: country code, capital, flag
// 		var countryCode = "";
// 			//use country code to pull world bank api: region
// 	//display flag, then capital, then region
// //if players guess correct,  win ++, make a new randCounty and Ajax pull until timer runs out

// $(document).ready(function() {

//   var country = [
	// "columbia", "germany", "france", "mexico", "canada", "trinidad", "india", "pakistan", "thailand",
	// "phillipines", "korea", "china", "japan", "switzerland", "brazil", "peru", "bangladesh",
	// "russia", "austriallia",  "argintina", "indonesia", "nigeria", "kenya", 
	// "ethiopa", "egypt", "vietnam", "iran", "turkey", "italy", "tanzania",
	// "myanmar", "spain", "ukraine", "sudan", "uganda", "algeria", "poland",
	// "iraq", "morocco", "uzbekistan", "malaysia", "venezuela", "nepal", 
	// "angola", "ghana", "yemen", "mozambique", "cameroon"
//   ];

// //when player clicks submit button for their guess
//   $(document).on("click", ".submit-button", function() {

//   	if ("#guess-input" !== country){
//   		$("#guess-input").empty();


//   	//if guess is correct, empty the answer, win++, 
//   	//if time left, new country, 
//   	//if no time, display time out and final scores 
//   	}else if ("guess-input" == country){

//     $("#country").empty();
//     win++;
//     pickNextCountry();

//     //if timer runs out
//     	}else if ("timer runs out")

//     var type = $(this).attr("data-type");
//     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + country + "&api_key=dc6zaTOxFJmzC&limit=10";

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//     .done(function(response) {
//       var results = response.data;

//       for (var i = 0; i < results.length; i++) {
//         var countryDiv = $("<div class=\"animal-item\">");

//         var capital = results[i].rating;

//         var  = $("<p>").text("Rating: " + rating);

//         var randCountry = $("<img>");
//         randCountry.attr("src", still);
//         randCountry.attr("data-still", still);
//         randCountry.attr("data-animate", animated);
//         randCountry.addClass("animal-image");

//         countryDiv.append(p);
//         countryDiv.append(randCountry);

//         $("#country").append(countryDiv);
//       }
//     });
//   });



// var country = [
// 	"columbia", "germany", "france", "mexico", "canada", "trinidad", "india", "pakistan", "thailand",
// 	"phillipines", "korea", "china", "japan", "switzerland", "brazil", "peru", "bangladesh",
// 	"russia", "austriallia",  "argintina", "indonesia", "nigeria", "kenya", 
// 	"ethiopa", "egypt", "vietnam", "iran", "turkey", "italy", "tanzania",
// 	"myanmar", "spain", "ukraine", "sudan", "uganda", "algeria", "poland",
// 	"iraq", "morocco", "uzbekistan", "malaysia", "venezuela", "nepal", 
// 	"angola", "ghana", "yemen", "mozambique", "cameroon"
// 	]
// //Search by country full name
// //src = "https://restcountries.eu/rest/v2/name/"+ country [] +"?fullText=true"

// //Country code name:
// // https://restcountries.eu/rest/v2/alpha?codes=chn
// // "name": "China",
// // "alpha3Code": "CHN"


// //RESPONSE EXAMPLE
// // {
// // 	"name": "Colombia",
// // 	"capital": "Bogotá",
// // 	"population": 48759958,
// // 	"timezones": ["UTC-05:00"],
// // 	"currencies": [{
// //     "code": "COP",
// //     "name": "Colombian peso",
// //     "symbol": "$"
// // }],
// //	"languages": [{
// //         "iso639_1": "es",
// //         "iso639_2": "spa",
// //         "name": "Spanish",
// //         "nativeName": "Español"
// //     }],
// //     "flag": "https://restcountries.eu/data/col.svg"
// // }


// //FILTER RESPONSE
// // format: src = "https://restcountries.eu/rest/v2/{service}?fields={field};{field};{field}"
// // example : src = "https://restcountries.eu/rest/v2/all?fields=name;capital;currencies"





//ajax for restcountry
	var country = [
	"columbia", "germany", "france", "mexico", "canada", "trinidad", "india", "pakistan", "thailand",
	"phillipines", "korea", "china", "japan", "switzerland", "brazil", "peru", "bangladesh",
	"russia", "austriallia",  "argintina", "indonesia", "nigeria", "kenya", 
	"ethiopa", "egypt", "vietnam", "iran", "turkey", "italy", "tanzania",
	"myanmar", "spain", "ukraine", "sudan", "uganda", "algeria", "poland",
	"iraq", "morocco", "uzbekistan", "malaysia", "venezuela", "nepal", 
	"angola", "ghana", "yemen", "mozambique", "cameroon"
	];

	var countryCode = "";

	
	var randCountry = country[Math.floor(Math.random()*country.length)];
	console.log(randCountry);

	var queryURLRC = "https://restcountries.eu/rest/v2/name/"+randCountry;
	console.log(queryURLRC);

	 $.ajax({
	 	url: queryURLRC,
	 	method: "GET"
	 }).done(function(response) {

	 	

	 	$("#cImg").attr("src", response[0].flag);
	 	console.log(response[0].flag);
	 		 	//phone country code
	 	
	 	// $("#api").text(response[0].callingCodes);
	 	// console.log(response[0].callingCodes);
	 	
	 	$("#api").append("<p>Capital: "+ response[0].capital + "</p>");
	 	console.log(response[0].capital);
	 	
	 	//pop is an intg
	 	$("#api").append("<p>Poulation: "+ response[0].population+"</p>");
	 	console.log(response[0].population);
	 	//land area in sqKm and sqMi
	 	$("#api").append("<p>Land Area: "+
	 		(Math.floor((response[0].area)*0.386102)) + " (Miles Sq.)");
	 	console.log(response[0].area);

	 	//get 3letter country code from response 
	 	// change variable cC to use for WBank ajax
	 	countryCode = (response[0].alpha2Code);
	 	console.log(response[0].alpha2Code);
	 	console.log(countryCode);
	
//ajax for World Bank
			var queryURLWB = "http://api.worldbank.org/v2/countries/"+ countryCode +"?format=json";
			console.log(queryURLWB);

			$.ajax({
				url: queryURLWB,
				method: "GET"
			}).done(function(response){
				$("#api").append(response[1][0].region.value);
				console.log(response[1][0].region.value);

			});
	 });

 // 