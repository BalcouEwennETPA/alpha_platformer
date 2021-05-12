var player;
var banane;
var statue;
var petiteBanane;
var keys;
var gamepad;
var paddle;
var padConnected;
var pad;
var texteStatue;
var mountainsBack;
var coffre;
var texteApparu;
var peutTirer = true;
class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
        this.pad = null;
    }
    init(data){
    }
    preload(){
        this.load.image('player', 'assets/player_placeholdere.png');
        this.load.image('background', 'assets/background.jpg');
        this.load.image('coffre', 'assets/coffre.png');
        this.load.image('banane', 'assets/banane.png');
        this.load.image('statue', 'assets/statue.png');
        
           }
    create(){
        mountainsBack = this.add.image(640, 360, 'background');
        texteStatue = this.add.text(420, 200, 'Oinya ascadiquia', { font: '48px Arial', fill:"#009" }).setVisible(false);
        //---------SETTIMEOUT-------------//
        // setTimeout(function(){ce qui se passe}, temps);
        //-------------------------------//
        banane = this.physics.add.group()
        statue = this.add.image(600, 616, 'statue').setScale(0.50);
        
      
        player = this.physics.add.sprite(100, 500, 'player').setScale(0.35);
        coffre = this.physics.add.sprite(300, 500,  'coffre').setScale(0.10);
        this.physics.add.overlap(player,coffre,recupCoffre,null,this)
        
        function recupCoffre(player,coffre){
            coffre.destroy();
            texteApparu = this.add.text(10, 200, 'Médusa savait comment transformer un homme en pierre.', { font: '48px Arial', fill:"#009" });
            setTimeout (function(){
                texteApparu.destroy()
            },1500);
        } 
        //clavier
        keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up : Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            escape : Phaser.Input.Keyboard.KeyCodes.ESC
        });
        
        //manette
        if (this.input.gamepad.total === 0){
            this.input.gamepad.once('connected', function (pad, button, index) {
                paddle = pad;
                padConnected = true;
            }); 
        }
        else {
            paddle = this.input.gamepad.pad1;
        }
        
     }
    
    update(){
        if (keys.right.isDown){ 
            player.setVelocityX(100);
        
        }
        else if (keys.left.isDown){
            player.setVelocityX(-100);
            
        }
        else if (keys.right.isUp && keys.left.isUp){
            player.setVelocity(0);
        }
           
        else{
            texteStatue.setVisible(false);
        }
        if (keys.space.isDown){
            tirer();
        }
    }
}
function tirer (){
    if (peutTirer == true){
    
    petiteBanane = banane.create(player.x,player.y,'banane').setScale(0.10);
    petiteBanane.setVelocityX(300);
    petiteBanane.setVelocityY(-50);
    petiteBanane.setAccelerationY(-300);
    setTimeout(function(){petiteBanane.setAccelerationY(300)},1000); 
    peutTirer = false;
    setTimeout(function(){peutTirer = true}, 3600);
    setTimeout(function(){petiteBanane.destroy()}, 3500);
    
    }
}
//---------SETTIMEOUT-------------//
// setTimeout(function(){ce qui se passe}, temps);
//-------------------------------//