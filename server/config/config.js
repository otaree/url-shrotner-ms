var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.MONGODB_URI = 'mongodb://localhost/url-short';
} else if (env === 'test') {
    process.env.MONGODB_URI = 'mongodb://localhost/url-short-test';   
}