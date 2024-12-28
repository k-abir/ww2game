let selectedCountry = null;
let currentStage = 0;
let gameInProgress = false;

let germanyDecisions = [
  {
    decision: "Invade Poland (1939): Will you proceed with the invasion of Poland to spark the war?",
    options: [
      { text: "Invade with Blitzkrieg strategy", result: "War begins successfully, but Allies respond." },
      { text: "Negotiate with Poland for Danzig", result: "Negotiation fails; invasion inevitable." },
    ],
  },
  {
    decision: "Battle of France (1940): How will you approach the Western Front?",
    options: [
      { text: "Execute the Schlieffen Plan 2.0", result: "France falls quickly, but UK escapes." },
      { text: "Focus on diplomacy with Italy", result: "Italy joins the war, but momentum slows." },
    ],
  },
  {
    decision: "Battle of Britain (1940): What strategy will you use?",
    options: [
      { text: "Focus on air raids over London", result: "Civilians suffer, but RAF regains strength." },
      { text: "Target RAF airfields and resources", result: "RAF weakens, but invasion delayed." },
    ],
  },
  {
    decision: "Operation Barbarossa (1941): How will you invade the Soviet Union?",
    options: [
      { text: "Launch early for a surprise attack", result: "Initial success, but winter halts advance." },
      { text: "Build up resources for a massive push", result: "Delayed start leads to logistical issues." },
    ],
  },
  {
    decision: "Final Stand (1944–1945): What will be your final effort?",
    options: [
      { text: "Focus on defending Berlin", result: "Delays the end but ensures major losses." },
      { text: "Attempt peace negotiations", result: "Rejected; unconditional surrender demanded." },
    ],
  },
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background(30);
  textAlign(CENTER);
  fill(255);

  if (!gameInProgress) {
    // Country Selection Screen
    textSize(32);
    text("Select Your Country", width / 2, height / 4);

    // Germany Button
    drawButton("Germany", width / 2 - 100, height / 2, 200, 50, "germany");
  } else if (selectedCountry === "Germany") {
    // Gameplay Screen for Germany
    textSize(24);
    if (currentStage < germanyDecisions.length) {
      const decision = germanyDecisions[currentStage];
      text(decision.decision, width / 2, height / 4);

      // Display Options
      for (let i = 0; i < decision.options.length; i++) {
        let option = decision.options[i];
        drawButton(option.text, width / 2 - 150, height / 2 + i * 60, 300, 50, `option${i}`);
      }
    } else {
      text("Game Over. Relive history or try a different strategy!", width / 2, height / 2);
    }
  }
}

function mousePressed() {
  if (!gameInProgress) {
    if (mouseInside(width / 2 - 100, height / 2, 200, 50)) {
      selectedCountry = "Germany";
      gameInProgress = true;
      redraw();
    }
  } else if (selectedCountry === "Germany") {
    if (currentStage < germanyDecisions.length) {
      let decision = germanyDecisions[currentStage];
      for (let i = 0; i < decision.options.length; i++) {
        if (mouseInside(width / 2 - 150, height / 2 + i * 60, 300, 50)) {
          alert(decision.options[i].result);
          currentStage++;
          redraw();
          break;
        }
      }
    }
  }
}

function drawButton(label, x, y, w, h, id) {
  fill(80);
  rect(x, y, w, h, 10);
  fill(255);
  textSize(18);
  text(label, x + w / 2, y + h / 2 + 6);
}

function mouseInside(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
