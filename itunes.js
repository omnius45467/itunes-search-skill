var itunes = require('itunes-search');
 
// http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#searching 
// // options example: 
// // options = { 
// //    media: "movie" // options are: podcast, music, musicVideo, audiobook, shortFilm, tvShow, software, ebook, all 
// //  , entity: "movie" 
// //  , attribute: "movie" 
// //  , limit: 50 
// //  , explicit: "No" // explicit material 
// // } 
var options = {
	media: "tvShow",
	entity: "tvSeason",
	limit: 25
};
//          
itunes.search( "star trek", options,
	function(response, err) {
    if (err) {
		console.log(err);
	} else {
		console.log(response);
		// console.log(response.results[0]);
	}  
});
