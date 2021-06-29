const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const screenshotSchema = new Schema({
    // content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    caption: String,
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });

const gameSchema = new Schema({
title: {
    type: String,
    required: true
},
releaseYear: {
    type: Number,
    default: function () {
    return new Date().getFullYear();
    }
},
screenshots: [screenshotSchema]
}, {
timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);