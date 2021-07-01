const Game = require('../models/game');

module.exports = {
  create,
  delete: deleteScreenshot,
  edit,
  update,
};

function create(req, res) {
  // Find the game to embed the img within
  Game.findById(req.params.id, function(err, game) {
    // Add the user-centric info to req.body (the new screenshot)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    // Push the subdoc for the screenshot
    game.screenshots.push(req.body);
    // Always save the top-level document (not subdocs)
    game.save(function(err) {
      res.redirect(`/games/${game._id}`);
    });
  });
}

async function deleteScreenshot(req, res) {
  const game = await Game.findOne({'screenshots._id': req.params.id});
  // Want to ensure that the screenshot was
  // created by the currently logged in user
  // before we remove it
  const screenshot = game.screenshots.id(req.params.id);
  if (!screenshot.user.equals(req.user._id)) return res.redirect(`/games/${game._id}`);
  screenshot.remove();
  // Save the updated game
  await game.save();
  res.redirect(`/games/${game._id}`);
}

  function edit(req, res){
    Game.findOne(
      {'screenshots._id': req.params.id, 'screenshots.user': req.user._id},
      function(err, game){
        if (!game || err) return res.redirect(`/games/${game._id}`);
        let screenshot = game.screenshots.id(req.params.id);
        res.render('screenshots/edit', {title: 'Edit Comment', screenshot });
      }
    )
  }

  function update(req, res) {
    Game.findOne({'screenshots._id': req.params.id}, function(err, game) {
      const screenshotSubdoc = game.screenshots.id(req.params.id);
      if (!screenshotSubdoc.user.equals(req.user._id)) return res.redirect(`/games/${game._id}`);
      screenshotSubdoc.caption = req.body.caption;
      game.save(function(err) {
        res.redirect(`/games/${game._id}`);
      });
    });
  }