let card;
let logo;
let char1 = 0;
let char2 = 0;
let card_width = 100;
let card_height = 145.2;
let hidden_card = 52;
let global_control = true;
let deck_count = 52;
let table_count = 0;
let back1,back2;
let compare = false;
let move = false;
let player1_score = 0;   // Player score variable
let player2_score = 0;
let warLogo;
let backgroundLogo;
let endBackground;
let startBackground;
let rulesBackground;
let warBackground;
let scoreFont;
let coolFont;
let myInput;
let startButton;
let backButton;
let myText = '';
let playButton;
let replayButton;
let rulesButton;
let aboutButton;
let index_hidden = -1;
let warCondition = false;
let warCardsPile = false;
let clickToSeeResult = false;
let warCounter = 0;
let numberOfCardsInPile = 0;
let doubleWar = false;
let speedSlider;

// Screen state is how we can transition between title-game-gameover screens etc.
// 0 = StarScreen
// 1 = Game Screen
// 2 = Game Over
// 3 = Transition trigger to game over
let screen_state = 0;


let names = [
'02_of_clubs.png','02_of_diamonds.png','02_of_hearts.png','02_of_spades.png',
'03_of_clubs.png','03_of_diamonds.png','03_of_hearts.png','03_of_spades.png',
'04_of_clubs.png','04_of_diamonds.png','04_of_hearts.png','04_of_spades.png',
'05_of_clubs.png','05_of_diamonds.png','05_of_hearts.png','05_of_spades.png',
'06_of_clubs.png','06_of_diamonds.png','06_of_hearts.png','06_of_spades.png',
'07_of_clubs.png','07_of_diamonds.png','07_of_hearts.png','07_of_spades.png',
'08_of_clubs.png','08_of_diamonds.png','08_of_hearts.png','08_of_spades.png',
'09_of_clubs.png','09_of_diamonds.png','09_of_hearts.png','09_of_spades.png',
'10_of_clubs.png','10_of_diamonds.png','10_of_hearts.png','10_of_spades.png',
'01_ace_of_clubs.png','01_ace_of_diamonds.png','01_ace_of_hearts.png','01_ace_of_spades.png',
'11_jack_of_clubs2.png','11_jack_of_diamonds2.png','11_jack_of_hearts2.png','11_jack_of_spades2.png',
'12_queen_of_clubs2.png','12_queen_of_diamonds2.png','12_queen_of_hearts2.png','12_queen_of_spades2.png',
'13_king_of_clubs2.png','13_king_of_diamonds2.png','13_king_of_hearts2.png','13_king_of_spades2.png'
];

//Randomly shuffling cards: 
let randomize = (arr, n) =>
{
    // Start from the last element and swap
    // one by one. We don't need to run for
    // the first element that's why i > 0
    for (let i = n - 1; i > 0; i--)
    {
        // Pick a random index from 0 to i inclusive
        let j = Math.floor(Math.random() * (i + 1));
        // Swap arr[i] with the element
        // at random index
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

randomize(names,names.length);


let cards_1 = new Array();

let cards_2 = new Array();

let deck1_count, deck2_count;

let displace;
let index2 = -1;
let index1 = -1

class Card{
  constructor(x,y,imgFaceUp,imgFaceDown,name){
    this.x = x;
    this.y = y;
    this.imgFaceUp = imgFaceUp;
    this.imgFaceDown = imgFaceDown;
    this.name = name;
  }

  showFaceUp(){
    image(this.imgFaceUp, this.x, this.y,card_width,card_height);
  }

  showFaceDown(){
    image(this.imgFaceDown, this.x, this.y,card_width,card_height);
  }

  move(){ 
    if(move){
      if(this.y > height/2 - card_height/2 + 10){
        this.y -= displace;
      }else if(this.y < height/2 - card_height/2 - 10){
        this.y += displace;
      }else{
        compare = true;
        move = false;
        if (warCondition && (index_hidden + 4 == index1)) {
          warCondition = false;
          warCardsPile = true;
        }

        if (warCondition) {
          warCounter += parseInt(char1) + parseInt(char2);
        }
        if (doubleWar) {
          numberOfCardsInPile += 4;
          doubleWar = false;
        }
        if (!warCondition) {
          numberOfCardsInPile = 4;
        }
      }
    }
  }

  moveTo(x,y){

    if(this.x < x){
      this.x+=displace;
    }

    if(this.x > x){
      this.x-=displace;
    }

    if(this.y < y){
      this.y+=displace;
    }

    if(this.y > y){
      this.y-=displace;
    }

    if(Math.abs(this.x - x) < displace  && Math.abs(this.y - y) < displace){
      global_control=true;
      compare = false;
      // Player score increase
      // Current Implementation is just checking if the cards position is < half the screen width after it's moved
      // if (this cards position < ( screen width / 2))
      // TODO: screen width needs to be set as a variable and same with height.
      if (!warCondition) {
        updateScore.call(); // Increase player score
      }
      warCardsPile = false;
      index_hidden = -1;

      if (warCondition && warCardsPile) {
        doubleWar = true;
      }

      if (index1 == 25) {
        clickToSeeResult = true;
      }
    }

  }

  clicked(){
    if((mouseX > this.x && mouseX < this.x+card_width) && (mouseY > this.y && mouseY < this.y + card_height)){
      if(global_control){
        global_control = false;
        move = true;
        index1++;
        index2++;
      }
    }
  }
}

function setup() {
  // put setup code here 
  createCanvas(800,800);

  myInput = createInput('');
  myInput.position(290, 397);
  myInput.size(200,20);
  myInput.hide();

  startButton = createButton('Start');
  startButton.position(width/2.33, height/1.86);
  startButton.size(100,30);
  startButton.mousePressed(startButtonClicked);
  startButton.hide();

  backButton = createButton('Back to main menu');
  backButton.position(width/2.45, height/1.13);
  backButton.size(140,30);
  backButton.mousePressed(backButtonClicked);
  backButton.hide();

  playButton = createButton('Play');
  playButton.position(width/2.3, height/2);
  playButton.size(100,30);
  playButton.mousePressed(playButtonClicked);
  playButton.hide();

  replayButton = createButton('Replay');
  replayButton.position(width/2.16, height/2);
  replayButton.size(100,30);
  replayButton.mousePressed(replayButtonClicked);
  replayButton.hide();

  rulesButton = createButton('Rules');
  rulesButton.position(width/2.3, height/1.8);
  rulesButton.size(100,30);
  rulesButton.mousePressed(rulesButtonClicked);
  rulesButton.hide();

  aboutButton = createButton('About');
  aboutButton.position(width/2.3, height/1.64);
  aboutButton.size(100,30);
  aboutButton.mousePressed(aboutButtonClicked);
  aboutButton.hide();

  speedSlider = createSlider(1,15,7);
  speedSlider.size(100);
  speedSlider.hide();

  let i=0;
  while(i<26){
    
    let imgFaceUp = loadImage('assets/cards/'+names[i]);
    let imgFaceDown = loadImage('assets/cards/back_of_card_blue.png');
    cards_1[i] = new Card((2*width)/3 - card_width/2, height - card_height - 10 , imgFaceUp, imgFaceDown, names[i]);

    imgFaceUp = loadImage('assets/cards/'+names[i+26]);
    imgFaceDown = loadImage('assets/cards/back_of_card.png');
    cards_2[i] = new Card(width/3 - card_width/2, 10 , imgFaceUp, imgFaceDown, names[i+26]);
    i++;
  }

  imgFaceUp = loadImage('assets/cards/back_of_card.png');
  imgFaceDown = loadImage('assets/cards/back_of_card.png');
  back2 = new Card(width/3 - card_width/2, 10 , imgFaceUp, imgFaceDown);

  imgFaceUp = loadImage('assets/cards/back_of_card_blue.png');
  imgFaceDown = loadImage('assets/cards/back_of_card_blue.png');
  back1 = new Card((2*width)/3- card_width/2, height - card_height - 10 , imgFaceUp, imgFaceDown);

}

function draw() {

  // Screen state check to determine game state
  if (screen_state == 0) {
    startScreen();
  } else if (screen_state == 1) {
    startGameScreen();
  } else if (screen_state == 2) {
    gameRunning();
  } else if (screen_state == 3) {
    endGame();
  } else if (screen_state == 4) {
    displayRules();
  } else if (screen_state == 5) {
    displayAbout();
  }

}

function startButtonClicked() {
  screen_state = 2;
  myInput.hide();
  startButton.hide();
  backButton.hide();
  myText = myInput.value();
}

let backButtonState = false;
function backButtonClicked(){
  screen_state = 0;
  backButton.hide();
  myInput.hide();
  startButton.hide();
  replayButton.hide();
  speedSlider.hide();
  backButtonState = true;
  resetGame();
}

function playButtonClicked(){
  screen_state = 1;
  playButton.hide();
  rulesButton.hide();
  aboutButton.hide();
}

function replayButtonClicked(){
  screen_state = 2;
  replayButton.hide();
  backButton.hide();
  resetGame();
}

function rulesButtonClicked(){
  screen_state = 4;
  rulesButton.hide();
  playButton.hide();
  aboutButton.hide();
}

function aboutButtonClicked() {
  screen_state = 5;
  playButton.hide();
  rulesButton.hide();
  aboutButton.hide();
}

function displayRules(){
  background(rulesBackground);
  backButton.show();
  fill(165,42,42);
  textAlign(CENTER);
  textSize(40);
  textFont(coolFont);
  text("Rules of WAR Card Game!", 400, 60);
  textSize(17);
  fill(0,0,0);
  text("War is a very simple card game for two players. Much like real war it's incredibly long", 400, 110);
  text("and pointless. It's mostly a kids game, since it relies exclusively on luck of the draw.", 400, 140);
  text("Like most card games it has plenty of regional variations, but the rules used on this site", 400, 170);
  text("are simple. The game is played as follows:", 400, 200);
  text("1. Each player gets dealt half the deck, 26 cards, and the cards are put face down", 400, 250);
  text("in a stack in front of the players.", 400, 280);
  text("2. Both players turn their top card face up at the same time. The person with the", 400, 310);
  text("higher card wins that draw, and takes both the cards.", 400, 340);
  text("3. If both players draw a card of the same rank, e.g. they both draw 8s, then", 400, 370);
  text("there's a war. The face up cards are left on the table and each player puts three", 400, 400);
  text("cards face down on the table, and then puts one card face up. The face up card", 400, 430);
  text("determines who wins the war and gets all 10 cards that are on the table at this", 400, 460);
  text("point. If the face up card is again the same rank, then the war goes on, three", 400, 490);
  text("more face down, one face up etc.", 400, 520);
  text("4. The player with the highest score at the end wins.", 400, 550);
  text("5. If the players finish their cards during a war without having enough cards to", 400, 580);
  text("finish the war then they Draw the game.", 400, 610);
  text("That's all there is to it. Just a lot of clicking on cards and hoping for the best! Enjoy :)", 400, 660);

}

function displayAbout() {
  background(rulesBackground);
  backButton.show();
  fill(165,42,42);
  textAlign(CENTER);
  textSize(40);
  textFont(coolFont);
  text("Welcome to War!", 400, 80);
  //textAlign(RIGHT);
  textSize(17);
  fill(0,0,0);
  text("Class: CS33901 Software Engineering", 400, 130);
  text("Professor: Dr. Gregory DeLozier", 400, 160);
  text("Developers: David Russell, Yassine Lamtalaa, Nicholas Davis, Andrew Vanas,", 400, 190);
  text("Riley Myers, Mohamed Rissal Hedna", 400, 220);
  text("With less than 12 weeks to learn a completely new technology stack and learn the scrum", 400, 270);
  text("routine, our group developed the idea of creating an online war card game using p5js.", 400, 300);
  text("The idea of creating an online version of the famous 'War' card game came about when", 400, 330);
  text("we were told to make a simple game that was fun and interactive. Our group voted", 400, 360);
  text("on a couple of ideas but ultimately War won the poll.", 400, 390);
  text("At the beginning of the spring '22 semester at Kent State University, we were told that", 400, 440);
  text("we needed a complete product to show off in front of real software engineers by the end", 400, 470);
  text("of the semester. After countless hours between the six of us developers, we are excited", 400, 500);
  text("to present our final product. This project has been an amazing experience for all of us", 400, 530);
  text("and it has made us excited to become future software engineers in the real world!", 400, 560);
}

// Start screen is when screen state == 0
function startScreen() {
  background(startBackground);
  playButton.show();
  rulesButton.show();
  aboutButton.show();
  image(logo, 150, 50); // Title Screen Logo Image
  fill(100,100,255);
  textAlign(CENTER);
  textSize(30);
  textFont(coolFont);
  text("Welcome to War Card Game!", 800/2 - 20, 800/2 - 80);
}


function startGameScreen() {
  background(startBackground);
  myInput.show();
  startButton.show();
  backButton.show();
  image(logo, 150, 50); // Title Screen Logo Image
  fill(100,100,255);
  textAlign(CENTER);
  textSize(30);
  textFont(coolFont);
  text("Are you ready for WAR?!", 800/2 - 20, 800/2 - 100);
  fill(200,200,100);
  textSize(20);
  text("Enter your name!", 800/2 - 15, 800/2 - 20);
}

// Game running is when screen state == 1
// Main game logic and functions will be ran in this function
function gameRunning() {

  if (warCondition) {
    background(warBackground);
    image(warLogo, 200, 50);
    warLogo.resize(400,400);
  } else {
    background(backgroundLogo);
  }

  backButton.show();
  backButton.position(30,30);

  fill(255,127,127);
  rect(16, 73, 48, 18, 6, 6, 6, 6);
  textFont(scoreFont);
  fill(0,0,0);
  textSize(14);
  text("Speed:", 40, 86);

  speedSlider.show();
  speedSlider.position(80,80);

  displace = speedSlider.value();

  for (let i=0; i<26; ++i) {
    if ((warCondition) && (i == index_hidden + 1 || i == index_hidden + 2 || i == index_hidden + 3)) {
      cards_1[i].showFaceDown();
      cards_2[i].showFaceDown();
    } else {
      cards_1[i].showFaceUp();
      cards_2[i].showFaceUp();
    }
  }

  

  if((index1>=0 && index1<names.length/2)&&(index2>=0 && index2<names.length/2)){
    cards_1[index1].move();
    cards_2[index2].move();
  }
  if (index1 < 25) {
    back1.showFaceDown();
    back2.showFaceDown();
  }

  // Draw the player score to screen
  // TODO: Style the text appropriately
  textSize(25);
  fill(255,0,0);
  textFont(scoreFont);
  if (myText == ''){
    text("Human: " + player1_score, 80, 780);
  } else {
    text(myText + ": " + player1_score, 80, 780);
  }
  text("Computer: " + player2_score, 700, 80);
  textSize(16);
  textFont(coolFont);
  if (index1 < 25) {
    textSize(16);
    textFont(coolFont);
    fill(193,248,207);
    rect(600, 680, 180, 50, 10, 10, 10, 10);
    fill(40,40,40);
    text("Click on your top card", 690, 700);
    text("to play it", 690, 720);
  }

  if(compare){
    char1 = cards_1[index1].name.charAt(0)+cards_1[index1].name.charAt(1);
    char2 = cards_2[index2].name.charAt(0)+cards_2[index2].name.charAt(1);
    
    if((char2 < char1) && (!warCondition)){
      
      if (warCardsPile) {
        for (let i=index_hidden; i<=index_hidden + numberOfCardsInPile; ++i) {
          cards_1[i].moveTo(width/3- card_width/2, height - card_height - 10);
          cards_2[i].moveTo(width/3- card_width/2, height - card_height - 10);
        }
        
      } else {
        cards_1[index1].moveTo(width/3- card_width/2, height - card_height - 10);
        cards_2[index2].moveTo(width/3- card_width/2, height - card_height - 10);
      }
    }else if((char1 < char2) && (!warCondition)){
      
      if (warCardsPile) {
        for (let i=index_hidden; i<=index_hidden + numberOfCardsInPile; ++i) {
          cards_1[i].moveTo((2*width)/3- card_width/2, 10);
          cards_2[i].moveTo((2*width)/3- card_width/2,10);
        }
      } else {
        cards_1[index1].moveTo((2*width)/3- card_width/2, 10);
        cards_2[index2].moveTo((2*width)/3- card_width/2,10);
      }
    }else if((char1 == char2) && (!warCondition)){
      
      compare = false;
      warCondition = true;
      index_hidden = index1;
      global_control = true;
    } else {
      compare = false;
      global_control = true;
    }

  }
  
  if (clickToSeeResult) {
    textSize(16);
    textFont(coolFont);
    fill(255,127,127);
    rect(484, 730, 100, 60, 10, 10, 10, 10);
    fill(40,40,40);
    text("Click for", 534, 754);
    text("Result!", 534, 774);
  }
  
  // Screen State check for game over condition
  // if the length of the cards array is equal to index set state to 3
  if (index1 == 26) {
    screen_state = 3;
  }
}

function updateScore(){
  if (char1 > char2){
    player1_score += parseInt(char1) + parseInt(char2) + warCounter;
  } else if (char1 < char2){
    player2_score += parseInt(char1) + parseInt(char2) + warCounter;
  }
  warCounter = 0;
}

// End game is when the screen state == 2
// this is currently triggered by a check of the array length and index in gameRunning()
function endGame() {

  background(endBackground);
  speedSlider.hide();
  replayButton.show();
  replayButton.position(340, height/2.08);
  replayButton.size(150,30);
  backButton.show();
  backButton.position(340, height/1.88);
  backButton.size(150,30);
  textSize(30);
  fill(100,100,255);
  textAlign(CENTER);
  textFont(coolFont);
  if (myText == '') {
    myText = 'Human'
  }
  if (warCondition) {
    text("Draw!", 800/1.8 - 45, 800/2.6-10);
    textSize(20);
    text("Not enough cards", 800/1.8 - 45, 800/2.6 + 20);
    text("to finish the WAR!", 800/1.8 - 45, 800/2.6 + 40);
  } else {
  if (player1_score > player2_score) {
    text("You WON, " + myText + "!", 800/1.8 - 45, 800/2.6 - 10);
    text("Great Job!", 800/1.8 - 45, 800/2.6 + 30);
  } else if (player1_score < player2_score) {
    text("Sorry " + myText + ", You Lost!", 800/1.8 - 45, 800/2.6 - 10);
    text("Good luck next time!", 800/1.8 - 45, 800/2.6 + 30);
  } else {
    text("Draw!", 800/1.8 - 45, 800/2.6);
    }
  }
}

function mousePressed(){
  back1.clicked();
}

function preload(){
  logo = loadImage('assets/UI/logo.png');
  warLogo = loadImage('assets/UI/warLogo.png');
  startBackground = loadImage('assets/UI/startBackground.jpg');
  backgroundLogo = loadImage('assets/UI/cardBackground.jpg');
  endBackground = loadImage('assets/UI/endBackground.jpg');
  rulesBackground = loadImage('assets/UI/rulesBackground.jpg');
  warBackground = loadImage('assets/UI/warBackground.jpg');
  scoreFont = loadFont('assets/fonts/PermanentMarker-Regular.ttf');
  coolFont = loadFont('assets/fonts/CreteRound-Regular.ttf');
}

function resetGame(){

  index1 = -1;
  index2 = -1
  cards_1 = [];
  cards_2 = [];
  char1 = 0;
  char2 = 0;
  player1_score = 0;
  player2_score = 0;
  if (backButtonState) {
    myText = '';
  }
  backButtonState = false;
  compare = false;
  move = false;
  global_control = true;
  warCondition = false;
  warCardsPile = false;
  index_hidden = -1;
  clickToSeeResult = false;
  randomize(names,names.length);
  setup();
  draw();
}