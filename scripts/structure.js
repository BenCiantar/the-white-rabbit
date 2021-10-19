//Navigation functions


let main = document.getElementById("main");
let body = document.getElementById("bodyId");

//Loading the landingpage

document.getElementById("bodyId").onload = function () {
  //   createLandingPage();
  createLandingPage();
};

function createLandingPage() {
  checkLocalDataExists();
  main.innerHTML = ` 
      <div class = "card">
      <img id= "logo" onclick="createLandingPage()" src="./images/rabbitpic.png" alt="white-rabbit icon">
      <img id= "logo-back" onclick="createLandingPage()" src="./images/ce2c8850dec0b2027695c3e56bc25708-removebg-preview (1).png" alt="white-rabbit icon">
      </div>
      <div id="wrapper_landingpage">
        <img id="gif_choose_score_play" src="./images/Start_game.gif" alt="reflection in sunglasses of two hands holding a blue and a red pill ">

        <button class="button_landingpage" id="button_play" onclick="difficultyPage()">play</button>
        <button class="button_landingpage" id="button_score" onclick="openHighscorePage()">score</button>
    </div>`;
}

//Declare arrays for inserting high score data
let gameDates = [];
let gameTimes = [];
let gameReacts = [];
let gameDiffs = [];

function retrieveHighscores() {
  checkLocalDataExists();
  let scoreArray = JSON.parse(localStorage.getItem("GameArray"));

  for (i = 0; i < 10; i++) {
    if (scoreArray[i]) {
      gameDates[i] = scoreArray[i].date;
      gameTimes[i] = scoreArray[i].time + "s";
      gameReacts[i] = scoreArray[i].react + "ms";
      gameDiffs[i] = scoreArray[i].diff;
    } else {
      gameDates[i] = "-";
      gameTimes[i] = "-";
      gameReacts[i] = "-";
      gameDiffs[i] = "-";
    }
  }
}

function openHighscorePage() {
  retrieveHighscores();
  let tableData = "";

  for (i = 0; i < 10; i++) {
    tableData += `
        <tr>
            <td class="table-rank">${i + 1}</td>
            <td class="table-date">${gameDates[i]}</td>
            <td class="table-time">${gameTimes[i]}</td>
            <td class="table-react">${gameReacts[i]}</td>
            <td class="table-difficulty">${gameDiffs[i]}</td>
        </tr>
        `;
  }

  main.innerHTML = `
    <div class = "card">
    <img id= "logo" onclick="createLandingPage()" src="./images/rabbitpic.png" alt="white-rabbit icon">
    <img id= "logo-back" onclick="createLandingPage()" src="./images/ce2c8850dec0b2027695c3e56bc25708-removebg-preview (1).png" alt="white-rabbit icon">
    </div>
      <div id="box">
      </div>
      <section id="content"> 
      <h1>Highscores</h1>
        <table>
          <th class="table-rank table-header">Rank</th>
          <th class="table-date table-header">Date</th>
          <th class="table-time table-header">Time</th>
          <th class="table-react table-header">Average Speed</th>
          <th class="table-difficulty table-header">Difficulty</th>
          </tr>
          ${tableData}
        </table>
        <div id="highscore-btns">
          <button type="button" onclick="createLandingPage()">Home</button>
          <button type="button" onclick="clearHighscores()">Reset Highscores</button>
        </div>
      </section>
      `;
}

function clearHighscores() {
  let prompt = confirm("Are you sure you want to clear your highscores?");
  if (prompt == true) {
    localStorage.clear();
    openHighscorePage();
  } else {
    openHighscorePage();
  }
}

function difficultyPage() {
  let diffPage = `
    <div class = "card">
    <img id= "logo" onclick="createLandingPage()" src="./images/rabbitpic.png" alt="white-rabbit icon">
    <img id= "logo-back" onclick="createLandingPage()" src="./images/ce2c8850dec0b2027695c3e56bc25708-removebg-preview (1).png" alt="white-rabbit icon">
    </div>
    <section id="content">
      <div id="contentBox">
        <h1> CLICK THE RABBIT AS FAST AS POSSIBLE</h1>
        <div id="levelBtns">
          <button type="button" onclick="setDifficulty('Easy');">EASY</button>
          <button type="button" onclick="setDifficulty('Medium');">MEDIUM</button>
          <button type="button" onclick="setDifficulty('Hard');">HARD</button>
        </div>
        <embed src="images/tumblr_myo2hr97No1skltbdo1_500.gif"/>
      </div>
    </section>`;
  main.innerHTML = "";
  main.innerHTML = diffPage;
}

function launchGamePage() {
  var gamePage = `
  <div id="game-page" onclick="misclickPenaltyCounter()">
    <button onclick="clickPlayButton()">PLAY</button>
    <div id="rand_pos" class="rand"></div>
  </div>
  `;
  //clearing the html
  main.innerHTML = "";
  //adding the game page html
  main.innerHTML = gamePage;
}

let reactionArray = [34, 75, 83, 56, 64, 56, 33, 44, 67, 66]; //Temporary placeholder array for testing calculateAverageReaction

function displaySummary() {
  displayCharacter(finalTime);
  createGameObject(date, finalTime, avReactSpeed, difficulty);
  main.innerHTML = `
    <div class = "card">
    <img id= "logo" onclick="createLandingPage()" src="./images/rabbitpic.png" alt="white-rabbit icon">
    <img id= "logo-back" onclick="createLandingPage()" src="./images/ce2c8850dec0b2027695c3e56bc25708-removebg-preview (1).png" alt="white-rabbit icon">
    </div>
    <div id="box">
    </div>
    <section id="content">
    <div id="score-card">
      <div id="score">
        <h2>TIME: ${finalTime}s</h2>
        <h1>${gifText}</h1>
      </div>
      <div>
        <embed src="${gifLink}"/></div>
      </div>
      <div id="play-again">
        <p>Would you like to play again?</p><br/>
        <button id="yes-button" onclick="difficultyPage()">YES!</button>
        <button id="no-button" onclick="createLandingPage()">NO!</button>
        <button id="highscores" onclick="openHighscorePage()">Highscores</button>
      </div>
    </section>`;
}

let displayGif = [
  "./images/look-neo.gif",
  "./images/Agent Smith.gif",
  "./images/Trinity-3.gif",
  "./images/Morpheus.gif",
  "./images/cypher.gif",
];

let displayGifText = [
  "You are the Chosen One!",
  "You're bad! But your score isn't!",
  "Holy F**king Trinity",
  "Morpheus? More like Morphe-yes!",
  "Um, you suck!",
];

function displayCharacter(finalTime) {
  if (finalTime < 20) {
    gifLink = displayGif[0];
    gifText = displayGifText[0];
  } else if (finalTime < 30) {
    gifLink = displayGif[1];
    gifText = displayGifText[1];
  } else if (finalTime < 40) {
    gifLink = displayGif[2];
    gifText = displayGifText[2];
  } else if (finalTime < 40) {
    gifLink = displayGif[3];
    gifText = displayGifText[3];
  } else {
    gifLink = displayGif[4];
    gifText = displayGifText[4];
  }
}
