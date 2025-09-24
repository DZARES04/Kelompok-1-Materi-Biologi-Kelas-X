
class EngselSketch {
  constructor(id, label, maxAngle = 90, defaultSpeed = 1) {
    this.id = id;
    this.label = label;
    this.maxAngle = maxAngle;
    this.speed = defaultSpeed;
    this.angle = 0;
    this.increasing = true;
    this.isPlaying = true;
    this.p5Instance = new p5((p) => {
      p.setup = () => {
        let canvas = p.createCanvas(p.select(`#${id}`).width, p.select(`#${id}`).width);
        canvas.parent(id);
        p.angleMode(p.DEGREES);
      };
      p.draw = () => {
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
        p.rotate(this.angle);
        p.fill(200);
        p.stroke(100);
        p.rect(0, -8, 70, 16, 8);
        p.pop();
        if (this.isPlaying) {
          if (this.increasing) {
            this.angle += this.speed;
            if (this.angle >= this.maxAngle) this.increasing = false;
          } else {
            this.angle -= this.speed;
            if (this.angle <= 0) this.increasing = true;
          }
        }
        p.resetMatrix();
        p.fill(255);
        p.textAlign(p.CENTER);
        p.textSize(14);
        p.text(`${this.label} - Sudut: ${Math.round(this.angle)}°`, p.width / 2, p.height - 10);
      };
    });
    // Kontrol play/pause
    const playBtn = document.getElementById(`play-${id}`);
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        playBtn.textContent = this.isPlaying ? 'Pause' : 'Play';
      });
    }
    // Kontrol kecepatan
    const speedSlider = document.getElementById(`speed-${id}`);
    if (speedSlider) {
      speedSlider.addEventListener('input', () => {
        this.speed = parseFloat(speedSlider.value);
      });
    }
  }
}

class RotasiSketch {
  constructor(id, label, maxAngle = 360, defaultSpeed = 2) {
    this.id = id;
    this.label = label;
    this.maxAngle = maxAngle;
    this.speed = defaultSpeed;
    this.angle = 0;
    this.isPlaying = true;
    this.p5Instance = new p5((p) => {
      p.setup = () => {
        let canvas = p.createCanvas(p.select(`#${id}`).width, p.select(`#${id}`).width);
        canvas.parent(id);
        p.angleMode(p.DEGREES);
      };
      p.draw = () => {
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
        p.rotate(this.angle);
        p.fill(200);
        p.stroke(100);
        p.rect(0, -8, 70, 16, 8);
        p.pop();
        if (this.isPlaying) {
          this.angle = (this.angle + this.speed) % this.maxAngle;
        }
        p.resetMatrix();
        p.fill(255);
        p.textAlign(p.CENTER);
        p.textSize(14);
        p.text(`${this.label} - Sudut: ${Math.round(this.angle)}°`, p.width / 2, p.height - 10);
      };
    });
    // Kontrol play/pause
    const playBtn = document.getElementById(`play-${id}`);
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        playBtn.textContent = this.isPlaying ? 'Pause' : 'Play';
      });
    }
    // Kontrol kecepatan
    const speedSlider = document.getElementById(`speed-${id}`);
    if (speedSlider) {
      speedSlider.addEventListener('input', () => {
        this.speed = parseFloat(speedSlider.value);
      });
    }
  }
}

// Inisialisasi semua animasi setelah DOM siap
window.addEventListener("DOMContentLoaded", () => {
  // Persendian Engsel
  new EngselSketch("engsel-siku", "Sendi Siku", 90, 1);
  new EngselSketch("engsel-lutut", "Sendi Lutut", 130, 1);
  new EngselSketch("engsel-jari", "Sendi Jari", 60, 2);

  // Persendian Rotasi
  new RotasiSketch("rotasi-leher", "Sendi Leher", 80, 1);
  new RotasiSketch("rotasi-tangan", "Sendi Pergelangan", 360, 3);
});
