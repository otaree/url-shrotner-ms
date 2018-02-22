require('./config/config');

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const {
    mongoose
} = require('./db/mongoose');
const {
    URL
} = require('./models/url');
const {
    checkUrl,
    generateShort
} = require('./utils/urlutils');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('/index.html');
});

app.get('/new/*', async (req, res) => {

    var url = checkUrl(req.url);
    if (!url) {
        return res.status(400).send({
            error: "Wrong url format, make sure you have a valid protocol and real site."
        });
    } 

    try {
        var checkURL = await URL.findOne({ "original_url": url });
        if (checkURL) {
            return res.send({
                "original_url": req.url.replace('/new/', ''),
                "short_url": req.headers.host + '/' + checkURL.short_url
            });
        }
    
        var newUrl = new URL({
            "original_url": url,
            "short_url": generateShort()
        });
    
        await newUrl.save();
    
        res.send({
            "original_url": req.url.replace('/new/', ''),
            "short_url": req.headers.host + '/' + newUrl.short_url
        });
        
    } catch (e) {
        return res.status(400).send({
            error: "Problem with database server"
        });
    }
});

app.get('*', async (req, res) => {
    var url = req.url.trim().replace('/', '');

    var checkURL = await URL.findOne({ short_url: url });

    if (!checkURL) {
        return res.status(400).send({
            error: "This url is not on the database."
        });
    }

    res.redirect(301, 'https://www.'+checkURL.original_url);

});

app.listen(port, () => {
    console.log(`Server up on ${port}`);
});


module.exports = { app };