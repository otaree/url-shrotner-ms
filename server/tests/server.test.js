const expect = require('expect');
const request = require('supertest');

const { URL } = require('./../models/url');
const { app } = require('./../server');
const { generateShort } = require('./../utils/urlutils');

var shortUrl = generateShort();

var seedUrls = [{
    original_url: 'facebook.com',
    short_url: shortUrl
}];

beforeEach((done) => {
    URL.remove({}).then(() => {
        return URL.insertMany(seedUrls);
    }).then(() => {
        done();
    }).catch((e) => done(e));
});

describe('GET /new/*', () => {
    it('should return a object with original url and short url', (done) => {
        var url = 'https://www.google.com';
        request(app)
            .get(`/new/${url}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.original_url).toBe(url);
                expect(res.body.short_url).toBeTruthy();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                URL.findOne({ original_url: 'google.com' }).then((url) => {
                    expect(url).toBeTruthy();
                    done();
                }).catch((e) => {
                    done(e);
                });

            });
    });

    it('should return a error for invalid url', (done) => {
        var url = 'htt:/google.com';

        request(app)
            .get(`/new/${url}`)
            .expect(400)
            .end(done);
    });
});

describe('GET /*', () => {
    it('should redirect to site from the database', (done) => {
        request(app)
            .get(`/${shortUrl}`)
            .expect(301)
            .end(done);
    });

    it('should fail to redirect', (done) => {
        request(app)
            .get('/dafdfaewrwr12321')
            .expect(400)
            .end(done);
    });
});