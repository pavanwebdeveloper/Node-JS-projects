var express    = require('express'),
    mongoose   = require('mongoose'),
    bodyParser = require("body-parser"),
    app        = express();

app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/yelp_camp");

//Schema Setup
var campgroundsSchema= new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("campground", campgroundsSchema);

// Campground.create
// (
//     {name:"Granite Hill", image:"http://www.photosforclass.com/download/13950231147",
// description : "This is a new Camp, awesome camping site!!!"}, 
//     function(err, campground)
//         {
//         if(err) {
//             console.log("Error in adding a Campground", err);
//         }
//         else {
//             console.log("added new Campgroung", campground);
//         }
//     }
// );

app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req,res){
    res.render('landing');
});

// var campgrounds=[
//     {name:"Salmon Creek", image:"http://www.photosforclass.com/download/13950231147"},
//     {name:"Granite Hill", image:"http://www.photosforclass.com/download/13950231147"},
//     {name:"Salmon Creek", image:"http://www.photosforclass.com/download/13950231147"},
//     {name:"Granite Hill", image:"http://www.photosforclass.com/download/13950231147"},
//     {name:"Himalayas Goat Rest", image:"http://www.photosforclass.com/download/32005759584"},
//     {name:"Salmon Creek", image:"http://www.photosforclass.com/download/13950231147"},
//     {name:"Granite Hill", image:"http://www.photosforclass.com/download/13950231147"},
//     {name:"Salmon Creek", image:"http://www.photosforclass.com/download/13950231147"}
    
// ];

//Index Route - Get all Campgrounds.
app.get("/index", function(req,res){
    Campground.find({},function(err, allcampgrounds){
        if (err) {
            console.log(err);
        }
        else {
            res.render('index',{campgrounds:allcampgrounds}   )
        }

    })
//    res.render('campgrounds',{campgrounds:campgrounds});
});

//Create route - add a new Campground 
app.post("/index",function(req,res){
   //get data from Form and add ot Campgrounds array 
    var name =req.body.name;
    var image = req.body.image;
    var newCampGround ={name: name , image: image, description : desc};
    Campground.create(newCampGround, function(err, newcamp){
        if(err){
            console.log(err);
        }
        else{
            //also redirect back to camp grounds page
            res.redirect('/index');
        
    }

    });
    //  campgrounds.push(newCampGround);
    
   
});


//New Route -Show form to create new Camp ground.
app.get("/index/new",function(req,res){
    res.render('new');
});

//show route
app.get("/index/:id",function(req,res){
    //Find the campground using the id
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err){    
            console.log(err)
        }
        else {
            // Show the details of the campground selected. 
            res.render("show", {campground:foundCampground});
        }
    }); 
});


app.listen(8080,'127.0.0.1', function(){
    console.log("Yelp Camp server started!!");
});