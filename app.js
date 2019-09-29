/** INBUILT IMPORTS */
const express  = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const expressHbs = require("express-handlebars");
/** CUSTOM IMPORTS */
const adminRoutes =require("./routes/admin");
const shopRoutes = require("./routes/shop");
const controller404 = require("./controllers/404Controller"); 


/** TEMPLATING ENGINE MIDDLEWARES */
app.engine('hbs', expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout:'main',
    extname: 'hbs'
}));
app.set('view engine','hbs');
app.set('views','views');


/** STATIC/PUBLIC FILES MIDDLEWARE */
/** any kind of file requests are directly searched in public folder 
 * if a match is found in the public folder it returns that file
 * thats why we just need /css/main.css instead of public/css/main.css
 */
app.use(express.static(path.join(__dirname, "public")));


/** REQUEST BODY PARSER MIDDLEWARE */
// this middleware parses the req body for us and internally calls next for us to move to
app.use(bodyParser.urlencoded({ extended: true }));

/** ROUTES MIDDLEWARE */
//filtering mechanism. it matches only /admin/route now
app.use('/admin',adminRoutes);
app.use(shopRoutes);
// if no route matches
app.use("/", controller404.notFound404)



app.listen(3000);






/** ------------------------------------------------------------------*/


/** THEORY OF MIDDLEWARES */

//middlewares execute based on the order defined
// if next is used it passes on to the next middleware
// if response is used it stops there itself in that middleware

//middleware 1
// req ====> middleware ===>response
// all requests go through here
// app.use((req, res, next)=>{
//     console.log("In the middleware 1");
    
    // if we are not sending any response here then use 
    // next=> as it allows the request to travel to next middleware
    // if you dont run next here, it will be stuck in this middle ware 
    // and the browser keeps loading
//     next();
// });

//middleware 2
// app.use((req, res, next)=>{
//     console.log("In the middleware 2");
//     // we are sending a request here so we don't need next here
//     res.send("<h1>Hello </h1>");
// });

// next is only used if we want to execute the next middleware.. simple!!


/** ------------------------------------------------------------------*/



