const Movie = require('../models/game');

module.exports = {
  index,
  show,
  new: newMovie,
  create
};

function index(req, res) {
  Movie.find({}, function(err, movies) {
    res.render('games/index', { title: 'All Games', games });
  });
}

function show(req, res) {
  Game.findById(req.params.id)
          res.render('games/show', { title: 'Game Details', movie, });
}

function newGame(req, res) {
  res.render('games/new', { title: 'Add Game' });
}

function create(req, res) {
  // ensure empty inputs are removed so that model's default values will work
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const game = new Game(req.body);
  game.save(function(err) {
    if (err) return res.redirect('/games/new');
    res.redirect(`/games/${game._id}`);
  });
}