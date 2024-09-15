export default class GenerateData {
  constructor(mode, input, edges = "") {
    this.mode = mode;
    this.input = input;
    this.edges = edges;
    this.alreadyInsertedNodes = "";
    this.elements = [];

    this.mode === "Classic" ? this.classicMode() : this.euclideanMode();

    if (this.mode === "Classic") {
      return [this.elements, this.alreadyInsertedNodes];
    }

    return [this.elements];
  }

  classicMode() {
    this.input.split(", ").forEach((edge) => {
      this.addNode(edge[0]);
      this.addNode(edge[1]);

      this.elements.push({
        data: {
          id: edge.slice(0, 2),
          source: edge[0],
          target: edge[1],
          weight: edge.slice(3),
        },
      });
    });
  }

  euclideanMode() {
    this.nodesCoordinates = {};

    this.input.split(") ").forEach((node) => {
      this.addNode(node[0]);
    });

    if (this.edges) {
      this.edges.split(", ").forEach((edge) => {
        this.elements.push({
          data: {
            id: `${edge[0]}${edge[2]}`,
            source: edge[0],
            target: edge[2],
            weight: this.calcEuclideanDistance(
              this.nodesCoordinates[edge[0]],
              this.nodesCoordinates[edge[2]]
            ),
          },
        });
      });

      return;
    }

    this.alreadyInsertedNodes = "";

    for (const [mainNode, mainNodeCoordinates] of Object.entries(
      this.nodesCoordinates
    )) {
      for (const [node, nodeCoordinates] of Object.entries(
        this.nodesCoordinates
      )) {
        if (mainNode === node || this.alreadyInsertedNodes.includes(node)) {
          continue;
        }

        this.elements.push({
          data: {
            id: `${mainNode}${node}`,
            source: mainNode,
            target: node,
            weight: this.calcEuclideanDistance(
              mainNodeCoordinates,
              nodeCoordinates
            ),
          },
        });
      }

      this.alreadyInsertedNodes += mainNode;
    }
  }

  calcEuclideanDistance(node1, node2) {
    return Math.floor(
      Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2))
    );
  }

  addNode(node) {
    if (this.alreadyInsertedNodes.includes(node)) {
      return;
    }

    if (this.mode === "Euclidean") {
      const closedBracketIndex = this.input
        .slice(this.input.indexOf(node) + 2)
        .indexOf(")");

      const coordinates = this.input
        .slice(this.input.indexOf(node) + 2)
        .slice(0, closedBracketIndex);

      const [x, y] = coordinates.split(", ");

      this.nodesCoordinates[node] = { x, y };
    }

    this.alreadyInsertedNodes += node;
    this.elements.push({ data: { id: node } });
  }
}
