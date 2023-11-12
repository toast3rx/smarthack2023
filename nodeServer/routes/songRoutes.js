const express = require('express');
const controller = require('../controllers/songController');

const router = express.Router();

router
    .route('/')
    .get(controller.getAllSongs)
    .post(controller.postSong);

router
    .route('/:id')
    .get(controller.getSongById)
    .patch(controller.updateTour);

module.exports = router;