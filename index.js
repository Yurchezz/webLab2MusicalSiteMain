let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');

let app = express();

let apiRoutes = require("./api-routes");

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/lab11RESTwithMango', {
    useNewUrlParser:true
});
var db = mongoose.connection;
if(!db){
    console.log("Error connection db");
}else{
    console.log("Db YURCHEZZ conncected successfuly");
}
var port = process.env.PORT||8080;

app.get('/',(req,res) => res.end("Hello World with Express and Nodemon"));
app.use('/api',apiRoutes);
app.listen(port, function(){
    console.log("Running RestHUB on port " + port);
});