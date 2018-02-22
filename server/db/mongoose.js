const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/url-sort');

module.exports = { mongoose };