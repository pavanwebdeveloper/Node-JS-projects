var express = require('express'), 
    bodyParser =require('body-parser'),
    mongoose = require('mongoose');

var app = express();

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser({extended : true }));

var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body: String,
    created: {type:Date, default: Date.now}
});

var Blog=mongoose.model("Blog",blogSchema);

// Restful Routes
//index route
app.get('/',function(req,res){
    res.redirect("/blogs");
});

app.get('/blogs',function(req,res){
    Blog.find({},function(err,blogs){
        if(err) {
            console.log(err);
        }
        else {
            res.render('index',{blogs: blogs});
        }
    });
});

;




var x =5;
function b(){
    console.log(x);
}
function a() {
    var x =5;
    b();
}

app.listen(2000,'localhost',function(){
    console.log('server is running');
});