require('./config/database')
const Game = require('./models/game');

let g;

Game.findOne({}, function(err, game) {
  g = game;
});
