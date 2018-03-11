
### Zombie with text
```javascript
var StateZombies = (function(game) {
});

StateZombies.prototype = {
    preload: function () {

        this.game.load.atlasJSONHash('sprites',assets_url+'sprites/zombies.png',assets_url+'sprites/zombies.json');
        this.zombie_text = [];
    },

    create: function () {
        console.log('ready zombies');
        this.zombies = this.game.add.physicsGroup(Phaser.Physics.ARCADE, this.game.world, 'zombies');

        //  Create our Timer
        this.timer = this.game.time.create(false);

        //  Set a TimerEvent to occur after 2 seconds
        this.timer.loop(2000, this.updateCounter, this);

        //  Start the timer running - this is important!
        //  It won't start automatically, allowing you to hook it to button events and the like.
        this.timer.start();
    },
    updateCounter: function() {
        console.log('tick');
        x = this.world.width;
        y = this.rnd.integerInRange(0, this.game.world.height);
        var azombie = this.zombies.create(x,y,'sprites','A.png');
        azombie.health = 5;
        azombie.animations.add('walking', ['A.png','B.png','C.png'], 5, true, false);
        azombie.animations.play('walking');
        azombie.body.velocity.setTo(-20,0);

        var style = { font: "20px Arial", fill: "#72ba3a", wordWrap: true, wordWrapWidth: azombie.width, align: "center", backgroundColor: "#F8C27C" };
        var text = this.game.add.text(0, 0, "brains!", style);
        text.anchor.set(0.5);

        this.zombie_text.push([azombie,text]);
    },
    update: function () {
        for(var i=0; i<this.zombie_text.length; i++) {
            var t = this.zombie_text[i][1];
            var z = this.zombie_text[i][0];
            t.x = Math.floor(z.x + z.width / 2);
            t.y = Math.floor(z.y + (z.height / 2)-25);

        }
    },


};

module.exports = StateZombies;
```

### Follow path
```javascript
function create() {

    //var sprite = game.add.sprite(0, 0, 'phaser');
    dude = game.add.sprite(0, 0, 'dude');
    dude.anchor.set(0.5,1);
        this.stage.backgroundColor = '#204090';
    game.physics.arcade.enable(dude);
   
    this.bmd = null;
    path = [];
    pi = 0;
    this.points = {
        'x': [ 32, 128, 256, 384, 512, 608 ],
        'y': [ 240, 240, 240, 240, 240, 240 ]
    };
        this.bmd = this.add.bitmapData(this.game.width, this.game.height);
        this.bmd.addToWorld();

        var py = this.points.y;

        for (var i = 0; i < py.length; i++)
        {
            py[i] = this.rnd.between(32, 432);
        }
        plot(this);
       // game.time.events.loop(Phaser.Timer.SECOND, follow, this);
        
        
}
function plot(self) {
   This = self;

   This.bmd.clear();
   var x = (1 / self.game.width);
   for(var i=0; i<=1; i+=x) {
       //var px = This.math.linearInterpolation(This.points.x, i);
       //var py = This.math.linearInterpolation(This.points.y,i);
       var px = This.math.catmullRomInterpolation(This.points.x, i);
       var py = This.math.catmullRomInterpolation(This.points.y,i);
       This.bmd.rect(px,py,1,1,'rgba(255,255,255,1)');
       path.push({x:px, y:py});
   }
   for(var p=0;p<This.points.x.length;p++) {
       This.bmd.rect(This.points.x[p],This.points.y[p],6,6,'rgba(255,0,0,1)');
       
       
   }
   new_path = []
   for(var ix=0;ix<path.length;ix++) {
       var node = {x: path[ix].x, y:path[ix].y, angle:0}
       if(ix>0 && ix<path.length-1) {
           node.angle = This.math.angleBetweenPoints(path[ix-1],path[ix]);
           
       }
       //node.angle=93;
       new_path.push(node);
   }
   path = new_path;
   
}


function update() {

     
            dude.x = path[pi].x;
            dude.y = path[pi].y;
            dude.rotation = path[pi].angle;
            dude.rotation = dude.rotation+1.5708; // add pi/2 radions(90deg)
            pi++;
            if (pi >= path.length)
            {
                pi = 0;
            }
            game.debug.spriteInfo(dude, 32, 100);
    
}
```

##Source / inspired by

https://phaser.io/tutorials/coding-tips-008

https://www.youtube.com/watch?v=9b8f5nVOOUo
