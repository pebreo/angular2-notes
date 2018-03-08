module.exports = (function(scope, ele, attrs, window_width, window_height) {
    var gameProperties = {
        screenWidth: 640,
        screenHeight: 480,

        dashSize: 5,

        paddleLeft_x: 50,
        paddleRight_x: 590,

        ballVelocity: 500,
        ballRandomStartingAngleLeft: [-120, 120],
        ballRandomStartingAngleRight: [-60, 60],
        ballStartDelay: 2,
    };


    var graphicAssets = {
        ballURL: assets_url + 'images/ball.png',
        ballName: 'ball',

        paddleURL: assets_url + 'images/paddle.png',
        paddleName: 'paddle'
    };

    var soundAssets = {
        ballBounceURL: assets_url + 'sound/ballBounce',
        ballBounceName: 'ballBounce',

        ballHitURL: assets_url + 'sound/ballHit',
        ballHitName: 'ballHit',

        ballMissedURL: assets_url + 'sound/ballMissed',
        ballMissedName: 'ballMissed',

        mp4URL: '.m4a',
        oggURL: '.ogg'
    };


    var StateMain = require('./states/StateMain.js');

    console.log(window_width);
    // desktop+laptop
    if(window_width>1024) {
        var game = new Phaser.Game(480, 640, Phaser.AUTO, 'game-canvas');

    } else {
        // mobile
        var game = new Phaser.Game(window_width, window_height, Phaser.AUTO, 'game-canvas');
    }


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
    // mobile
    // var game = new Phaser.Game(.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'game-canvas');
    game.state.add('main', StateMain);
    game.state.start('main');
});
