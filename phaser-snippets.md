
# Sprites

### physics
```
game.physics.startSystem(Phaser.Physics.ARCADE);
dude = game.add.sprite(game.world.width, game.world.centerY-150, 'dude');
game.physics.arcade.enable(dude);
dude.velocity.x = -150;
```
### physics - enable multiple objects
```
this.candies = this.game.add.group();
this.candies.createMultiple(40,"candy");
this.candies.setAll('checkWorldBounds',true); // candies cant go out of bounds
this.candies.setAll('outOfBoundsKill',true);

this.dragon=this.game.add.sprite(0,0,"dragon");
this.dragon.animations.add('fly',[0,1,2,3], 12, true);
this.dragon.animations.play('fly');

this.game.physics.enable([this.dragon, this.candies],Phaser.Physics.ARCADE);
this.dragon.body.gravity.y=500;
this.dragon.body.immovable=true;
```

### collision
```
//update
this.game.physics.arcade.collide(this.dragon, this.candies, null, this.onEat, this);
onEat: function(dragon, candy) {
if(this.think.frame==candy.frame) {
    candy.kill(); // remove candy
    this.game.score++;
    this.scoreText.text=this.game.score;
} else {
    if(this.game.soundOn==true) {
        this.burp.play();
    }
    candy.kill();
    this.game.state.start("StateOver");
}
},
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

### animations
```
this.game.load.spritesheet("dragon",assets_url+"images/main/dragon.png",120,85,4);
this.dragon=this.game.add.sprite(0,0,"dragon");
this.dragon.animations.add('fly',[0,1,2,3], 12, true);
this.dragon.animations.play('fly');
```
### groups
```
// preload
this.game.load.spritesheet("candy",assets_url+"images/main/candy.png",52,50,8);

//create
this.candies = this.game.add.group();
this.candies.createMultiple(40,"candy");
this.candies.setAll('checkWorldBounds',true); // candies cant go out of bounds
this.candies.setAll('outOfBoundsKill',true);
//setListeners
this.game.time.events.loop(Phaser.Timer.SECOND*1.2, this.fireCandy, this);

fireCandy: function() {
        var candy = this.candies.getFirstDead(); // get the first available piece of candy thats not active
        var yy=this.game.rnd.integerInRange(0, this.game.height-60);
        var xx=this.game.width-100;
        var type=this.game.rnd.integerInRange(0, 7); // 8 frames in candies spritesheet

        candy.frame=type;
        candy.reset(xx,yy); // set position
        candy.enabled=true; // no longer will be called by getFirstDead
        candy.body.velocity.x=-200;
},
```
### tween - exponential movement
```
//create
game.physics.startSystem(Phaser.Physics.ARCADE);
dude = game.add.sprite(game.world.width, game.world.centerY-150, 'dude');
game.physics.arcade.enable(dude);
game.input.onDown.add(moveDude, this);

function moveDude()
{
        demoTween = game.add.tween(dude).to({
                x:game.world.centerX, 
                y:game.world.centerY-150}, 
                500, 
                Phaser.Easing.Exponential.InOut);
        demoTween.start();
}
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

function setupText() {
    text = game.add.text(game.world.width, game.world.height, "- phaser -");
    text.anchor.setTo(0.5);

    text.font = 'Revalia';
    text.fontSize = 60;

    //  x0, y0 - x1, y1
    grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
    grd.addColorStop(0, '#8ED6FF');   
    grd.addColorStop(1, '#004CB3');
    text.fill = grd;

}

function moveText(x,y) {
    text.x = x;
    text.y = y;
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

### global event
```
game.input.onDown.add(moveDude, this);

```
### up,down,left,right
```
var upKey;
var downKey;
var leftKey;
var rightKey;
// create
upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
//update
    if (upKey.isDown)
    {
        sprite.y--;
    }
    else if (downKey.isDown)
    {
        sprite.y++;
    }

    if (leftKey.isDown)
    {
        sprite.x--;
    }
    else if (rightKey.isDown)
    {
        sprite.x++;
    }

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
### sprite input
```
// preload
this.game.load.spritesheet("soundButtons",assets_url+"images/ui/soundButtons.png",44,44,4);
// create
this.btnSound=this.game.add.image(70,20,"soundButtons");
this.btnSound.inputEnabled = true;
this.btnSound.frame=0;
// setListeners
this.btnSound.events.onInputDown.add(this.toggleSound,this);
    toggleSound: function() {
        this.game.soundOn = !this.game.soundOn;
        this.updateButtons();
    },
updateButtons: function() {
    if(this.game.soundOn==true){
        this.btnSound.frame=0;
    } else{
        this.btnSound.frame=1;
    }
},
```

# Sound
```
// preload
this.game.load.audio("burp",assets_url+"sounds/burp.mp3");
// create
this.burp = this.game.add.audio("burp");
this.burp.play();
```

# Game
### background
```
game.stage.backgroundColor = '#736357';
```
### Ipad fix
```
```

### Landscape
```
```
### Portrait
```
```

# Angular communication
### from Angular to Phaser
```
```

### from Phaser to Angular
```
```

# Misc
### debugging
```
// update
game.debug.inputInfo(32, 32);
game.debug.spriteInfo(mysprite, 32, 32);
```

## References
https://gamemechanicexplorer.com/#easing-7

Goto 'help' section on the sandbox:  https://phaser.io/sandbox/edit/2