const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
var exphbs = require('express-handlebars');


mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });

// const Review = require('./models/review')


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

const Review = require('./models/review');
const reviews = require('./controllers/reviews')(app);

app.get('/', (req, res) => {
    Review.find()
    .then(reviews => {
        res.render('reviews-index', {reviews: reviews});
    })
    .catch(err => {
        console.log('ERROR: ', err);
    })
})


app.listen(3000, () => {
    console.log('App listening on port 3000!');
})
