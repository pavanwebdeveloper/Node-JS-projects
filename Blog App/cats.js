var express= require('express'),
    mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/cat_app');

var catSchema=new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat= mongoose.model("Cat", catSchema);

// var jinx = new Cat({name: "jinxy", age: "8",temperament: "evil"
// });
// jinx.save(function(err, cat){
//     if(err){
//         console.log("Something Went wrong!")
//     }
//     else{
//         console.log("we saved the record successfully!!", cat)
//     }
// });

Cat.create({
    name: "snow",
    age: 5,
    temperament: "happy"},
    function(err, cat){
        if(err){
            console.log("OH no Error!!")
        }
        else{
            console.log("added new cat successfully");
            console.log(cat);
        }
})
Cat.find({},function(err,cats){
    if (err) {
        console.log("Oh no! Something failed");
    }
    else {

        console.log(cats);
    }

});

