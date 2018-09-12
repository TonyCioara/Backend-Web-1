
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const should = chai.should();
const Review = require('../models/review');

chai.use(chaiHttp);

describe("Reviews", () => {

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
})