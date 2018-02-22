const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

const URLSchema = new Schema({
    "original_url": String,
    "short_url": String
});

URLSchema.methods.toJSON = function() {
    var url = this;
    var urlObject = url.toObject();

    return _.pick(urlObject, ['original_url', 'short_url']);
}

var URL = mongoose.model('Url', URLSchema);

module.exports = { URL };