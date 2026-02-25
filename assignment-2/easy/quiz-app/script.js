import { quizData } from './data.js';

const questionEl = document.getElementById("question");
const answers = document.querySelectorAll("input[name='answer']");
const submitBtn = document.getElementById("submit");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

let currentQuiz = 0;
let score = 0;

function loadQuiz() {
  deselectAnswers();

  const currentData = quizData[currentQuiz];

  questionEl.innerText = currentData.question;
  a_text.innerText = currentData.a;
  b_text.innerText = currentData.b;
  c_text.innerText = currentData.c;
  d_text.innerText = currentData.d;
}

function deselectAnswers() {
  answers.forEach(answer => answer.checked = false);
}

function getSelected() {
  let selected = undefined;

  answers.forEach(answer => {
    if (answer.checked) {
      selected = answer.value;
    }
  });

  return selected;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (!answer) return;

  if (answer === quizData[currentQuiz].correct) {
    score++;
  }

  currentQuiz++;

  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector(".quiz-card").innerHTML = `
    <div class="result">
      <h2>You scored ${score} / ${quizData.length}</h2>
      <button onclick="location.reload()">Restart Quiz</button>
    </div>
  `;
}

loadQuiz();