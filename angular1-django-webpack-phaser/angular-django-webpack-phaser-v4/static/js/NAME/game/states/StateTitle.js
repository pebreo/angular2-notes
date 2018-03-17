module.exports = (function(Game) {
  var g = Game;

  Game.StateTitle = function(game) { };

  Game.StateTitle.prototype = {
    preload: function () {
        this.game.load.image("logo",assets_url + "images/title/gameLogo.png");
        this.game.load.spritesheet("buttons",assets_url + "images/ui/buttons.png", 265, 75, 8);
        this.game.load.image("wrongWay",assets_url + "images/turn.png");
        // ignore if not mobile
        if(this.game.window_width < 1024){
            this.game.scale.forceOrientation(false, true);
            this.setListeners();
        };
    },

    create: function () {
        this.logo=this.game.add.sprite(this.game.world.centerX,180,"logo");
        this.logo.anchor.set(0.5, 0.5);

        this.btnStart=this.game.add.button(this.game.world.centerX,this.game.world.height-150,
            "buttons",this.startGame,this,7,6,7);
        this.btnStart.anchor.set(0.5, 0.5);
    },

    setListeners: function() {
        this.game.scale.enterIncorrectOrientation.add(this.wrongWay,this);
        this.game.scale.leaveIncorrectOrientation.add(this.rightWay,this);
    },
    wrongWay: function() {
            this.game.scope.$emit('game:wrongWay', {});
    },
    rightWay: function() {
            this.game.scope.$emit('game:rightWay', {});
    },
    startGame: function() {
            console.log('push start');
            this.game.state.start('StateMain');
    },
    update: function () {

    },
  };
});



