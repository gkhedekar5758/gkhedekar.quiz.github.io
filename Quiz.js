//#region QuestionsStatic
// let questionsArray = [
//   {
//     "question": "Inside which HTML element do we put the JavaScript??",
//     "choice1": "<script>",
//     "choice2": "<javascript>",
//     "choice3": "<js>",
//     "choice4": "<scripting>",
//     "answer": 1
//   },
//   {
//     "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
//     "choice1": "<script href='xxx.js'>",
//     "choice2": "<script name='xxx.js'>",
//     "choice3": "<script src='xxx.js'>",
//     "choice4": "<script file='xxx.js'>",
//     "answer": 3
//   },
//   {
//     "question": " How do you write 'Hello World' in an alert box?",
//     "choice1": "msgBox('Hello World');",
//     "choice2": "alertBox('Hello World');",
//     "choice3": "msg('Hello World');",
//     "choice4": "alert('Hello World');",
//     "answer": 4
//   },
//   {

//     "question": "What does GHz stand for?",
//     "answer": 4,
//     "choice4": "Gigahertz",
//     "choice1": "Gigahotz",
//     "choice2": "Gigahetz",
//     "choice3": "Gigahatz"
//   },
//   {
//     "question": "What amount of bits commonly equals one byte?",
//     "answer": 3,
//     "choice4": "64",
//     "choice1": "1",
//     "choice2": "2",
//     "choice3": "8"
//   },
//   {
//     "question": "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
//     "answer": 4,
//     "choice4": "Final",
//     "choice1": "Static",
//     "choice2": "Private",
//     "choice3": "Public"

//   },
//   {
//     "question": "Which data structure does FILO apply to?",
//     "answer": 1,
//     "choice4": "stack",
//     "choice1": "queue",
//     "choice2": "heap",
//     "choice3": "tree"
//   }
// ];


var questionsArray;
//now prepare the things
var MAX_QUESTION;
//#endregion


//#region logging
//console.log(document.location.href);
//console.log(document.location.href.substring(document.location.href.indexOf("?") + 1, document.location.href.length));
//#endregion
// how many question are there in the game

const SCORE_BONUS = 10;
const questionElement = document.querySelector(".question p");
const option1Element = document.querySelector("#opt1");
const option2Element = document.querySelector("#opt2");
const option3Element = document.querySelector("#opt3");
const option4Element = document.querySelector("#opt4");
const progressBarElement = document.querySelector(".progressBarFull");
const progressTextElement = document.querySelector(".progressText");
const scoreTextElement = document.querySelector(".scoreContent p");
const categoryTextElement = document.querySelector("#categoryText");
const DifficultyTextElement = document.querySelector("#DifficultyText");
const timerPara = document.querySelector(".timerRegion p");
//const questionTimerPara=document.querySelector(".questionTimer p");

var lastQuestionAnswered;
var score;
var timer = [0, 0, 0, 0];
var questionTimer = [0, 0, 0];
var timerIsRunning = false;
var intervalQuestion;
var intervalTimer;
var intervalSingleQuestion;
var userSelectedCategory = 0;
var userSelectedDifficulty = '';
var urlPart;
//when window loads initialize the game



lastQuestionAnswered = -1;
score = 0;
let scoreStorage = {
  C18: [0, 0, 0],
  C19: [0, 0, 0],
  C9: [0, 0, 0],
}

let timingStorage = {
  C18: [0, 0, 0],
  C19: [0, 0, 0],
  C9: [0, 0, 0],
}



fetchQuestions();
//startGame();

//initialize the storage

//fetch the question from webapi
function fetchQuestions() {
  if (document.location.href.includes('category=')) {
    userSelectedCategory = document.location.href.substring(document.location.href.indexOf('category=') + 9, document.location.href.indexOf('category=') + 11);
    //console.log(document.location.href.substring(document.location.href.indexOf('difficulty=')+11,document.location.href.length));
    //console.log(document.location.href.substring(document.location.href.indexOf('category=')+9,document.location.href.indexOf('category=')+11));
  }
  if (document.location.href.includes('difficulty=')) {
    userSelectedDifficulty = document.location.href.substring(document.location.href.indexOf('difficulty=') + 11, document.location.href.length);
  }
  urlPart = document.location.href.substring(document.location.href.indexOf("?") + 1, document.location.href.length);
  let url = 'https://opentdb.com/api.php?' + urlPart + '&type=multiple';

  let request = new XMLHttpRequest();
  request.open('GET', url);
  request.onreadystatechange = () => {
    if (request.status === 200 && request.readyState === 4) {
      var response = JSON.parse(request.response);
      if (response.response_code === 0)
        questionsArray = response.results;
      else
        document.location.href = "Error.html";
      startGame();
    }
  }
  request.onerror = () => {
    document.location.href = "Error.html";
  }

  request.send();
}

//start the game
function startGame() {
  //now prepare the things
  MAX_QUESTION = questionsArray.length;
  window.localStorage.removeItem('Score');
  window.localStorage.removeItem('Timing');
  LoadNextQuestion();
  if (!timerIsRunning) {
    timerIsRunning = true;
    intervalTimer = setInterval(startTimer, 10);
  }
  //intervalSingleQuestion=setInterval(questionTimerFun,10);
}

//setTimeout(LoadNextQuestion,5000);

function resetQuestionTimer() {
  var questionTimer = [0, 0, 0];
  clearInterval(intervalSingleQuestion); //clear the question interval first
  intervalSingleQuestion = setInterval(questionTimerFun, 10); // set it back. so that clock starts from zero -TODO
  LoadNextQuestion();
}
//this is global timer
function startTimer() {
  ////console.log("starttimer"+ timer[3] +"  "+timer[0]);
  var currentTime = padLeadingZero(timer[0]) + ":" + padLeadingZero(timer[1]) + ":" + padLeadingZero(timer[2]);
  timerPara.innerText = " Timer : " + currentTime;
  timer[3]++;

  timer[0] = Math.floor((timer[3] / 100) / 60);
  timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));

}

//this is for particular question
function questionTimerFun() {
  //question timer
  ////console.log("starttimer"+ timer[1] +"  "+timer[0]+" "+timer[2]);
  var currentQuestionTime = padLeadingZero(questionTimer[1])

  questionTimerPara.innerText = " Question Timer : " + currentQuestionTime;
  questionTimer[2]++;
  questionTimer[0] = Math.floor((questionTimer[2] / 100) / 60);
  questionTimer[1] = Math.floor((questionTimer[2] / 100) - (questionTimer[0] * 60));
  //questionTimer[1]=Math.floor(timer[2]  - (timer[0] * 6000));
}

function padLeadingZero(params) {
  if (+params <= 9)
    return "0" + params;
  else
    return params;
}

//load  the next question
function LoadNextQuestion() {
  lastQuestionAnswered++;
  clearInterval(intervalQuestion);
  ////console.log("LoadnextQuestion "+lastQuestionAnswered+"  "+ ((+lastQuestionAnswered+1)/MAX_QUESTION)*100);
  progressBarElement.style.width = `${((+lastQuestionAnswered) / MAX_QUESTION) * 100}%`;
  progressTextElement.innerText = ` Question ${lastQuestionAnswered + 1} of ${MAX_QUESTION}`;

  categoryTextElement.innerText = `Category :- ${questionsArray[lastQuestionAnswered].category}`;
  DifficultyTextElement.innerText = `Difficulty :- ${questionsArray[lastQuestionAnswered].difficulty.toUpperCase()}`;
  //let randomize=Math.floor(Math.random()* (4-1+1)+1);
  let answerArray = questionsArray[lastQuestionAnswered].incorrect_answers.concat([questionsArray[lastQuestionAnswered].correct_answer]);

  questionsArray[lastQuestionAnswered].incorrect_answers = RandomiseArray(answerArray);
  ////console.log(randomize);
  if (lastQuestionAnswered < MAX_QUESTION) {

    questionElement.innerHTML = questionsArray[lastQuestionAnswered].question;
    option1Element.innerHTML = questionsArray[lastQuestionAnswered].incorrect_answers[0];
    option2Element.innerHTML = questionsArray[lastQuestionAnswered].incorrect_answers[1];
    option3Element.innerHTML = questionsArray[lastQuestionAnswered].incorrect_answers[2];
    option4Element.innerHTML = questionsArray[lastQuestionAnswered].incorrect_answers[3]
  }

}

function RandomiseArray(paramArray) {
  let currentIndex = paramArray.length, randomIndex;
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex--;
  [paramArray[currentIndex], paramArray[randomIndex]] = [paramArray[randomIndex], paramArray[currentIndex]];

  return paramArray;
}
//check the answer
function checkAnswer(event) {

  let correctAnswer = questionsArray[lastQuestionAnswered].correct_answer; //this is correct answer
  //console.log(questionsArray[lastQuestionAnswered].correct_answer);
  //console.log(event.target.innerText)

  let userAns = this.id.substr(-1); //this answer user has given
  //console.log("useranswe "+userAns);
  const d = event.target;

  if (d.innerText === correctAnswer) {
    d.setAttribute("style", "color:white;");
    d.parentElement.setAttribute("style", "background-color :green; color:white;");
    //assign score as per difficuly
    if (questionsArray[lastQuestionAnswered].difficulty.toUpperCase() === 'EASY')
      score += SCORE_BONUS;
    else if (questionsArray[lastQuestionAnswered].difficulty.toUpperCase() === 'MEDIUM')
      score += (SCORE_BONUS + 10)
    else if (questionsArray[lastQuestionAnswered].difficulty.toUpperCase() === 'HARD')
      score += (SCORE_BONUS + 20)

    scoreTextElement.innerText = ` Score : ${score}`
  }
  else {
    d.setAttribute("style", "color:white;");
    d.parentElement.setAttribute("style", "background-color :red; ");
  }

  if (lastQuestionAnswered < MAX_QUESTION - 1) {
    intervalQuestion = setInterval(function () {
      d.removeAttribute("style");
      d.parentElement.removeAttribute("style");
      LoadNextQuestion();
    }, 500);
  }
  if (lastQuestionAnswered == MAX_QUESTION - 1) {
    ////console.log("checkAnswer "+lastQuestionAnswered);
    progressBarElement.style.width = `${((+lastQuestionAnswered + 1) / MAX_QUESTION) * 100}%`;
    progressTextElement.innerText = ` Question ${lastQuestionAnswered + 1} of ${MAX_QUESTION}`;
    clearInterval(intervalTimer);
    setInterval(function () {
      //TODO - set the local storage object

      setLocalStorageObjects('score', +userSelectedCategory, userSelectedDifficulty);
      setLocalStorageObjects('timing', +userSelectedCategory, userSelectedDifficulty);

      document.location.href = "End.html?" + urlPart;
      window.localStorage.setItem('currentScore', JSON.stringify(scoreStorage));
      ////console.log(timerPara.innerText);
      window.localStorage.setItem('currentTiming', JSON.stringify(timingStorage));
    }, 1000);
  }
  //lastQuestionAnswered++;

}

//set the local storage for this user score
function setLocalStorageObjects(what, category, userSelectedDifficulty) {
  if (what === 'score') {
    if (+category === 18) {
      switch (userSelectedDifficulty) {
        case 'easy':
          scoreStorage.C18 = [score, 0, 0];
          break;
        case 'medium':
          scoreStorage.C18 = [0, score, 0];
          break;
        case 'hard':
          scoreStorage.C18 = [0, 0, score];
          break;
        default:
          break;
      }
    } else if (+category === 19) {
      switch (userSelectedDifficulty) {
        case 'easy':
          scoreStorage.C19 = [score, 0, 0];
          break;
        case 'medium':
          scoreStorage.C19 = [0, score, 0];
          break;
        case 'hard':
          scoreStorage.C19 = [0, 0, score];
          break;
        default:
          break;
      }
    } else {
      switch (userSelectedDifficulty) {
        case 'easy':
          scoreStorage.C9 = [score, 0, 0];
          break;
        case 'medium':
          scoreStorage.C9 = [0, score, 0];
          break;
        case 'hard':
          scoreStorage.C9 = [0, 0, score];
          break;
        default:
          break;
      }
    }
  } else {
    let time = timerPara.innerText.substr(8, timerPara.innerText.length);
    if (+category === 18) {

      switch (userSelectedDifficulty) {
        case 'easy':
          timingStorage.C18 = [time, 0, 0];
          break;
        case 'medium':
          timingStorage.C18 = [0, time, 0];
          break;
        case 'hard':
          timingStorage.C18 = [0, 0, time];
          break;
        default:
          break;
      }
    } else if (+category === 19) {
      switch (userSelectedDifficulty) {
        case 'easy':
          timingStorage.C19 = [time, 0, 0];
          break;
        case 'medium':
          timingStorage.C19 = [0, time, 0];
          break;
        case 'hard':
          timingStorage.C19 = [0, 0, time];
          break;
        default:
          break;
      }
    } else {
      switch (userSelectedDifficulty) {
        case 'easy':
          timingStorage.C9 = [time, 0, 0];
          break;
        case 'medium':
          timingStorage.C9 = [0, time, 0];
          break;
        case 'hard':
          timingStorage.C9 = [0, 0, time];
          break;
        default:
          break;
      }
    }
  }
}
//setInterval(LoadNextQuestion,5000);

//************* event binding section *********************/
//bind the function to click event
option1Element.addEventListener("click", checkAnswer, false);
option2Element.addEventListener("click", checkAnswer, false);
option3Element.addEventListener("click", checkAnswer, false);
option4Element.addEventListener("click", checkAnswer, false);




