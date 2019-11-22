const fs = require('fs');
const path = require('path');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'movie.json'
);
const getMoviesFromFile = cb => {

    fs.readFile(p,(err, filecontent) => {
        if (err) {
            cb([]);
        }
        else {
            cb(JSON.parse(filecontent));
        }

    });

}
module.exports = class Movie {
    static addMovie(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
               
                if(fileContent !='')
                {
                    cart = JSON.parse(fileContent);
                }
                  
            }
            // Analyze the cart => Find existing product
            const existingMovieIndex = cart.products.findIndex(
                prod => prod.id === id
            );
            const existingMovie = cart.products[existingMovieIndex];
            let updatedMovie;
            // Add new product/ increase quantity
            if (existingMovie) {
                updatedMovie = { ...existingMovie };
                updatedMovie.qty = updatedMovie.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingMovieIndex] = updatedMovie;
            } else {
                updatedMovie = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedMovie];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static deleteMovie(id,productPrice){
        fs.readFile(p,(err,fileContent)=>{
            if(err)
            {
                return;
            }

            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            if(!product)
            {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
                prod => prod.id !== id
            );
            updatedCart.totalPrice = updatedCart.totalPrice  - productPrice * productQty;
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }

    static getCart(cb)
    {
        fs.readFile(p, (err, fileContent) => {
            const cart= JSON.parse(fileContent);
            if(err)
            {
                cb(null);
            }
            else
            {
                cb(cart);
            }
        });
    }

    static fetchAll(cb) {
        getMoviesFromFile(cb);
    }
};