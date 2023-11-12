const fs = require('fs');
const Song = require('../models/songModel');
const APIFeatures = require('../utils/apiFeatures');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllSongs = async (req, res) => {
    // console.log(req.query);
    let query = Song.find();
    const features = new APIFeatures(query, req.query);
    try {
        const songs = await query;
        console.log(songs);
        res.json({
            status: 'success',
            results: songs.length,
            data: {
                songs
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getSongById = async (req, res) => {
    try {
        const song = await Song.find({_id: req.params.id});
        res.status(200).json({
            status: 'successs',
            timestamp: req.timestamp,
            data: {
                song
            }
        });      
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};



exports.deleteSong = (req, res) => {
    
    Song.deleteOne({_id: req.params.id});
    res.status(204).json({
        status: 'success',
        data: null
    });

    try {
        const tour = Song.deleteOne({_id: req.params.id});
        res.status(204).json({
            status: 'successs',
            data: null
        });      
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.postSong = async (req, res) => {
    try {
        const newSong = await Song.create(req.body);
        res.status(200).json({
            status: 'success',
            data: newSong
        });
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        console.log(req.body);
        const newSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).json({
            status: 'success',
            data: newSong
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}
