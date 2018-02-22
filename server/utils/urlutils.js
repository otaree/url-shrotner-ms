const { ObjectID } = require('mongodb');

const checkUrl = (url) => {
    if (url.indexOf('new') === 1) {
        url = url.replace('/new/', '');
        var regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        var match = url.match(regex);
        if (match) {
            return match[0].replace(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)/, '');
        }

    }
    return false;
};


const generateShort = () => {
   return ObjectID().toString().substring(18);
};

module.exports = { checkUrl, generateShort };


