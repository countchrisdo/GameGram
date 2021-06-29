const Movie = require('../models/game');

module.exports = {
  create,
  delete: deleteScreenshot
};

async function deleteScreenshot(req, res) {
  const game = await Game.findOne({'screenshots._id': req.params.id});
  // Want to ensure that the screenshot was
  // created by the currently logged in user
  // before we remove it
  const review = game.screenshots.id(req.params.id);
  if (!screenshot.user.equals(req.user._id)) return res.redirect(`/games/${game._id}`);
  screenshot.remove();
  // Save the updated game
  await game.save();
  res.redirect(`/games/${game._id}`);
}

function create(req, res) {
    // Find the movie to embed the review within
    Game.findById(req.params.id, function(err, movie) {
  
      // Add the user-centric info to req.body (the new review)
      req.body.user = req.user._id;
      req.body.userName = req.user.name;
      req.body.userAvatar = req.user.avatar;
  
      // Push the subdoc for the review
      game.screenshots.push(req.body);
      // Always save the top-level document (not subdocs)
      game.save(function(err) {
        res.redirect(`/games/${game._id}`);
      });
    });
  }