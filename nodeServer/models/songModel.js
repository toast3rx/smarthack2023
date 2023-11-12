const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true
    },
    stats: {
      type: Array,
      default: []
    }
  });
const Song = mongoose.model('Song', songSchema);

module.exports = Song;
