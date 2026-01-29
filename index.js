import { spawnCoins } from './assets/js/functions.js';
import { setupCamera, setCharacterFollow } from './assets/js/camera.js';
import { createCharacter } from './assets/js/character.js';
import { GameManager } from './assets/js/gameManager.js';
import { ScrollableTextBox } from './assets/js/messageManager.js';
import { NPC } from './assets/js/npcharacters.js';

class Overworld extends Phaser.Scene 
{
    constructor() {
        super({ key: 'Overworld' });
    }

    preload() {
        // Carica il plugin AnimatedTiles
        this.load.scenePlugin('AnimatedTiles', 'assets/js/AnimatedTiles.js', 'AnimatedTiles', 'animatedTiles');
        
        // Carica la mappa Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/map/overworld.json');

        // Carica i tileset
        this.load.image('Grass', 'assets/tilesets/images/Grass.png');
        this.load.image('grounds', 'assets/tilesets/images/grounds.png');
        this.load.image('Lava', 'assets/tilesets/images/Lava.png');
        this.load.image('Sand', 'assets/tilesets/images/Sand.png');
        this.load.spritesheet('animated-sand', 'assets/tilesets/images/animated-sand.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('animated-lava', 'assets/tilesets/images/animated-lava.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('animated-grass-2', 'assets/tilesets/images/animated-grass-2.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('animated-ocean', 'assets/tilesets/images/animated-ocean.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('Trees-And-Mountains', 'assets/tilesets/images/Trees-And-Mountains.png');

        this.load.spritesheet('idle_back', 'assets/characters/character/idle_back.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('idle_left', 'assets/characters/character/idle_left.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('idle_right', 'assets/characters/character/idle_right.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('idle_front', 'assets/characters/character/idle_front.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('walk_left', 'assets/characters/character/walk_left.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('walk_right', 'assets/characters/character/walk_right.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('walk_back', 'assets/characters/character/walk_back.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('walk_front', 'assets/characters/character/walk_front.png', { frameWidth: 16, frameHeight: 16 });

        // items
        this.load.spritesheet('coin', 'assets/images/coin.png', { frameWidth: 8, frameHeight: 8 });

        // ui
        this.load.image('background', 'assets/images/ui/background.png');
        this.load.image('background_large', 'assets/images/ui/background_large.png');
        this.load.image('download_button', 'assets/images/ui/download_button.png');
        this.load.image('tutorial_button', 'assets/images/ui/tutorial_button.png');
        this.load.image('credits_button', 'assets/images/ui/credits_button.png');
        this.load.image('close_button', 'assets/images/ui/close_button.png');
        this.load.image('textbox', 'assets/images/ui/textbox.png');
        this.load.image('tutorial', 'assets/images/ui/tutorial.png');
        this.load.image('credits', 'assets/images/ui/credits.png');
        this.load.image('name', 'assets/images/ui/name.png');
        this.load.image('class', 'assets/images/ui/class.png');
        this.load.image('exc_mark', 'assets/images/ui/exclamation_mark.png');
        this.load.image('audio_on', 'assets/images/ui/audio_on.png');
        this.load.image('audio_off', 'assets/images/ui/audio_off.png');

        // npcs
        this.load.spritesheet('ice_golem', 'assets/characters/npcs/creatures/ice_golem/IceGolem.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('druid', 'assets/characters/npcs/creatures/expert_druid/ExpertDruid.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('pyromancer', 'assets/characters/npcs/creatures/pyromancer/NovicePyromancer.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('fire_elemental', 'assets/characters/npcs/creatures/fire_elemental/FireElemental.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('wisp', 'assets/characters/npcs/creatures/wisp/GlowingWisp.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('witch', 'assets/characters/npcs/creatures/vile_witch/VileWitch.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('treant', 'assets/characters/npcs/creatures/treant/GrizzledTreant.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('water_elemental', 'assets/characters/npcs/creatures/water_elemental/WaterElemental.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('necromancer', 'assets/characters/npcs/creatures/necromancer/AdeptNecromancer.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('fairy', 'assets/characters/npcs/creatures/fairy/MagicalFairy.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('iron_golem', 'assets/characters/npcs/creatures/iron_golem/IronGolem.png', { frameWidth: 16, frameHeight: 16 });

        // audio
        this.load.audio('blip', 'assets/audio/blip.wav');
        this.load.audio('pickup', 'assets/audio/pickup.wav');
        this.load.audio('bgm', 'assets/audio/background_song.wav');

    }

    create() 
    {
        let map = this.make.tilemap({
                key: 'map'
            });

        this.gameManager = new GameManager(this, map);

        // Aggiungi i tileset alla mappa
        const grassTileset = map.addTilesetImage('Grass');
        const groundsTileset = map.addTilesetImage('grounds');
        const lavaTileset = map.addTilesetImage('Lava');
        const sandTileset = map.addTilesetImage('Sand');
        const animatedSandTileset = map.addTilesetImage('animated-sand');
        const animatedLavaTileset = map.addTilesetImage('animated-lava');
        const animatedGrassTileset = map.addTilesetImage('animated-grass-2');
        const treesAndMountainsTileset = map.addTilesetImage('Trees-And-Mountains');
        const animatedOceanTileset = map.addTilesetImage('animated-ocean');

        // Aggiungi i layer alla mappa
        map.backgroundLayer = map.createLayer('background', [animatedOceanTileset], 0, 0);
        map.soilLayer = map.createLayer('soil', [grassTileset, lavaTileset, sandTileset, animatedGrassTileset, animatedLavaTileset, animatedSandTileset], 0, 0);
        map.bordersLayer = map.createLayer('borders', [grassTileset, lavaTileset, sandTileset, animatedGrassTileset, animatedLavaTileset, animatedSandTileset], 0, 0);
        map.roadsLayer = map.createLayer('roads', [groundsTileset], 0, 0);
        map.mountainsAndTreesLayer = map.createLayer('mountains and trees', [treesAndMountainsTileset], 0, 0);
        map.mountainsAndTrees2Layer = map.createLayer('mountains and trees 2', [treesAndMountainsTileset], 0, 0);
        map.walkableTreesLayer = map.createLayer('walkable trees', [treesAndMountainsTileset], 0, 0);

        map.backgroundLayer.setCollisionByExclusion([-1]); 
        map.mountainsAndTreesLayer.setCollisionByExclusion([-1]); 
        map.mountainsAndTrees2Layer.setCollisionByExclusion([-1]);
        map.bordersLayer.setCollisionByExclusion([-1]);


        this.animatedTiles.init(map);

        this.character = createCharacter(this);
        this.physics.add.collider(this.character, map.mountainsAndTreesLayer);
        this.physics.add.collider(this.character, map.mountainsAndTrees2Layer);
        this.physics.add.collider(this.character, map.bordersLayer);

        setupCamera(this, map);
        setCharacterFollow(this, this.character, map);

        spawnCoins(this, map, 30, this.gameManager, map.soilLayer, map.mountainsAndTreesLayer, map.mountainsAndTrees2Layer);

        this.npc_1 = new NPC(this.gameManager, this, 154, 160, "ice_golem", 3, 
            ["So, you want to know more about Francesco? collect coins and ask around, we know him well!", 
            "Sure, you could just download his resume clicking on the third button at the top right of the screen, but what about the fun?", 
            "As you can clearly see, we're talking about a huge nerd and some sort of living videogame enciclopedia",
            "These coins seems to be neverending..."]);
            this.exclamation = this.add.image(147, 135, 'exc_mark').setOrigin(0);
        
        this.npc_2 = new NPC(this.gameManager, this, 104, 302, "druid",  3, 
            ["Programming videogames sure is fun, but knowing how to program whatever is just beautiful. This is why Francesco studied game programming while working as a web developer for years!", 
            "Favourite programming languages? C# for sure, but I know he secretly loves C++...and has a strange love/hate relationship with JavaScript", 
            "Actually, he started ``programming`` when he was 13, with RPG Maker XP. God I miss RPG Maker (do not tell anyone I said it please)"], 7);
        
        this.npc_3 = new NPC(this.gameManager, this, 125, 356, "pyromancer", 3, [
        "Uh? You want to know Francesco's working experience? let me see...He started working in 2020, a stage in a company that sold streaming services.",
        "After that, he worked for Concrete Investing for almost 3 years. What a ride, from junior developer to basically project manager and company's only IT",
        "Then, finally, his start with the Game Industry: from a small indie studio doing narrative-driven experiences to team-coordinator for the TinyBullStudios B2B branch",
        "Today he is a quite skilled Unity Programmer: with more than 3 years of experience in a lot of different projects: from VR to multiplayer, for both enterprise and consumer software",
        "His favourite game engine is Unity by far. hoping that they don't ruin it anymore. Wish we could use Unreal a bit more tho..."
        ], 12);

        this.npc_4 = new NPC(this.gameManager, this, 104, 128, "fire_elemental",  3, 
            ["What can I say about Francesco? he basically spent his whole life surrounded by monitors and tech stuff. He's a psycho for that kind of things.", 
            "Computer hardware, videogames, smartphone modding, tech news, this is the kind of stuff he's crazy for", 
            "I mean, technology is not his only passion, but probably there's someone around here that can tell you more"], 26);

        this.npc_5 = new NPC(this.gameManager, this, 420, 80, "wisp",  3, 
            ["Full metalhead: guitar player, singer, heavy music producer\n Apparently it wasn't a phase after all.", 
            "Really: He loves heavy music as much as he's crazy for tech. He own lots of guitars, amps...and even a medieval bagpipe!", 
            "I heard he's having some issues on learning how to play that, tho. But its only rumors."], 45);

        this.npc_6 = new NPC(this.gameManager, this, 600, 400, "witch",  3, 
            ["Francesco lived in different places, but always in Italy: Verona, Milan, a bit of Genoa, Vicenza...Born in a small town near Vicenza, He misses a bit having not lived abroad so far.", 
            "He always thought the big city was the right way. After 4 years in Milan, he totally changed his mind. Now he's a happy countryside programmer. And that's way he STRONGLY prefers remote working", 
            "Really, like, you want the 100% more chance that he'll accept a job? just say 'full remote'. It's like a magic word"], 56);

        this.npc_7 = new NPC(this.gameManager, this, 521, 357, "treant",  3, 
            ["He loves cats. In fact, he has two of them: Gazpacho and Pierogi. Gazpacho is the classic crazy orange cat. Pierogi is a small black/white super cute kitten :3", 
            "Parrots too. He managed to domesticate a cockatiel once, it was really cute", 
            "Spiders freaks him out"], 68);

        this.npc_8 = new NPC(this.gameManager, this, 422, 443, "water_elemental",  3, 
            ["Search Forod Lad on Spotify or BandCamp. it's his Folk metal project. Top tier music for real", 
            "You know, he's a huuuuge fan of medieval and fantasy stuff. He has like 5 swords at home (thery're not for fighting).",
            "This is probably because his first approach on PC and videogames was Age of Empires II, when he was five or six", 
            "Favourite book? hitchhiker's guide to the galaxy"], 80);

        this.npc_9 = new NPC(this.gameManager, this, 423, 472, "necromancer",  3, 
            ["You really collected all that coins? Wow. Really, wow. Congratulations, pal", 
            "You know, probably started with Final Fantasy IX. That was way more than a videogame. That was pure art, pure philosophy.",
            "Growing up with that game in mind, it realle shapes what you become next. I will be forever grateful to that game.", 
            "Really."], 150);

        this.npc_10 = new NPC(this.gameManager, this, 534, 497, "fairy",  3, 
            ["Favourite band? Blind Guardian, definitely. But he goes mad for any project that does strange and crazy stuff", 
            "He once went in a ~1000Km road trip to see Blue Oyster Cult in live",
            "Likes to cook too. A decent chef, I would say"], 55);

        this.npc_11 = new NPC(this.gameManager, this, 280, 498, "iron_golem",  3, 
            ["He studied computer science at UniVR from 2015 to 2019. After that, he enrolled at three-year Game Programming course at private school AIV", 
            "AIV was a great experience, unfortunately mined by the coronavirus quarantine.".
            "He graduated in time nonetheless, starting to work as a web-developer while finishing the 2nd academic year"], 18);

        this.gameManager.create();

        const backgroundMusic = this.sound.add('bgm');
        backgroundMusic.setLoop(true);
        backgroundMusic.setVolume(0.05);

        backgroundMusic.play();
    }

    update() {
        this.npc_1.update();
        this.npc_2.update();
        this.npc_3.update();
        this.npc_4.update();
        this.npc_5.update();
        this.npc_6.update();
        this.npc_7.update();
        this.npc_8.update();
        this.npc_9.update();
        this.npc_10.update();
        this.npc_11.update();

        const speed = 100;
    
        this.input.keyboard.on('keydown-A', function() {
            this.character.setVelocityX(-speed);
            this.currentDirection = 'left';
        }, this);
        
        this.input.keyboard.on('keydown-D', function() {
            this.character.setVelocityX(speed);
            this.currentDirection = 'right';
        }, this);
        
        this.input.keyboard.on('keydown-W', function() {
            this.character.setVelocityY(-speed);
            this.currentDirection = 'back';
        }, this);
        
        this.input.keyboard.on('keydown-S', function() {
            this.character.setVelocityY(speed);
            this.currentDirection = 'front';
        }, this);
        
        this.input.keyboard.on('keyup', function(event) {
                this.character.setVelocityX(0);
                this.character.setVelocityY(0);       
        }, this);
    
        // Avvia l'animazione corrispondente alla direzione corrente
        if (this.character.body.velocity.x === 0 && this.character.body.velocity.y === 0) {
            switch (this.currentDirection) {
                case 'left':
                    this.character.anims.play('idle_left', true);
                    break;
                case 'right':
                    this.character.anims.play('idle_right', true);
                    break;
                case 'back':
                    this.character.anims.play('idle_back', true);
                    break;
                case 'front':
                    this.character.anims.play('idle_front', true);
                    break;
            }
        } else {
            // Se il personaggio si muove, avvia l'animazione di movimento corrispondente
            switch (this.currentDirection) {
                case 'left':
                    this.character.anims.play('walk_left', true);
                    break;
                case 'right':
                    this.character.anims.play('walk_right', true);
                    break;
                case 'back':
                    this.character.anims.play('walk_back', true);
                    break;
                case 'front':
                    this.character.anims.play('walk_front', true);
                    break;
            }
        }
    }


}

class Menu extends Phaser.Scene {

    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
        this.load.image('playButton', 'assets/images/ui/play_button.png');
        this.load.image('playButton_hover', 'assets/images/ui/play_button_hover.png');
        this.load.image('invisible_background', 'assets/images/ui/invisible_background.png');

        this.load.audio('play', 'assets/audio/play.wav');

    }

    create() 
    {
        const version = "1.1.2";
        const playButton = this.add.image(480 / 2, 360 / 2 + 60, 'playButton').setInteractive();
        playButton.setScale(0.1);

        // Aggiungi evento per mostrare il pulsante hover quando il mouse è sopra il pulsante
        playButton.on('pointerover', () => {
            playButton.setTexture('playButton_hover');
            this.game.canvas.style.cursor = 'pointer';
        });

        // Aggiungi evento per rimuovere il pulsante hover quando il mouse esce dal pulsante
        playButton.on('pointerout', () => {
            playButton.setTexture('playButton');
            this.game.canvas.style.cursor = 'default';
        });

        // Aggiungi evento per avviare la scena Overworld quando il pulsante viene cliccato
        playButton.on('pointerdown', () => {

            this.sound.add('play');           
            const soundEffect = this.sound.get('play');
        soundEffect.setVolume(0.1);
            
            soundEffect.play();
            this.scene.start('Overworld');
        });

        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        const pixelGroup = this.add.group();
        const numPixelsX = 100;
        const pixelWidth = width / numPixelsX;
        const pixelHeight = 32; 
        const startY = height - 32; 


        for (let x = 0; x < numPixelsX; x++) 
        {
            const color = Phaser.Display.Color.RandomRGB();

            const pixel = this.add.graphics({ x: x * pixelWidth, y: startY });
            pixel.fillStyle(color.color, 1);
            pixel.fillRect(0, 0, pixelWidth, pixelHeight); 

            pixelGroup.add(pixel);
        }

        this.time.addEvent({
            delay: 50, 
            loop: true,
            callback: () => {
                pixelGroup.getChildren().forEach(pixel => {
                    const randomValue = Phaser.Math.Between(0, 1);
                    if (randomValue === 0) {
                        pixel.alpha = 0; 
                    } else {
                        pixel.alpha = 1; 
                    }
                });
            }
        });

        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        this.welcomeText = new ScrollableTextBox(this, 15, 15, 450, 330, 
            `Francesco Peruzzi - Software Developer - ${dd}/${mm}/${yyyy}\n
            version: ${version} -- Unity-based 2.0 Coming Soon!\n\n\n
            welcome! This is an interactive curriculum created both to give you moments of leisure during your hard work and to introduce me better as a developer.\n\n 
            Don't worry, if you want the normal pdf curriculum you will find it downloadable inside!\n\n Have fun!`, 11, false);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 360,
    scale: {
        parent: 'phaser',
        zoom: window.screen.availWidth / 480 / 2
    },
    scene: [Menu, Overworld],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};

const game = new Phaser.Game(config);