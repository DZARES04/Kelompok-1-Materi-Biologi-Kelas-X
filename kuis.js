
feather.replace();

// Quiz Data (from kuis1.html)
const questions = [
  {
    question: "Sendi engsel memungkinkan gerakan pada arah…",
    options: ["Satu arah", "Dua arah", "Banyak arah", "Melingkar"],
    correct: 0
  },
  {
    question: "Contoh sendi engsel terdapat pada…",
    options: ["Leher dan kepala", "Siku dan lutut", "Pergelangan tangan", "Pangkal paha"],
    correct: 1
  },
  {
    question: "Sendi rotasi memungkinkan gerakan…",
    options: ["Kedepan dan kebelakang saja", "Kekiri dan kekanan saja", "Bebas segala arah", "Berputar pada satu poros"],
    correct: 3
  },
  {
    question: "Contoh sendi rotasi yang ada pada tubuh manusia adalah…",
    options: ["Tulang hasta dan tulang pengumpil", "Tulang paha dan tulang pinggul", "Tulang lutut dan tulang kering", "Tulang pergelangan tangan"],
    correct: 0
  },
  {
    question: "Sendi engsel bekerja mirip dengan…",
    options: ["Engsel pintu", "Bola lampu", "Katrol", "Kunci gembok"],
    correct: 0
  },
  {
    question: "Gerakan membuka dan menutup mulut menggunakan sendi?",
    options: ["Pelana", "Engsel", "Putar", "Peluru"],
    correct: 1
  },
  {
    question: "Sendi rotasi pada tulang leher berfungsi untuk…",
    options: ["Membungkuk dan meluruskan tubuh", "Menggerakkan kepala menunduk", "Menggerakkan kepala menoleh ke samping", "Menggerakkan kepala ke atas"],
    correct: 2
  },
  {
    question: "Perbedaan utama sendi engsel dan sendi rotasi adalah…",
    options: ["Jenis tulang yang menyusunnya", "Jumlah otot yang menempel", "Arah gerakannya", "Bentuk sendinya"],
    correct: 2
  },
  {
    question: "Pada lengan bawah, sendi rotasi memungkinkan gerakan…",
    options: ["Meluruskan dan menekuk", "Menoleh dan mengangguk", "Menelungkupkan dan menengadahkan telapak tangan", "Menutup dan membuka"],
    correct: 2
  },
  {
    question: "Jika seseorang tidak bisa menekuk lututnya, maka sendi yang bermasalah adalah…",
    options: ["Sendi engsel", "Sendi rotasi", "Sendi peluru", "Sendi geser"],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const endScreen = document.getElementById('end-screen');
const nextBtn = document.getElementById('next-btn');
const optionsDiv = document.getElementById('options');
const questionEl = document.getElementById('question');
const progress = document.getElementById('progress');
const feedback = document.getElementById('feedback');
const feedbackContent = document.getElementById('feedback-content');
const restartBtn = document.getElementById('restart-btn');
const scoreEl = document.getElementById('score');

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
if (restartBtn) restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
  startBtn.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsDiv.innerHTML = '';
  selectedAnswer = null;
  nextBtn.disabled = true;

  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'w-full bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition text-left';
    btn.textContent = option;
    btn.addEventListener('click', () => selectAnswer(index));
    optionsDiv.appendChild(btn);
  });

  progress.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
}

function selectAnswer(index) {
  selectedAnswer = index;
  nextBtn.disabled = false;
  // Highlight selected
  Array.from(optionsDiv.children).forEach((btn, i) => {
    if (i === index) btn.classList.add('bg-blue-600');
    else btn.classList.remove('bg-blue-600');
  });
}

function nextQuestion() {
  const q = questions[currentQuestion];
  if (selectedAnswer === q.correct) {
    score++;
    // optional feedback: briefly flash correct/incorrect
    showFeedback('Benar!', 'text-green-400');
  } else {
    showFeedback(`Salah! Jawaban benar: ${q.options[q.correct]}`, 'text-red-400');
  }
}

function showFeedback(message, colorClass) {
  // If feedback elements exist (from kuis1.html), use them. Otherwise just proceed.
  if (feedbackContent) {
    feedbackContent.innerHTML = `<p class="${colorClass} text-xl font-semibold">${message}</p>`;
    feedback.classList.remove('hidden');
    setTimeout(() => {
      feedback.classList.add('hidden');
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        endQuiz();
      }
    }, 1200);
  } else {
    currentQuestion++;
    if (currentQuestion < questions.length) showQuestion(); else endQuiz();
  }
}

function endQuiz() {
  quizContainer.classList.add('hidden');
  endScreen.classList.remove('hidden');
  scoreEl.textContent = `Skor Anda: ${score}/${questions.length} (${Math.round((score / questions.length) * 100)}%)`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  endScreen.classList.add('hidden');
  startBtn.classList.remove('hidden');
  progress.style.width = '0%';
}
