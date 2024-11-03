const express = require('express');
const movieController = require('../controllers/movie');
const auth = require('../auth');

const router = express.Router();

router.post('/addMovie', auth.isLoggedIn, movieController.addMovie);
router.get('/getMovies', movieController.getAllMovies);
router.get('/getMovie/:id', movieController.getMovieById);
router.patch('/updateMovie/:id', auth.isLoggedIn, movieController.updateMovie);
router.delete('/deleteMovie/:id', auth.isLoggedIn, movieController.deleteMovie);
router.post('/addComment/:id', auth.isLoggedIn, movieController.addMovieComment);
router.get('/getComments/:id', movieController.getMovieComments);

module.exports = router;
