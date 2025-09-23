// Fungsi reusable untuk membuat animasi sendi engsel
function createEngselSketch(id, label, maxAngle = 90, speed = 1) {
  new p5(function (p) {
    let angle = 0;
    let increasing = true;

    p.setup = function () {
      let canvas = p.createCanvas(p.select(`#${id}`).width, p.select(`#${id}`).width);
      canvas.parent(id);
      p.angleMode(p.DEGREES);
    };

    p.draw = function () {
      p.background(30);
      p.translate(p.width / 2, p.height / 2);

      // Area sendi
      p.noStroke();
      p.fill(60);
      p.ellipse(0, 0, 140);

      // Tulang bawah (tetap)
      p.fill(180);
      p.stroke(100);
      p.strokeWeight(2);
      p.rect(-60, -8, 60, 16, 8);

      // Titik engsel
      p.noStroke();
      p.fill(255, 0, 0);
      p.ellipse(0, 0, 16);

      // Tulang atas (bergerak)
      p.push();
      p.rotate(angle);
      p.fill(200);
      p.stroke(100);
      p.rect(0, -8, 70, 16, 8);
      p.pop();

      // Gerakan animasi
      if (increasing) {
        angle += speed;
        if (angle >= maxAngle) increasing = false;
      } else {
        angle -= speed;
        if (angle <= 0) increasing = true;
      }

      // Tampilkan label sudut
      p.resetMatrix();
      p.fill(255);
      p.textAlign(p.CENTER);
      p.textSize(14);
      p.text(`${label} - Sudut: ${Math.round(angle)}°`, p.width / 2, p.height - 10);
    };
  });
}

// Fungsi reusable untuk membuat animasi sendi rotasi
function createRotasiSketch(id, label, maxAngle = 360, speed = 2) {
  new p5(function (p) {
    let angle = 0;

    p.setup = function () {
      let canvas = p.createCanvas(p.select(`#${id}`).width, p.select(`#${id}`).width);
      canvas.parent(id);
      p.angleMode(p.DEGREES);
    };

    p.draw = function () {
      p.background(30);
      p.translate(p.width / 2, p.height / 2);

      // Area sendi
      p.noStroke();
      p.fill(60);
      p.ellipse(0, 0, 140);

      // Tulang bawah (tetap)
      p.fill(180);
      p.stroke(100);
      p.strokeWeight(2);
      p.rect(-60, -8, 60, 16, 8);

      // Titik rotasi
      p.noStroke();
      p.fill(0, 128, 255);
      p.ellipse(0, 0, 16);

      // Tulang atas (berputar)
      p.push();
      p.rotate(angle);
      p.fill(200);
      p.stroke(100);
      p.rect(0, -8, 70, 16, 8);
      p.pop();

      // Gerakan rotasi terus menerus
      angle = (angle + speed) % maxAngle;

      // Tampilkan label sudut
      p.resetMatrix();
      p.fill(255);
      p.textAlign(p.CENTER);
      p.textSize(14);
      p.text(`${label} - Sudut: ${Math.round(angle)}°`, p.width / 2, p.height - 10);
    };
  });
}

// Inisialisasi semua animasi setelah DOM siap
window.addEventListener("DOMContentLoaded", () => {
  // Persendian Engsel
  createEngselSketch("engsel-siku", "Sendi Siku", 90, 1);
  createEngselSketch("engsel-lutut", "Sendi Lutut", 130, 1);
  createEngselSketch("engsel-jari", "Sendi Jari", 60, 2);

  // Persendian Rotasi
  createRotasiSketch("rotasi-leher", "Sendi Leher", 80, 1);
  createRotasiSketch("rotasi-tangan", "Sendi Pergelangan", 360, 3);
});
