const Movie = require('../models/movie');
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}

function timeto24(time) {
    //console.log(time);
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    if (hours < 12) hours = hours + 12;
    if (hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return sHours + ":" + sMinutes +":"+"00";
}
module.exports.getIdex = (req, res, next) => {
    Movie.fetchAll((movies) => {
        var moviesData = [];
        if(req.query.genre)
        {

            for(movie of movies) 
            {
                var genres = movie.genres;
                var showings = movie.showings;
                console.log(timeto24(req.query.time));
                if (genres.includes(capitalize(req.query.genre)) && showings.includes(capitalize(req.query.time+":00"))) 
                {
                    moviesData.push(movie);
                }
            } 
        }
        else
        {
            moviesData=movies;
        }
        
        res.render('movie-view/index', {
            movies: moviesData,
            pageTitle: 'Movie List',
            path: '/'
        });
    });
};

module.exports.searchMovies = (req,res,next) => {
   Movie.fetchAll(movies=>{
            const moviesData=[];
            for(movie of movies)
            {   
                if(movie.genre.includes("Animation"))
                {
                    moviesData.push(moviesData);
                }
            }
            res.render('movie-view/index', {
                path: '/cart',
                pageTitle: 'Movie',
                movies:moviesData
            });
        });
    
};

module.exports.postCart = (req,res,next) => {
    const prodId = req.body.movieId;
    Movie.findById(prodId,(movie)=>{
        Movie.addmovie(prodId,movie.price);
    });
    //console.log("movie====>"+prodId);
    res.redirect('/cart');

}

module.exports.postCartDeletemovie = (req,res,next)=>{
    const prodId = req.body.movieId;
    Movie.findById(prodId,movie=>{
        Movie.deletemovie(prodId,movie.price);
        res.redirect('/cart');

    })



}

module.exports.getOrders = (req, res, next) => {
    res.render('movie-view/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });

};

module.exports.getCheckout =  (req,res,next)=>{
    res.render('movie-view/checkout',{
        path:'/checkout',
        pageTitle:'Checkout'
    });
};