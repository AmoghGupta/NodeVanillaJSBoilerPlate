const Product = require("../models/product");

getAddProduct = (req, res, next)=>{
    res.render('addProduct',
    {
        pageTitle: 'Add Product Page',
        addProductPage: true
    }
    );
    // res.sendFile(path.join(rootDir, "views", "addProduct.html"));
}



postAddProduct = (req, res, next)=>{
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
}

getProducts = (req, res, next)=>{
    Product.fetchAll((products)=>{
        res.render('shop',
        {
            products:products,
            pageTitle: 'Shop Page',
            shopPage: true
        }
        );
    });
    
    // res.sendFile(path.join(rootDir, "views", "shop.html"));
}


getProductDetails = (req, res, next)=>{
    //reading from URL params
   const prodId = req.params.productId;
   Product.findById(prodId, (product)=>{
        console.log("Product details: "+ product.title);
        res.render('product-details',
        {
            product:product,
            pageTitle: 'Product Details Page',
            detailsPage: true
        }
        );
   })
}

exports.getProducts =getProducts;
exports.getAddProduct = getAddProduct;
exports.postAddProduct = postAddProduct;
exports.getProductDetails =getProductDetails;