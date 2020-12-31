
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
    question: "The overall efficiency of a reaction turbine is the ratio of",
    answers: {
      a: "Power produced by the turbine to the energy actually supplied by the turbine",
      b: "Actual work available at the turbine to the energy imparted to the wheel",
      c: "Work done on the wheel to the energy (or head of water) actually supplied to the turbine",
      d: "None of the above"
    },
    correctAnswer: "a"
  },

  {
    question: "As water flows through the runner of a reaction turbine, pressure acting on it would vary from",
    answers: {
      a: "More than atmospheric pressure to vacuum",
      b: "Less than atmospheric pressure to zero gauge pressure",
      c: "Atmospheric pressure to more than atmospheric pressure",
      d: "Atmospheric pressure to vacuum"
    },
    correctAnswer: "a"
  },

  {
    question: "Francis turbines are used for the potential head in the range of",
    answers: {
      a: "5 to 60",
      b: "60 to 300",
      c: "300 to 600",
      d: "700 to 1250"
    },
    correctAnswer: "b"
  },
  {
    question: "Which of the serious problem arise from cavitation",
    answers: {
      a: "Noise and vibrations",
      b: "Damage to the blade surfaces",
      c: "Fall in efficiency",
      d: "All the above",
    },
    correctAnswer: "d"
  },
  {
    question: "In a Francis turbine, the pressure at inlet is ___ that at outlet.",
    answers: {
      a: "More than",
      b: "Less than",
      c: "Same as",
      d: "None of the above"
    },
    correctAnswer: "a"
  }
];





// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
