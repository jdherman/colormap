
/*
 * GET home page.
 */

exports.index = function(req, res){

  var presets = ['blues', 'dawn', 'dusk', 'fire', 'golds',
				 'grays', 'greens', 'ice', 'kryptonite', 'purples',
				 'redblue', 'reds', 'seashore', 'teals'];

  res.render('index', {presets:presets});
};
