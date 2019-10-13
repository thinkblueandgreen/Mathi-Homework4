
//  landing page

var latchBtnEl = document.getElementById("startBtn");
var h3El = document.createElement("h3");
h3El.innerHTML = "Click the button to start the quiz";
h3El.setAttribute('style', 'color: grey; padding: 40px 10px');
latchBtnEl.appendChild(h3El);
var btnEl = document.createElement("BUTTON");
btnEl.innerHTML = "START";
latchBtnEl.appendChild(btnEl);
btnEl.addEventListener("click", renderQuestion);
btnEl.setAttribute('style', 'background-color: purple; padding: 10px 30px; color: white ')

// initializing the variables
var questionNumber = 0;
var test, progressOfTest, question, option, options, optionA, optionB, optionC, optionD = 0;
var correct = 0;
var highscoreLocal = 0;

var resultEl = document.getElementById("result");

var score = 0;

// timer

function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = secondsLeft;
        if (secondsLeft === 0 || btnEl) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 7500);
}

// two dimenstional array

var questionset = [
    ["How many national parks are in US?", "12", "61", "50", "104", "B"],
    ["Which is the smalles national park?", "Borrego Springs", "Jacumba Springs", "Hot Springs", "Grand Teton", "C"],
    ["How many national parks are in California", "8", "4", "25", "10", "A"],
    ["What national park reaches into 3 states", "Grand Canyon", "Niagra falls", "Yellow Stone", "Dry Tortugas", "C"],
    ["Which is the largest national park", "Wrangell-St.Elias", "Great Smokies", "Olympics", "Grand Canyon", "A"]
];

function currentStatus(number) {
    return document.getElementById(number);
}

// displaying questions and options

function renderQuestion() {

    latchBtnEl.style.display = "none";

    // getting out of the loop and displaying results at the end of the quiz

    test = currentStatus("test");
    test.style = "color: grey";
    if (questionNumber >= questionset.length) {
        test.innerHTML = "<h2>You got " + correct + " of " + questionset.length + " questions correct</h2>" + "<p>" + "Your score is " + score;

        // dsipalying the score and trying to compare with highscore(local storage)


        var highScores = document.getElementById("highscore");
        highScores.innerHTML = "View Highscore : " + score;

        localStorage.setItem("highscoreStorage", JSON.stringify(score));
        var highscoreLocal = JSON.parse(localStorage.getItem("highscoreStorage"));

        currentStatus("progressOfTest").innerHTML = "Test Completed" + "<br>" + "<br>";
        currentStatus("progressOfTest").setAttribute("style", "color: green");

        questionNumber = 0;
        correct = 0;
        return;
    }

    currentStatus("progressOfTest").innerHTML = "Question " + (questionNumber + 1) + " of " + questionset.length + "<br>" + "<br>";
    currentStatus("progressOfTest").style = "color: #696969";
    question = questionset[questionNumber][0];
    optionA = questionset[questionNumber][1];
    optionB = questionset[questionNumber][2];
    optionC = questionset[questionNumber][3];
    optionD = questionset[questionNumber][4];
    test.innerHTML = "<h3>" + question + "</h3>" + "<br>";
    test.innerHTML += "<input type='radio' name='options' value='A'> " + optionA + "<br>";
    test.innerHTML += "<input type='radio' name='options' value='B'> " + optionB + "<br>";
    test.innerHTML += "<input type='radio' name='options' value='C'> " + optionC + "<br>";
    test.innerHTML += "<input type='radio' name='options' value='D'> " + optionD + "<br>" + "<br>" + "<br>";


    test.innerHTML += "<button onclick='checkAnswer()'>Next Question</button>";
}

// comparing user selected option with the answer

function checkAnswer() {
    options = document.getElementsByName("options");

    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            option = options[i].value;

        }
    }
    if (option === questionset[questionNumber][5]) {
        resultEl.innerHTML = "Correct";
        correct++;
        score = score + 5;

    }
    else {
        resultEl.innerHTML = "<p> Wrong </p>";
    }
    questionNumber++;
    renderQuestion();
}



