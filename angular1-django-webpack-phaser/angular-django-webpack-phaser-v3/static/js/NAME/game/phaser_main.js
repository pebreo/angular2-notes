module.exports = (function(scope, ele, attrs, window_width, window_height) {

    var StateMain = require('./states/StateMain.js');
    var StateTitle = require('./states/StateTitle.js');


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

    game.state.add('StateMain', StateMain);
    game.state.add('StateTitle', StateTitle);
  


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
