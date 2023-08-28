export class Game extends Phaser.Scene {

constructor(){
    super({ key: "game" });
}

preload(){
    this.load.image('background', 'background.jpg');
    this.load.image('gameover', 'gameover.png');
    this.load.image('platform','platform.png');
    this.load.image('ball', 'ball.png')
}

create(){
    this.physics.world.setBoundsCollision(true ,true ,true , false);
    
    this.add.image(400,250,'background');
    this.gameoverImage = this.add.image(400,90,'gameover');
    this.gameoverImage.visible = false;

    this.platform = this.physics.add.image(400,460,'platform').setImmovable();
    this.platform.body.allowGravity=false;

    this.ball = this.physics.add.image(400,30,'ball');
    this.ball.setCollideWorldBounds(true);

    let velocity = 100 * Phaser.Math.Between(1.3,2);
    if (Phaser.Math.Between(0,10)>5){
        velocity = 0 - velocity;
    }
    this.ball.setVelocity(velocity,10);

    this.physics.add.collider(this.ball, this.platform);
    this.ball.setBounce(1);    

    
    
}

update(){

    const mouseX = this.input.mousePointer.x;

    // Set the platform's x-coordinate to match the mouse cursor's x-coordinate
    this.platform.x = mouseX;

    // Ensure the platform stays within the game's bounds
    const halfPlatformWidth = this.platform.width / 2;
    const minX = halfPlatformWidth;
    const maxX = this.sys.game.config.width - halfPlatformWidth;
    this.platform.x = Phaser.Math.Clamp(this.platform.x, minX, maxX);


    if(this.ball.y > 500) {
        console.log('fin');
        this.gameoverImage.visible = true;
        this.scene.pause();
    }
}
}
