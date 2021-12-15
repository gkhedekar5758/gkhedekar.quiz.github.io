let WIN_SCORE = JSON.parse(window.localStorage.getItem("Winner_Score")) || {
    C18: [0, 0, 0],
    C19: [0, 0, 0],
    C9: [0, 0, 0],
};
let WIN_TIME = JSON.parse(window.localStorage.getItem("Winner_Time")) || {
    C18: [0, 0, 0],
    C19: [0, 0, 0],
    C9: [0, 0, 0],
};
let WIN_USER = JSON.parse(window.localStorage.getItem("Winner_User")) || {
    C18: ["", "", ""],
    C19: ["", "", ""],
    C9: ["", "", ""],
};

function setWinnerScore() {
    localStorage.setItem("Winner_Score", JSON.stringify(WIN_SCORE));
    localStorage.setItem("Winner_Time", JSON.stringify(WIN_TIME));
    localStorage.setItem("Winner_User", JSON.stringify(WIN_USER));
}
const CURRENT_SCORE = window.localStorage.getItem("currentScore");

//const Timing = window.localStorage.getItem("timing");
const CURRENT_Timing = window.localStorage.getItem("currentTiming");


let userSelectedCategory = document.location.href.substring(
    document.location.href.indexOf("category=") + 9,
    document.location.href.indexOf("&",document.location.href.indexOf("category=") + 10)
);
let userSelectedDifficulty = document.location.href.substring(
    document.location.href.indexOf("difficulty=") + 11,
    document.location.href.length
);

// const ScoreElement=document.querySelector("#score");
// const TimingElement=document.querySelector("#timing");
const UserScoreElement = document.querySelector("#UserScore");
const UserTimingElement = document.querySelector("#UserTiming");
const UserHighScoreAreaElement = document.querySelector(".UserHighScoreArea");
const UserNameElement = document.querySelector("#uname");

const BtnSaveElement = document.querySelector("#btnSave");

//table data

// console.log(WIN_SCORE);
// console.log(WIN_WIN_TIME.C18[0]);
//#region category table
//cat 1
setTable();

//#endregion

// var s = isNaN(MAX_SCORE.score) ? 0 : +MAX_SCORE.score;
// var t = MAX_SCORE.timing === undefined ? "00:00:00" : MAX_SCORE.timing;

// ScoreElement.innerText="Score : " +s;
// TimingElement.innerText="Timing : " + t;
setWinnerScore();
UserScoreElement.innerText = "Score : " + getScore(+userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_SCORE));

UserTimingElement.innerText = "Timing : " + getScore(+userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_Timing));;

let showAreaDoStuff = () => {
    UserHighScoreAreaElement.setAttribute("style", "display:block");
};
//now we should replace the score if the user has scored high score than last high score
let checkHighScore = () => {
    //console.log(JSON.parse("I am in check high score"));
    if (
        getScore(+userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_SCORE)) >
        getScore(+userSelectedCategory, userSelectedDifficulty, WIN_SCORE)
    ) {
        showAreaDoStuff();
    } else if (getScore(+userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_SCORE)) ===
        getScore(+userSelectedCategory, userSelectedDifficulty, WIN_SCORE) && TimingFunc(getScore(+userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_Timing))) >
        TimingFunc(getScore(+userSelectedCategory, userSelectedDifficulty, WIN_TIME))) {
        showAreaDoStuff();
    }

    // if(CURRENT_SCORE > s ){
    //     showAreaDoStuff();

    // }
    // else if(CURRENT_SCORE === s && TimingFunc(CURRENT_Timing) < TimingFunc(t)){
    //     showAreaDoStuff();
    // }
};

function setTable() {
    document.querySelector("#c18EasyUsername").innerText = WIN_USER.C18[0];
    document.querySelector("#c18EasyScore").innerText = WIN_SCORE.C18[0];
    document.querySelector("#c18EasyTime").innerText = WIN_TIME.C18[0];

    document.querySelector("#c18MediumUsername").innerText = WIN_USER.C18[1];
    document.querySelector("#c18MediumScore").innerText = WIN_SCORE.C18[1];
    document.querySelector("#c18MediumTime").innerText = WIN_TIME.C18[1];

    document.querySelector("#c18HardUsername").innerText = WIN_USER.C18[2];
    document.querySelector("#c18HardScore").innerText = WIN_SCORE.C18[2];
    document.querySelector("#c18HardTime").innerText = WIN_TIME.C18[2];

    //cat2
    document.querySelector("#c19EasyUsername").innerText = WIN_USER.C19[0];
    document.querySelector("#c19EasyScore").innerText = WIN_SCORE.C19[0];
    document.querySelector("#c19EasyTime").innerText = WIN_TIME.C19[0];

    document.querySelector("#c19MediumUsername").innerText = WIN_USER.C19[1];
    document.querySelector("#c19MediumScore").innerText = WIN_SCORE.C19[1];
    document.querySelector("#c19MediumTime").innerText = WIN_TIME.C19[1];

    document.querySelector("#c19HardUsername").innerText = WIN_USER.C19[2];
    document.querySelector("#c19HardScore").innerText = WIN_SCORE.C19[2];
    document.querySelector("#c19HardTime").innerText = WIN_TIME.C19[2];

    //cat3
    document.querySelector("#c9EasyUsername").innerText = WIN_USER.C9[0];
    document.querySelector("#c9EasyScore").innerText = WIN_SCORE.C9[0];
    document.querySelector("#c9EasyTime").innerText = WIN_TIME.C9[0];

    document.querySelector("#c9MediumUsername").innerText = WIN_USER.C19[1];
    document.querySelector("#c9MediumScore").innerText = WIN_SCORE.C9[1];
    document.querySelector("#c9MediumTime").innerText = WIN_TIME.C9[1];

    document.querySelector("#c9HardUsername").innerText = WIN_USER.C9[2];
    document.querySelector("#c9HardScore").innerText = WIN_SCORE.C9[2];
    document.querySelector("#c9HardTime").innerText = WIN_TIME.C9[2];
}

function getScore(category, difficulty, scoreObject) {

    if (+category === 18) {
        switch (difficulty) {
            case "easy":
                return scoreObject.C18[0];
            case "medium":
                return scoreObject.C18[1];
            case "hard":
                return scoreObject.C18[2];
            default:
                break;
        }
    } else if (+category === 19) {
        switch (difficulty) {
            case "easy":
                return scoreObject.C19[0];
            case "medium":
                return scoreObject.C19[1];
            case "hard":
                return scoreObject.C19[2];
            default:
                break;
        }
    } else if (+category === 9) {
        switch (difficulty) {
            case "easy":
                return scoreObject.C9[0];
            case "medium":
                return scoreObject.C9[1];
            case "hard":
                return scoreObject.C9[2];
            default:
                break;
        }
    }
};

let TimingFunc = (param) => {
    var hour = param.substr(0, 2);
    var min = param.substr(3, 2);
    var sec = param.substr(6, 2);
    var date = new Date("2012", "04", "12", hour, min, sec);
    //console.log(date.getTime());
    return date.getTime();
};

let btnSaveEventListener = () => {
     WIN_SCORE = JSON.parse(window.localStorage.getItem("Winner_Score"));
     WIN_USER = JSON.parse(window.localStorage.getItem("Winner_User"));
     WIN_TIME = JSON.parse(window.localStorage.getItem("Winner_Time"));

    if (+userSelectedCategory === 18) {
        switch (userSelectedDifficulty) {
            case "easy":
                WIN_SCORE.C18[0] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_SCORE));
                WIN_TIME.C18[0] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_Timing));
                WIN_USER.C18[0] = UserNameElement.value;
                break;
            case "medium":
                WIN_SCORE.C18[1] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_SCORE));
                WIN_TIME.C18[1] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_Timing));
                WIN_USER.C18[1] = UserNameElement.value;
                break
            case "hard":
                WIN_SCORE.C18[2] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_SCORE));
                WIN_TIME.C18[2] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_Timing));
                WIN_USER.C18[2] = UserNameElement.value;
                break;
            default:
                break;
        }
    } else if (+userSelectedCategory === 19) {
        switch (userSelectedDifficulty) {
            case "easy":
                WIN_SCORE.C19[0] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_SCORE));
                WIN_TIME.C19[0] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_Timing));
                WIN_USER.C19[0] = UserNameElement.value;
                break;
            case "medium":
                WIN_SCORE.C19[1] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_SCORE));
                WIN_TIME.C19[1] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_Timing));
                WIN_USER.C19[1] = UserNameElement.value;
                break
            case "hard":
                WIN_SCORE.C19[2] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_SCORE));
                WIN_TIME.C19[2] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_Timing));
                WIN_USER.C19[2] = UserNameElement.value;
                break;
            default:
                break;

        }
    } else if (+userSelectedCategory === 9) {
        switch (userSelectedDifficulty) {
            case "easy":
                WIN_SCORE.C9[0] = getScore(userSelectedCategory, userSelectedDifficulty,JSON.parse( CURRENT_SCORE));
                WIN_TIME.C9[0] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_Timing));
                WIN_USER.C9[0] = UserNameElement.value;
                break;
            case "medium":
                WIN_SCORE.C9[1] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_SCORE));
                WIN_TIME.C9[1] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_Timing));
                WIN_USER.C9[1] = UserNameElement.value;
                break
            case "hard":
                WIN_SCORE.C9[2] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_SCORE));
                WIN_TIME.C9[2] = getScore(userSelectedCategory, userSelectedDifficulty, JSON.parse(CURRENT_Timing));
                WIN_USER.C9[2] = UserNameElement.value;
                break;
            default:
                break;

        }
    }

    localStorage.setItem("Winner_Score", JSON.stringify(WIN_SCORE));
    localStorage.setItem("Winner_Time", JSON.stringify(WIN_TIME));
    localStorage.setItem("Winner_User", JSON.stringify(WIN_USER));
    setTable();
};
checkHighScore();
BtnSaveElement.addEventListener("click", btnSaveEventListener, false);
