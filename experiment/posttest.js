
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------
const myQuestions = [
  {
    question: "If H is the head available for a hydraulic turbine, the power, speed and discharge, respectively are proportional to",
    answers: {
      a: "H<sup>1/2</sup>,H<sup>1/2</sup>, H<sup>3/2</sup>",
      b: "H<sup>3/2</sup>, H<sup>1/2</sup>, H<sup>1/2</sup>",
      c: "H<sup>1/2</sup>, H<sup>3/2</sup>, H<sup>1/2</sup>",
      d: "H<sup>1/2</sup>, H<sup>1/2</sup>, H"
    },
    correctAnswer: "b"
  },

  {
    question: "Which of the following advantages is/are possessed by a Kaplan turbine over a Francis turbine?<br>A. Low frictional losses.<br>B. Part load efficiency is considerably high.<br>C. More compact and smaller in size.<br>Select the correct answer using the codes given below.",
    answers: {
      a: "Only A",
      b: "Only A and B",
      c: "Only B and C",
      d: "A, B and C"
    },
    correctAnswer: "d"
  },

  {
    question: "The diameter of the turbine runner varies as",
    answers: {
      a: "Square of power for the given head",
      b: "Square of discharge for the given speed",
      c: "Square root of the speed for given head",
      d: "Square root of the head for given speed"
    },
    correctAnswer: "d"
  },
  {
    question: "The cavitation in reaction turbines is avoided, to a great extent by",
    answers: {
      a: "Using stainless steel runner of the turbine",
      b: "Installing the turbine below the tail race level",
      c: "Providing highly polished blades to the runner",
      d: "All of the above"
    },
    correctAnswer: "d"
  },
  {
    question: "Specific speed of the hydraulic turbine is defined as the speed of such a turbine",
    answers: {
      a: "It consumes unit discharge under unit speed",
      b: "It consumes unit discharge to develop one metric HP",
      c: "It develops one metric HP under unit head",
      d: "It runs at unit speed under unit head"
    },
    correctAnswer: "c"
  }
];



// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
