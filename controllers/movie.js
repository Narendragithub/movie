const Movie = require('../models/movie');
module.exports.getIdex = (req, res, next) => {
    Movie.fetchAll((movies) => {
        res.render('movie-view/index', {
            movies: movies,
            pageTitle: 'movie-view',
            path: '/'
        });
    });
};

module.exports.getCart = (req,res,next) => {
    Movie.getCart(cart=>{
        Movie.fetchAll(products=>{
            const cartProducts=[];
            for(product of products)
            {   
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData){
                    cartProducts.push({productData:product,qty:cartProductData.qty});
                }
            }
            res.render('movie-view/cart', {
                path: '/cart',
                pageTitle: 'Your Movie',
                products:cartProducts
            });
        });
    });
};

module.exports.postCart = (req,res,next) => {
    const prodId = req.body.productId;
    Movie.findById(prodId,(product)=>{
        Movie.addProduct(prodId,product.price);
    });
    //console.log("product====>"+prodId);
    res.redirect('/cart');

}

module.exports.postCartDeleteProduct = (req,res,next)=>{
    const prodId = req.body.productId;
    Movie.findById(prodId,product=>{
        Movie.deleteProduct(prodId,product.price);
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