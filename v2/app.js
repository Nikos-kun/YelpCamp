var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");



// mongoose.connect('mongodb+srv://alknetor:al23377837!@cluster0-7zxgm.mongodb.net/test?retryWrites=true', {
// 	useNewUrlParser: true,
// 	useCreateIndex: true
// }).then(() => {
// 	console.log('Connected to DB!');
// }).catch(err => {
// 	console.log('ERROR:', err.message);
// });

// app.listen(3000, () => {
// 	console.log('Server is listening on port 3000');
// });


mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

//==========================================================================================================================
// SCHEMA SETUP
//==========================================================================================================================
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill",
//     image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
//     description: "This is a huge granite hill, no bathrooms. No WebAuthnAssertion. Good luck!"

// }, function (err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGROUND: ");
//         console.log(campground);
//     }
// });

// var campgrounds = [{
//         name: "Salmon Creek",
//         image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"
//     },
//     {
//         name: "Granite Hill",
//         image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"
//     },
//     {
//         name: "Mountain Goat's Rest",
//         image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"
//     }
// ];



//==========================================================================================================================
// ROUTES
//==========================================================================================================================
app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                campgrounds: allCampgrounds
            });
        }
    })
});

app.post("/campgrounds", function (req, res) {
    // get data from and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: desc
    }
    // Create a new campground and save to DB
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    })
});

// NEW - Show from to create new campground
app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});

// SHOW -  Shows more info about one campground
app.get("/campgrounds/:id", function (req, res) {
    // Find the campground with provided ID
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // Render show template with that campground
            res.render("show", {campground: foundCampground});

        }
    });

});



//==========================================================================================================================
// Listen to the right port
//==========================================================================================================================
app.listen(3000, function () {
    console.log("YelpCamp Server has started!");
});