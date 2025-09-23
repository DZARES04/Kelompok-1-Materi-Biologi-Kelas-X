class EngselAnimation {
  constructor(id, label, maxAngle = 90, defaultSpeed = 1) {
    this.id = id;
    this.label = label;
    this.maxAngle = maxAngle;
    this.speed = defaultSpeed;
    this.angle = 0;
    this.increasing = true;
    this.isPlaying = true;
    this.initSketch();
    this.initControls();
  }
  initSketch() {
    const self = this;
    new p5(function (p) {
      p.setup = function () {
        let canvas = p.createCanvas(p.select(`#${self.id}`).width, p.select(`#${self.id}`).width);
        canvas.parent(self.id);
        p.angleMode(p.DEGREES);
      };
      p.draw = function () {
        p.background(30);
        p.translate(p.width / 2, p.height / 2);
        p.noStroke();
        p.fill(60);
        p.ellipse(0, 0, 140);
        p.fill(180);
        p.stroke(100);
        p.strokeWeight(2);
        p.rect(-60, -8, 60, 16, 8);
        p.noStroke();
        p.fill(255, 0, 0);
        p.ellipse(0, 0, 16);
        p.push();
        p.rotate(self.angle);
        p.fill(200);
        p.stroke(100);
        p.rect(0, -8, 70, 16, 8);
        p.pop();
        if (self.isPlaying) {
          if (self.increasing) {
            self.angle += self.speed;
            if (self.angle >= self.maxAngle) self.increasing = false;
          } else {
            self.angle -= self.speed;
            if (self.angle <= 0) self.increasing = true;
          }
        }
        p.resetMatrix();
        p.fill(255);
        p.textAlign(p.CENTER);
        p.textSize(14);
        p.text(`${self.label} - Sudut: ${Math.round(self.angle)}°`, p.width / 2, p.height - 10);
      };
    });
  }
  initControls() {
    const playBtn = document.getElementById(`play-${this.id}`);
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        playBtn.textContent = this.isPlaying ? 'Pause' : 'Play';
      });
    }
    const speedSlider = document.getElementById(`speed-${this.id}`);
    if (speedSlider) {
      speedSlider.addEventListener('input', () => {
        this.speed = parseFloat(speedSlider.value);
      });
    }
  }
}

// Fungsi reusable untuk membuat animasi sendi rotasi
class RotasiAnimation {
  constructor(id, label, maxAngle = 360, defaultSpeed = 2) {
    this.id = id;
    this.label = label;
    this.maxAngle = maxAngle;
    this.speed = defaultSpeed;
    this.angle = 0;
    this.isPlaying = true;
    this.initSketch();
    this.initControls();
  }
  initSketch() {
    const self = this;
    new p5(function (p) {
      p.setup = function () {
        let canvas = p.createCanvas(p.select(`#${self.id}`).width, p.select(`#${self.id}`).width);
        canvas.parent(self.id);
        p.angleMode(p.DEGREES);
      };
      p.draw = function () {
        p.background(30);
        p.translate(p.width / 2, p.height / 2);
        p.noStroke();
        p.fill(60);
        p.ellipse(0, 0, 140);
        p.fill(180);
        p.stroke(100);
        p.strokeWeight(2);
        p.rect(-60, -8, 60, 16, 8);
        p.noStroke();
        p.fill(0, 128, 255);
        p.ellipse(0, 0, 16);
        p.push();
        p.rotate(self.angle);
        p.fill(200);
        p.stroke(100);
        p.rect(0, -8, 70, 16, 8);
        p.pop();
        if (self.isPlaying) {
          self.angle = (self.angle + self.speed) % self.maxAngle;
        }
        p.resetMatrix();
        p.fill(255);
        p.textAlign(p.CENTER);
        p.textSize(14);
        p.text(`${self.label} - Sudut: ${Math.round(self.angle)}°`, p.width / 2, p.height - 10);
      };
    });
  }
  initControls() {
    const playBtn = document.getElementById(`play-${this.id}`);
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        playBtn.textContent = this.isPlaying ? 'Pause' : 'Play';
      });
    }
    const speedSlider = document.getElementById(`speed-${this.id}`);
    if (speedSlider) {
      speedSlider.addEventListener('input', () => {
        this.speed = parseFloat(speedSlider.value);
      });
    }
  }
}

// Inisialisasi semua animasi setelah DOM siap
window.addEventListener("DOMContentLoaded", () => {
  new EngselAnimation("engsel-siku", "Sendi Siku", 90, 1);
  new EngselAnimation("engsel-lutut", "Sendi Lutut", 130, 1);
  new EngselAnimation("engsel-jari", "Sendi Jari", 60, 2);
  new RotasiAnimation("rotasi-leher", "Sendi Leher", 80, 1);
  new RotasiAnimation("rotasi-tangan", "Sendi Pergelangan", 360, 3);
});
