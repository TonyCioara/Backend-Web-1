const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    reviewTitle: String,
    rating: Number
});

const bodyParser = require('body-parser');

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            console.log(reviews)
            res.render('reviews-index', {reviews: reviews});
        })
        .catch(err => {
            console.log('ERROR: ', err);
        });
});

app.get("/reviews/new", (req, res) => {
    res.render('reviews-new', {});
});

app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', { review: review})
    }).catch((err) => {
        console.log(err.message);
    });
});

app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect(`/reviews/${review._id}`);
    }).catch((err) => {
        console.log(err.message);
    });
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
