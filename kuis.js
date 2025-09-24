
class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.current = 0;
    this.score = 0;
    this.startBtn = document.getElementById("start-btn");
    this.quiz = document.getElementById("quiz-container");
    this.qEl = document.getElementById("question");
    this.optEl = document.getElementById("options");
    this.nextBtn = document.getElementById("next-btn");
    this.endScreen = document.getElementById("end-screen");
    this.scoreEl = document.getElementById("score");
    this.progress = document.getElementById("progress");
    this.init();
  }

  init() {
    this.startBtn.onclick = () => {
      this.startBtn.classList.add("hidden");
      this.quiz.classList.remove("hidden");
      this.loadQ();
    };
    this.nextBtn.onclick = () => {
      this.current++;
      if (this.current < this.questions.length) {
        this.loadQ();
      } else {
        this.quiz.classList.add("hidden");
        this.endScreen.classList.remove("hidden");
        this.scoreEl.textContent = `Skor kamu: ${this.score} dari ${this.questions.length}`;
        this.progress.style.width = "100%";
      }
    };
  }

  loadQ() {
    let q = this.questions[this.current];
    this.qEl.textContent = q.q;
    this.optEl.innerHTML = "";
    q.o.forEach((text, i) => {
      let btn = document.createElement("button");
      btn.textContent = text;
      btn.className = "block w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded";
      btn.onclick = () => this.select(i);
      this.optEl.appendChild(btn);
    });
    this.progress.style.width = `${(this.current / this.questions.length) * 100}%`;
    this.nextBtn.disabled = true;
  }

  select(i) {
    if (i === this.questions[this.current].a) this.score++;
    this.nextBtn.disabled = false;
  }
}

const questions = [
  { q: "Sendi engsel hanya bisa bergerak ke arah?", o: ["Satu arah", "Dua arah", "Bebas"], a: 0 },
  { q: "Contoh sendi engsel adalah?", o: ["Leher", "Siku", "Pinggul"], a: 1 },
  { q: "Sendi rotasi memungkinkan gerakan?", o: ["Naik turun", "Memutar", "Maju mundur"], a: 1 },
  { q: "Hubungan atlas dan axis pada leher termasuk?", o: ["Sendi Engsel", "Sendi Rotasi", "Sendi Peluru"], a: 1 },
];

window.addEventListener("DOMContentLoaded", () => {
  new Quiz(questions);
});
