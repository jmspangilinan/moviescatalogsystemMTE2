const Movie = require('../models/Movie');

// Create Movie (Admin only)
module.exports.addMovie = (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).send({ message: 'Only admins can add movies' });
    }

    const { title, director, year, description, genre } = req.body;
    const newMovie = new Movie({ title, director, year, description, genre });

    newMovie.save()
        .then(movie => res.status(201).send({ message: 'Movie added successfully', movie }))
        .catch(err => res.status(500).send({ message: err.message }));
};

// Get All Movies
module.exports.getAllMovies = (req, res) => {
    Movie.find()
        .then(movies => res.status(200).send({ message: 'Get Movies', movies }))
        .catch(err => res.status(500).send({ message: err.message }));
};

// Get Movie by ID
module.exports.getMovieById = (req, res) => {
    Movie.findById(req.params.id)
        .then(movie => {
            if (!movie) return res.status(404).send({ message: 'Movie not found' });
            res.status(200).send(movie);
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

// Update Movie (Admin only)
module.exports.updateMovie = (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).send({ message: 'Only admins can update movies' });
    }

    Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(movie => {
            if (!movie) return res.status(404).send({ message: 'Movie not found' });
            res.status(200).send({ message: 'Movie updated successfully', movie });
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

// Delete Movie (Admin only)
module.exports.deleteMovie = (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).send({ message: 'Only admins can delete movies' });
    }

    Movie.findByIdAndDelete(req.params.id)
        .then(movie => {
            if (!movie) return res.status(404).send({ message: 'Movie not found' });
            res.status(200).send({ message: 'Movie deleted successfully' });
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

// Add Comment to Movie
module.exports.addMovieComment = (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    Movie.findById(id)
        .then(movie => {
            if (!movie) return res.status(404).send({ message: 'Movie not found' });
            
            movie.comments.push({ user: req.user.id, text });
            return movie.save();
        })
        .then(updatedMovie => res.status(200).send({ message: 'Comment added successfully', movie: updatedMovie }))
        .catch(err => res.status(500).send({ message: err.message }));
};

// Get Comments for a Movie
module.exports.getMovieComments = (req, res) => {
    Movie.findById(req.params.id)
        .then(movie => {
            if (!movie) return res.status(404).send({ message: 'Movie not found' });
            res.status(200).send(movie.comments);
        })
        .catch(err => res.status(500).send({ message: err.message }));
};
