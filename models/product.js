const fs = require("fs");
const path = require("path");
const uuidv4 = require('uuid/v4');

const rootPath = require('../utils/path');

const getProductsFromFile = (cb)=>{
    const p = path.join(rootPath, 'data', 'products.json');
    fs.readFile(p,"utf8", (err,data)=>{
        if(err){
            cb([]);
        }

        cb(data?JSON.parse(data):[]);
    });
}

class Product {
    constructor(title){
        this.title = title;
        this.id = uuidv4();
    }

    save(){
        const p = path.join(rootPath, 'data', 'products.json');
        getProductsFromFile((products)=>{
            products.push(this);

            fs.writeFile(p, JSON.stringify(products),(err)=>{
                console.log(err);
            });
        });        
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }

    static findById(productId, cb){
        getProductsFromFile(products=>{
            const product = products.find(p => p.id==productId);
            cb(product);
        });
    }
}


module.exports = Product;