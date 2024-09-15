import GenerateData from "./GenerateData.js";
import Dijkstra from "./Dijkstra.js";

/* =============== GRAPH =============== */
let cy = null;

const nodeStyles = {
  selector: "node",
  style: {
    "background-color": "#A9BDD7",
    "border-width": 2,
    "border-style": "solid",
    "border-color": "#001326",
    width: 50,
    height: 50,
    label: "data(id)",
    "text-halign": "center",
    "text-valign": "center",
    "font-size": 12,
    color: "#001326",
  },
};

const edgeStyles = {
  selector: "edge",
  style: {
    width: 3,
    "line-color": "#B2BBC9",
    "target-arrow-shape": "none",
    "source-arrow-shape": "none",
    label: "data(weight)",
    "curve-style": "bezier",
    "line-style": "dashed",
    "line-dash-pattern": [12],
  },
};

const highlightedStyles = {
  selector: ".highlighted",
  style: {
    color: "#f8f6f6",
    "background-color": "#001326",
    "line-color": "#001326",
    "target-arrow-color": "#001326",
    "source-arrow-color": "#001326",
    "target-arrow-shape": "triangle",
    "line-style": "solid",
    "transition-property":
      "color, background-color, line-color, target-arrow-color, source-arrow-color",
    "transition-duration": "0.5s",
  },
};

const initGraph = (elements, layoutType, isBackground = false) => {
  cy = cytoscape({
    container: document.getElementById("visualization_container"),
    boxSelectionEnabled: false,
    autounselectify: true,
    elements,
    style: [nodeStyles, edgeStyles, highlightedStyles],
    layout: {
      name: layoutType,
      roots: "#A",
      directed: true,
    },
  });

  if (isBackground) {
    return;
  }

  const distances = Object.entries(Dijkstra(cy));
  const delay = 1500;
  let i = 0;

  const interval = setInterval(() => {
    const nodeId = distances[i][0];
    const edgeId = distances[i][1].edgeId;

    setTimeout(() => {
      cy.$(`#${nodeId}`).addClass("highlighted");
    }, 500);

    if (edgeId) {
      cy.$(`#${edgeId}`).addClass("highlighted");
    }

    i++;

    if (i === distances.length) {
      clearInterval(interval);
    }
  }, delay);
};

/* =============== CHANGE MODE =============== */
const mode = document.querySelector(".mode");
const switchModeBtn = document.querySelector(".switch_mode__btn");
const nodesInput = document.querySelector("#nodes");
const edgesInput = document.querySelector("#edges");
const modes = ["Classic", "Euclidean"];
const placeholders = [
  "AB: 5, CD: 7, AC: 2, BC: 4, BD: 9",
  ["A(-1, 2) B(4, 1) C(-2, 6) D(3, 1) F(4, 5)", "A-B, B-C, C-D"],
];

switchModeBtn.addEventListener("click", () => {
  mode.textContent = mode.textContent === modes[0] ? modes[1] : modes[0];

  if (mode.textContent === "Classic") {
    nodesInput.disabled = true;
    edgesInput.placeholder = placeholders[0];
    nodesInput.placeholder = "";
    return;
  }

  nodesInput.placeholder = placeholders[1][0];
  edgesInput.placeholder = placeholders[1][1];
  nodesInput.disabled = false;
});

/* =============== CLOSE SETTINGS =============== */
const section = document.querySelector("section");
const hamburgerBtn = document.querySelector(".hamburger_icon");
const closeBtn = document.querySelector(".close_icon");

hamburgerBtn.addEventListener("click", () => {
  section.classList.remove("active");
  document.body.setAttribute("data-open", "true");
});

const closeSettings = (autoClose = false) => {
  if (!cy && !autoClose) {
    return;
  }

  section.classList.add("active");
  document.body.removeAttribute("data-open");
};

closeBtn.addEventListener("click", () => closeSettings());

document.body.addEventListener("click", ({ target }) => {
  if (!document.body.hasAttribute("data-open")) {
    return;
  }

  if (target === document.body) {
    closeSettings();
  }
});

/* =============== HANDLING START BUTTON =============== */
const startBtn = document.querySelector(".start_btn");

startBtn.addEventListener("click", (e) => {
  const currentMode = mode.textContent;
  const input = currentMode === "Classic" ? edgesInput.value : nodesInput.value;
  const edges = currentMode === "Euclidean" ? edgesInput.value : "";
  let nodesNumber = 0;
  let layoutType = "breadthfirst";

  e.preventDefault();

  if (input.trim() === "") {
    return;
  }

  closeSettings(true);

  const data = new GenerateData(currentMode, input, edges);

  nodesNumber =
    currentMode === "Euclidean" ? input.split(") ").length : data[1];
  layoutType = nodesNumber > 4 ? "circle" : "breadthfirst";

  initGraph(data[0], layoutType);
});

/* =============== SETTING UP THE BACKGROUND =============== */
const background = new GenerateData(
  "Classic",
  "AB: 4, AC: 8, BC: 11, BD: 8, CE: 7, CF: 1, DE: 2, EF: 6, DG: 7, DH: 4, FH: 2, GH: 14, GI: 9, HI: 10",
  edges
);

initGraph(background[0], "breadthfirst", true);
