var StateMain = (function(game) {
});

StateMain.prototype = {
    preload: function () {
        // this.game.load.image("logo",assets_url + "images/title/gameLogo.png");
        this.game.scope.$emit('game:mainLoad', {});
    },

    create: function () {
        // this.logo=this.game.add.sprite(0,0,"logo");
    },

    update: function () {

    },


};

module.exports = StateMain;
