module.exports = (function(scope, ele, attrs, window_width, window_height) {

    var Game = require('./states');

    console.log(window_width);
    // desktop+laptop
    if(window_width>1024) {
        var game = new Phaser.Game(480, 640, Phaser.AUTO, 'game-canvas');

    } else {
        // mobile
        var game = new Phaser.Game(window_width, window_height, Phaser.AUTO, 'game-canvas');
    }
    game.scope = scope;
    game.window_width = window_width;

    game.state.add('StatePreloader', State.StatePreloader);
    game.state.add('StateTitle', State.StateTitle);
    game.state.add('StateMain', State.StateMain);
  


    // Turn off music
     scope.$on('game:toggleMusic', function() {
       // game.state.states.Preloader.toggleMusic();
     });

    // cleanup
    scope.$on('$destroy', function() {
      // socket.emit('playerLeftMap', {
      //   playerId: g.sid,
      //   mapId: g.mapId
      // });
      game.destroy();
    });

    game.state.start('StateTitle');

});
