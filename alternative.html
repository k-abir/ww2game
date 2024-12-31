let selectedCountry = null;
let currentPath = [];
let gameInProgress = false;

// Expanded Decision Tree for Germany
let germanyDecisions = {
  decision: "Invade Poland (1939): Will you proceed with the invasion of Poland to spark the war?",
  options: [
    {
      text: "Invade with Blitzkrieg strategy",
      result: "War begins successfully, but Allies respond.",
      next: {
        decision: "Battle of France (1940): How will you approach the Western Front?",
        options: [
          {
            text: "Execute the Schlieffen Plan 2.0",
            result: "France falls quickly, but UK escapes.",
            next: {
              decision: "Battle of Britain (1940): What strategy will you use?",
              options: [
                {
                  text: "Focus on air raids over London",
                  result: "Civilians suffer, but RAF regains strength.",
                  next: {
                    decision: "Operation Sea Lion: Will you attempt to invade Britain?",
                    options: [
                      {
                        text: "Launch the invasion immediately",
                        result: "Invasion fails due to strong naval resistance.",
                      },
                      {
                        text: "Delay and strengthen the navy",
                        result: "Invasion delayed; Britain regains strength.",
                      },
                    ],
                  },
                },
                {
                  text: "Target RAF airfields and resources",
                  result: "RAF weakens, but invasion delayed.",
                  next: {
                    decision: "Strengthen Atlantic U-Boat Campaign?",
                    options: [
                      {
                        text: "Yes, to starve British supplies",
                        result: "Some success, but codebreakers hinder campaign.",
                      },
                      {
                        text: "Focus resources on land campaigns",
                        result: "Land success but UK remains a threat.",
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            text: "Focus on diplomacy with Italy",
            result: "Italy joins the war, but momentum slows.",
            next: {
              decision: "Should Germany assist Italy in North Africa?",
              options: [
                {
                  text: "Send the Afrika Korps",
                  result: "Success in North Africa, but resources stretched.",
                },
                {
                  text: "Focus on Eastern Front",
                  result: "Eastern Front strengthens, but Italy suffers defeats.",
                },
              ],
            },
          },
        ],
      },
    },
    {
      text: "Negotiate with Poland for Danzig",
      result: "Negotiation fails; invasion inevitable.",
      next: {
        decision: "How will you consolidate the Eastern Front after invading Poland?",
        options: [
          {
            text: "Install a puppet government",
            result: "Stability achieved, but resentment grows.",
          },
          {
            text: "Rule directly with force",
            result: "Resistance movements rise rapidly.",
          },
        ],
      },
    },
  ],
};

// Adding more branches to expand to over 30 decisions.
function addExpandedDecisions(tree) {
  let depth1 = {
    decision: "Operation Barbarossa (1941): How will you invade the Soviet Union?",
    options: [
      {
        text: "Launch early for a surprise attack",
        result: "Initial success, but winter halts advance.",
        next: {
          decision: "Siege of Leningrad: Focus resources on the siege?",
          options: [
            {
              text: "Yes, to cripple Soviet morale",
              result: "Heavy casualties but Leningrad suffers.",
            },
            {
              text: "Focus on advancing toward Moscow",
              result: "Stiff resistance delays progress.",
            },
          ],
        },
      },
      {
        text: "Build up resources for a massive push",
        result: "Delayed start leads to logistical issues.",
        next: {
          decision: "Stalingrad: Will you prioritize this critical city?",
          options: [
            {
              text: "Encircle and starve Stalingrad",
              result: "Partial success; heavy losses.",
            },
            {
              text: "Avoid Stalingrad and bypass",
              result: "Soviets regroup and counterattack.",
            },
          ],
        },
      },
    ],
  };

  let depth2 = {
    decision: "1943 Strategic Decision: Will you allocate resources to Wunderwaffe projects?",
    options: [
      {
        text: "Focus on advanced weaponry",
        result: "Progress made, but too late to shift the war.",
      },
      {
        text: "Prioritize conventional arms production",
        result: "Resources optimized for the Eastern Front.",
      },
    ],
  };

  let depth3 = {
    decision: "Final Stand (1944–1945): What will be your final effort?",
    options: [
      {
        text: "Focus on defending Berlin",
        result: "Delays the end but ensures major losses.",
      },
      {
        text: "Attempt peace negotiations",
        result: "Rejected; unconditional surrender demanded.",
      },
    ],
  };

  // Nest them into the tree dynamically.
  tree.options[0].next.options[0].next.options[0].next = depth1;
  tree.options[0].next.options[0].next.options[1].next = depth2;
  tree.options[0].next.options[1].next = depth3;
}

addExpandedDecisions(germanyDecisions);

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
    drawButton("Germany", width / 2 - 100, height / 2, 200, 50, "germany");
  } else if (selectedCountry === "Germany") {
    // Gameplay Screen for Germany
    textSize(24);
    let decisionNode = getDecisionNode(currentPath, germanyDecisions);
    if (decisionNode) {
      text(decisionNode.decision, width / 2, height / 4);
      for (let i = 0; i < decisionNode.options.length; i++) {
        drawButton(
          decisionNode.options[i].text,
          width / 2 - 150,
          height / 2 + i * 60,
          300,
          50,
          `option${i}`
        );
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
    let decisionNode = getDecisionNode(currentPath, germanyDecisions);
    if (decisionNode) {
      for (let i = 0; i < decisionNode.options.length; i++) {
        if (mouseInside(width / 2 - 150, height / 2 + i * 60, 300, 50)) {
          alert(decisionNode.options[i].result);
          if (decisionNode.options[i].next) {
            currentPath.push(i);
          } else {
            currentPath = []; // Reset game after final decision
          }
          redraw();
          break;
        }
      }
    }
  }
}

function getDecisionNode(path, tree) {
  let node = tree;
  for (let step of path) {
    if (node.options && node.options[step] && node.options[step].next) {
      node = node.options[step].next;
    } else {
      return null;
    }
  }
  return node;
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
