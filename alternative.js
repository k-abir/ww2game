// Updated Decision Tree with 200+ Decisions
let selectedCountry = null;
let currentPath = [];
let gameInProgress = false;

// Base Decision Tree for Germany
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

// Function to dynamically expand the decision tree
function expandDecisionTree(tree, levels, decisionsPerLevel) {
  if (levels <= 0) return;

  if (!tree.options) tree.options = [];

  for (let i = 0; i < decisionsPerLevel; i++) {
    const newDecision = {
      decision: `Generated Decision Level ${levels} - Option ${i + 1}: What will you do?`,
      options: [
        {
          text: `Option A for Level ${levels}, Decision ${i + 1}`,
          result: `Result of Option A at Level ${levels}, Decision ${i + 1}.`,
        },
        {
          text: `Option B for Level ${levels}, Decision ${i + 1}`,
          result: `Result of Option B at Level ${levels}, Decision ${i + 1}.`,
        },
        {
          text: `Option C for Level ${levels}, Decision ${i + 1}`,
          result: `Result of Option C at Level ${levels}, Decision ${i + 1}.`,
        },
      ],
    };

    tree.options.push(newDecision);

    // Recursively expand next levels
    newDecision.options.forEach((option) => {
      option.next = {};
      expandDecisionTree(option.next, levels - 1, decisionsPerLevel);
    });
  }
}

// Expand the decision tree to add 200+ decisions
expandDecisionTree(germanyDecisions, 5, 10);

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
