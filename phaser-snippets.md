
# Sprites

### physics
```
game.physics.startSystem(Phaser.Physics.ARCADE);
dude = game.add.sprite(game.world.width, game.world.centerY-150, 'dude');
game.physics.arcade.enable(dude);
dude.velocity.x = -150;
```
### spritesheet
```
this.game.load.atlasJSONHash('sprites',assets_url+'sprites/zombies.png',assets_url+'sprites/zombies.json');
this.zombies = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, 'zombies');
var azombie = this.zombies.create(x,y,'sprites','A.png');
azombie.animations.add('walking', ['A.png','B.png','C.png'], 5, true, false);
azombie.animations.play('walking');
azombie.body.velocity.setTo(-20,0);
```
### groups
```
```

# Text
### vanilla text
```
var style = { font: "20px Arial", fill: "#72ba3a", wordWrap: true, wordWrapWidth: azombie.width, align: "center", backgroundColor: "#F8C27C" };
var text = this.game.add.text(0, 0, "brains!", style);
text.anchor.set(0.5);
```
### google webfont
```

WebFontConfig = {

    
    //active: function() { game.time.events.add(Phaser.Timer.SECOND, addText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Revalia']
    }

};

function preload() {
    //  The Google WebFont Loader will look for this object, so create it before loading the script.
     game.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
}

```
### Text physics
```
// create a sprite
game.physics.startSystem(Phaser.Physics.ARCADE);
dude = game.add.sprite(game.world.width, game.world.centerY-150, 'dude');
game.physics.arcade.enable(dude);
dude.velocity.x = -150;

// create a text
 var style = { font: "20px Arial", fill: "#72ba3a", wordWrap: true, wordWrapWidth: azombie.width, align: "center", backgroundColor: "#F8C27C" };
 var text = this.game.add.text(0, 0, "brains!", style);
 text.anchor.set(0.5);
    
// move the text when the sprite moves
update() {
 text.x = Math.floor(dude.x + dude.width / 2);
 text.y = Math.floor(dude.y + (dude.height / 2)-25);
}
```

# Input
### up,down,left,right
```
var upKey;
var downKey;
var leftKey;
var rightKey;
```
### image input
```
//preload
this.game.load.image("red",assets_url + "images/main/blocks/red.png");
//create
var red=this.game.add.image(0,0,"red");
red.name = "red"
red.inputEnabled=true;
red.events.onInputDown.add(this.changeColor, this);

function changeColor(target) {
console.log(target.name);
}
```
# Sound

# Game

