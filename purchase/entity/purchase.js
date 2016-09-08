var mongoose = require('mongoose');

var Purchase = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    shopping: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Shopping'
    },
    total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Purchase', Purchase);