import GenerateData from "./GenerateData.js";

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
    label: "data(weight)",
    // "source-arrow-shape": "triangle",
    "curve-style": "bezier",
    "line-style": "dashed",
    "line-dash-pattern": [12],
  },
};

const initGraph = (elements, layoutType) => {
  cy = cytoscape({
    container: document.getElementById("visualization_container"),
    elements,
    style: [nodeStyles, edgeStyles],
    layout: {
      name: layoutType,
    },
  });
};

/* =============== CHANGE MODE =============== */
const mode = document.querySelector(".mode");
const switchModeBtn = document.querySelector(".switch_mode__btn");
const nodesInput = document.querySelector("#nodes");
const modes = ["Classic", "Euclidean"];

switchModeBtn.addEventListener("click", () => {
  mode.textContent = mode.textContent === modes[0] ? modes[1] : modes[0];
  nodesInput.disabled = mode.textContent === "Classic" ? true : false;
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
const edgesInput = document.querySelector("#edges");

startBtn.addEventListener("click", (e) => {
  const currentMode = mode.textContent;
  const input = currentMode === "Classic" ? edgesInput.value : nodesInput.value;
  const edges = currentMode === "Euclidean" ? edgesInput.value : "";
  let nodesNumber = 0;
  let layoutType = "grid";

  e.preventDefault();

  if (input.trim() === "") {
    return;
  }

  closeSettings(true);

  const data = new GenerateData(currentMode, input, edges);

  nodesNumber =
    currentMode === "Euclidean" ? input.split(") ").length : data[1];
  layoutType = nodesNumber > 4 ? "circle" : "grid";

  initGraph(data[0], layoutType);
});

// AB: 5, CD: 7, AC: 2, BC: 4, BD: 9
// A(-1, 2) B(4, 1) C(-2, 6) D(3, 1) F(4, 5)
