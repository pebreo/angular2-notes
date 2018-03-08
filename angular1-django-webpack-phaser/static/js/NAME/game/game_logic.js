module.exports = (function(scope, ele, attrs) {
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


    var mainState = function(game) {
        this.backgroundGraphics;
        this.ballSprite;
        this.paddleLeftSprite;
        this.paddleRightSprite;
    }

    mainState.prototype = {
        preload: function () {
            game.load.image(graphicAssets.ballName, graphicAssets.ballURL);
            game.load.image(graphicAssets.paddleName, graphicAssets.paddleURL);

            game.load.audio(soundAssets.ballBounceName, [soundAssets.ballBounceURL+soundAssets.mp4URL, soundAssets.ballBounceURL+soundAssets.oggURL]);
            game.load.audio(soundAssets.ballHitName, [soundAssets.ballHitURL+soundAssets.mp4URL, soundAssets.ballHitURL+soundAssets.oggURL]);
            game.load.audio(soundAssets.ballMissedName, [soundAssets.ballMissedURL+soundAssets.mp4URL, soundAssets.ballMissedURL+soundAssets.oggURL]);
        },

        create: function () {
            this.initGraphics();
            this.initPhysics();
            this.startDemo();
        },

        update: function () {

        },

        initGraphics: function () {
            this.backgroundGraphics = game.add.graphics(0, 0);
            this.backgroundGraphics.lineStyle(2, 0xFFFFFF, 1);

            for (var y = 0; y < gameProperties.screenHeight; y += gameProperties.dashSize * 2) {
                this.backgroundGraphics.moveTo(game.world.centerX, y);
                this.backgroundGraphics.lineTo(game.world.centerX, y + gameProperties.dashSize);
            }

            this.ballSprite = game.add.sprite(game.world.centerX, game.world.centerY, graphicAssets.ballName);
            this.ballSprite.anchor.set(0.5, 0.5);

            this.paddleLeftSprite = game.add.sprite(gameProperties.paddleLeft_x, game.world.centerY, graphicAssets.paddleName);
            this.paddleLeftSprite.anchor.set(0.5, 0.5);

            this.paddleRightSprite = game.add.sprite(gameProperties.paddleRight_x, game.world.centerY, graphicAssets.paddleName);
            this.paddleRightSprite.anchor.set(0.5, 0.5);
        },

        initPhysics: function () {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.enable(this.ballSprite, Phaser.Physics.ARCADE);

            this.ballSprite.checkWorldBounds = true;
            this.ballSprite.body.collideWorldBounds = true;
            this.ballSprite.body.immovable = true;
            this.ballSprite.body.bounce.set(1);
        },

        startDemo: function () {
            this.ballSprite.visible = false;
            game.time.events.add(Phaser.Timer.SECOND * gameProperties.ballStartDelay, this.startBall, this);
        },

        startBall: function () {
            this.ballSprite.visible = true;

            var randomAngle = game.rnd.pick(gameProperties.ballRandomStartingAngleRight.concat(gameProperties.ballRandomStartingAngleLeft));

            game.physics.arcade.velocityFromAngle(randomAngle, gameProperties.ballVelocity, this.ballSprite.body.velocity);
        },
    };



    var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'game-canvas');
    game.state.add('main', mainState);
    game.state.start('main');
});
