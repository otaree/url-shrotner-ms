const expect = require('expect');
const request = require('supertest');

const { URL } = require('./../models/url');
const { app } = require('./../server');

beforeEach((done) => {
    URL.remove({}).then(() => {
        done();
    });
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