
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

// --- Lampiran: simulasi persendian penuh (ditambahkan dari persendian_tailwind)
// Hanya inisialisasi bila elemen '#sketsa-tempat' ada di DOM
if (document.getElementById('sketsa-tempat')) {
  // semua variabel lokal untuk simulasi penuh
  (function () {
    let torsoTop, torsoBottom, head, pelvis;
    let shoulderL, elbowL, wristL;
    let shoulderR, elbowR, wristR;
    let hipL, kneeL, ankleL;
    let hipR, kneeR, ankleR;

    let shoulderAngleL, elbowAngleL, wristAngleL;
    let shoulderAngleR, elbowAngleR, wristAngleR;
    let hipAngleL, kneeAngleL, ankleAngleL;
    let hipAngleR, kneeAngleR, ankleAngleR;

    const segUpperArm = 70;
    const segForearm = 60;
    const segHand = 20;
    const segUpperLeg = 90;
    const segLowerLeg = 80;
    const segFoot = 30;

    let selectedJoint = null;
    let hoveredJoint = null;
    let showGrid = true;
    let prevMouseX, prevMouseY;

    const jointData = [
      ['Bahu Kiri','Rotasi',-180,180],
      ['Siku Kiri','Engsel',0,150],
      ['Pergelangan Kiri','Engsel',-60,60],
      ['Bahu Kanan','Rotasi',-180,180],
      ['Siku Kanan','Engsel',-150,0],
      ['Pergelangan Kanan','Engsel',-60,60],
      ['Panggul Kiri','Rotasi',-90,90],
      ['Lutut Kiri','Engsel',0,150],
      ['Pergelangan Kaki Kiri','Engsel',-45,45],
      ['Panggul Kanan','Rotasi',-90,90],
      ['Lutut Kanan','Engsel',0,150],
      ['Pergelangan Kaki Kanan','Engsel',-45,45]
    ];

    // buat instansi p5 terpisah untuk sketch besar supaya tidak mengganggu p5 instance kecil
    new p5((p) => {
      // helper to calculate canvas size from container
      function computeCanvasSize() {
        const container = document.getElementById('sketsa-tempat');
        const maxWidth = 900; // don't grow beyond this
        const cw = Math.max(320, Math.min(container.clientWidth || 800, maxWidth));
        // keep original aspect ratio (800x700) => height = cw * 700/800
        const ch = Math.round(cw * 700 / 800);
        return { w: cw, h: ch };
      }

      p.setup = () => {
        const size = computeCanvasSize();
        let kanvas = p.createCanvas(size.w, size.h);
        kanvas.parent('sketsa-tempat');
        p.angleMode(p.DEGREES);
        resetPose();
        p.select('#tombol-reset').mousePressed(() => resetPose());
        p.select('#tombol-grid').mousePressed(() => showGrid = !showGrid);
      };

      p.windowResized = () => {
        const size = computeCanvasSize();
        p.resizeCanvas(size.w, size.h);
        resetPose();
      };

      function resetPose() {
        torsoTop = p.createVector(p.width / 2, p.height * 0.25);
        torsoBottom = p.createVector(p.width / 2, p.height * 0.55);
        head = p.createVector(torsoTop.x, torsoTop.y - 60);
        pelvis = p.createVector(torsoBottom.x, torsoBottom.y);

        // Pose awal huruf T
        shoulderAngleL = -180;
        elbowAngleL = 0;
        wristAngleL = 0;
        hipAngleL = 0;
        kneeAngleL = 0;
        ankleAngleL = 0;

        shoulderAngleR = 0;
        elbowAngleR = 0;
        wristAngleR = 0;
        hipAngleR = 0;
        kneeAngleR = 0;
        ankleAngleR = 0;
      }

      p.draw = () => {
        p.background('#0f172a');
        if (showGrid) drawGrid();

        p.stroke('#93c5fd'); p.strokeWeight(12);
        p.line(torsoTop.x, torsoTop.y, torsoBottom.x, torsoBottom.y);
        p.noStroke(); p.fill('#facc15'); p.ellipse(head.x, head.y, 80, 80);

        shoulderL = p.createVector(torsoTop.x - 60, torsoTop.y + 10);
        elbowL = pointFrom(shoulderL, shoulderAngleL - 90, segUpperArm);
        wristL = pointFrom(elbowL, shoulderAngleL - 90 + elbowAngleL, segForearm);
        let handEndL = pointFrom(wristL, shoulderAngleL - 90 + elbowAngleL + wristAngleL, segHand);

        shoulderR = p.createVector(torsoTop.x + 60, torsoTop.y + 10);
        elbowR = pointFrom(shoulderR, shoulderAngleR + 90, segUpperArm);
        wristR = pointFrom(elbowR, shoulderAngleR + 90 + elbowAngleR, segForearm);
        let handEndR = pointFrom(wristR, shoulderAngleR + 90 + elbowAngleR + wristAngleR, segHand);

        hipL = p.createVector(pelvis.x - 40, pelvis.y);
        kneeL = pointFrom(hipL, hipAngleL + 90, segUpperLeg);
        ankleL = pointFrom(kneeL, hipAngleL + 90 + kneeAngleL, segLowerLeg);
        let footEndL = pointFrom(ankleL, hipAngleL + 90 + kneeAngleL + ankleAngleL, segFoot);

        hipR = p.createVector(pelvis.x + 40, pelvis.y);
        kneeR = pointFrom(hipR, hipAngleR + 90, segUpperLeg);
        ankleR = pointFrom(kneeR, hipAngleR + 90 + kneeAngleR, segLowerLeg);
        let footEndR = pointFrom(ankleR, hipAngleR + 90 + kneeAngleR + ankleAngleR, segFoot);

        p.stroke('#60a5fa'); p.strokeWeight(10);
        p.line(shoulderL.x, shoulderL.y, elbowL.x, elbowL.y);
        p.line(elbowL.x, elbowL.y, wristL.x, wristL.y);
        p.line(wristL.x, wristL.y, handEndL.x, handEndL.y);
        p.line(shoulderR.x, shoulderR.y, elbowR.x, elbowR.y);
        p.line(elbowR.x, elbowR.y, wristR.x, wristR.y);
        p.line(wristR.x, wristR.y, handEndR.x, handEndR.y);

        p.stroke('#34d399');
        p.line(hipL.x, hipL.y, kneeL.x, kneeL.y);
        p.line(kneeL.x, kneeL.y, ankleL.x, ankleL.y);
        p.line(ankleL.x, ankleL.y, footEndL.x, footEndL.y);
        p.line(hipR.x, hipR.y, kneeR.x, kneeR.y);
        p.line(kneeR.x, kneeR.y, ankleR.x, ankleR.y);
        p.line(ankleR.x, ankleR.y, footEndR.x, footEndR.y);

        const joints = [shoulderL,elbowL,wristL,shoulderR,elbowR,wristR,hipL,kneeL,ankleL,hipR,kneeR,ankleR];
        hoveredJoint = null;
        for (let i in joints) {
          if (p.dist(p.mouseX, p.mouseY, joints[i].x, joints[i].y) < 15) hoveredJoint = i;
          drawJoint(joints[i]);
        }

        if (hoveredJoint != null) {
          const info = jointData[hoveredJoint];
          drawTooltip(`${info[0]} — ${info[1]} (${info[2]}°–${info[3]}°)`);
        }
      };

      function drawTooltip(textStr) {
        p.push();
        p.fill(0,0,0,180); p.stroke(255); p.strokeWeight(0.5);
        p.rect(p.mouseX - p.textWidth(textStr)/2 - 6, p.mouseY - 40, p.textWidth(textStr) + 12, 24, 6);
        p.noStroke(); p.fill(255); p.textSize(13); p.textAlign(p.CENTER, p.CENTER);
        p.text(textStr, p.mouseX, p.mouseY - 28);
        p.pop();
      }

      function drawGrid() {
        p.stroke(255,255,255,15); p.strokeWeight(1);
        for (let x=0;x<p.width;x+=20) p.line(x,0,x,p.height);
        for (let y=0;y<p.height;y+=20) p.line(0,y,p.width,y);
      }

      function drawJoint(pos) { p.push(); p.stroke('#fbbf24'); p.fill('#fde68a'); p.strokeWeight(2); p.circle(pos.x,pos.y,14); p.pop(); }

      function pointFrom(o, a, len) { return p.createVector(o.x + p.cos(a) * len, o.y + p.sin(a) * len); }

      p.mousePressed = () => {
        const joints = [shoulderL,elbowL,wristL,shoulderR,elbowR,wristR,hipL,kneeL,ankleL,hipR,kneeR,ankleR];
        for (let i in joints) { if (p.dist(p.mouseX,p.mouseY,joints[i].x,joints[i].y) < 15) { selectedJoint = i; break; } }
        prevMouseX = p.mouseX; prevMouseY = p.mouseY;
      };

      p.mouseDragged = () => {
        if (selectedJoint == null) return;
        let sensitivity = 0.3;
        let dx = (p.mouseX - prevMouseX) * sensitivity;
        let dy = (p.mouseY - prevMouseY) * sensitivity;
        let deltaAngle = dx + dy;
        let j = parseInt(selectedJoint);
        let jd = jointData[j];
        switch (j) {
          case 0: shoulderAngleL = p.constrain(shoulderAngleL + deltaAngle, jd[2], jd[3]); break;
          case 1: elbowAngleL = p.constrain(elbowAngleL + deltaAngle, jd[2], jd[3]); break;
          case 2: wristAngleL = p.constrain(wristAngleL + deltaAngle, jd[2], jd[3]); break;
          case 3: shoulderAngleR = p.constrain(shoulderAngleR + deltaAngle, jd[2], jd[3]); break;
          case 4: elbowAngleR = p.constrain(elbowAngleR + deltaAngle, jd[2], jd[3]); break;
          case 5: wristAngleR = p.constrain(wristAngleR + deltaAngle, jd[2], jd[3]); break;
          case 6: hipAngleL = p.constrain(hipAngleL + deltaAngle, jd[2], jd[3]); break;
          case 7: kneeAngleL = p.constrain(kneeAngleL + deltaAngle, jd[2], jd[3]); break;
          case 8: ankleAngleL = p.constrain(ankleAngleL + deltaAngle, jd[2], jd[3]); break;
          case 9: hipAngleR = p.constrain(hipAngleR + deltaAngle, jd[2], jd[3]); break;
          case 10: kneeAngleR = p.constrain(kneeAngleR + deltaAngle, jd[2], jd[3]); break;
          case 11: ankleAngleR = p.constrain(ankleAngleR + deltaAngle, jd[2], jd[3]); break;
        }
        prevMouseX = p.mouseX; prevMouseY = p.mouseY;
      };

      p.mouseReleased = () => { selectedJoint = null; };
      p.keyPressed = () => { if (p.key === 'r' || p.key === 'R') resetPose(); if (p.key === 'g' || p.key === 'G') showGrid = !showGrid; };
    });
  })();
} // akhir pengecekan #sketsa-tempat
