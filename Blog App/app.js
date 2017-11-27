var express = require('express'),
     bodyParser = require('body-parser'),
     mongoose = require('mongoose'),
     app = express(),
     methodOverride =require('method-override');
//connect to mongoose
mongoose.connect("mongodb://localhost/restful_blog_app");


//setups for xpressf
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//create blog app schema 
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type : Date, default : Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);


// Blog.create({
//     title : "Test Blog",
//     image : " https://images.unsplash.com/photo-1508636925297-04c8f048798b?auto=format&fit=crop&w=634&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
//     body : "The Best Dog in the World !!! Blah Blah......"
// });



//RESTFUL Routes

//index Route
app.get('/',function(req,res){
    res.redirect('/blogs')
});

app.get('/blogs', function(req,res){
    Blog.find(function(err,blogs){
        if (err) {
            console.log(err)
        }
        else {
            res.render('index',{blogs : blogs })
        }
    })
    
});


//new route
app.get('/blogs/new', function(req,res){
    res.render('new')
});


//create route
app.post('/blogs',function(req,res){
    //create blog
    Blog.create(req.body.blog, function(err,newBlog){
        if(err) {
            res.render('new');
        }
        else {
            //redirect
            res.redirect("/blogs")  
        }
    });
});


//show Route
app.get('/blogs/:id', function(req,res){
     Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render('show',{blog: foundBlog});
        }
     });
});


//Edit Route
app.get('/blogs/:id/edit',function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            console.log(err);
            res.redirect('/blogs')
        }
        else{
            res.render('edit',{blog : foundBlog});
        }
    });
});

//Update Route
app.put('/blogs/:id',function(req,res){
     Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err){
            res.redirect('/blogs');
        }
        else {
            res.redirect('/blogs/'+ req.params.id);
        }
     });
});


//Delete Route
app.delete('/blogs/:id', function (req,res){
        Blog.findByIdAndRemove(req.params.id,function(err){
            if(err){
                res.redirect('/blogs')
            }
            else {
                res.redirect('/blogs');
            }
        })
});




app.listen(5000,'localhost',function(){
    console.log("Server has started!!")
});


    