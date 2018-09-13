
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const should = chai.should();
const Review = require('../models/review');

chai.use(chaiHttp);

const sampleReview = {
    "reviewTitle": "Super Sweet Review",
    "title": "La La Land",
    "description": "A great review of a lovely movie",
    "rating": 4
}

describe("Reviews", () => {

    after(() => {
        Review.deleteMany({reviewTitle: 'Super Sweet Review'}).exec((err, reviews) => {
            console.log(reviews);
            reviews.remove();
        });
    });

    // Test Index
    it( 'Should get ALL reviews on /GET', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // Test new
    it('should display new form on /reviews/new GET', (done) => {
        chai.request(server)
            .get('/reviews/new')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // Test show
    it('should show a single review on /reviews/<id> GET', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(server)
                .get(`/reviews/${data._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });
    });

    // Test edit
    it('should display edit form on /reviews/<id>/edit GET', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(server)
                .get(`/reviews/${data._id}/edit`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });
    });

    // Test post
    it('should create a single review on /reviews POST', (done) => {
        console.log(sampleReview)
        chai.request(server)
            .post('/reviews')
            .send(sampleReview)
            .end((err, res) => {
                if (err) {console.log(`ERROR: ${err}`)};
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // Test update
    it('should update a single review on /reviews/<id>/edit PUT', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(server)
                .put(`/reviews/${data._id}?_method=PUT`)
                .send({'title': 'Updating the title'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });
    });

    // Test delete
    it('should delete a single review on /reviews/<id> DELETE', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(server)
                .delete(`/reviews/${data._id}?_method_DELETE`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });
    });


});