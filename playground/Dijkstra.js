const Dijkstra = (cy) => {
  const nodes = cy.nodes();

  const distances = {};
  nodes.forEach(
    (node) =>
      (distances[node.id()] = {
        weight: Infinity,
        edgeId: null,
      })
  ); // Sets all distances to infinity
  distances["A"].weight = 0; // Sets root node's distance to 0

  const visitedNodes = new Set();

  for (let i = 0; i < nodes.length; i++) {
    const currentNodeId = nodes[i].id();

    cy.$(`node#${currentNodeId}`)
      .connectedEdges()
      .forEach((edge) => {
        const targetId =
          edge.source().id() === currentNodeId
            ? edge.target().id()
            : edge.source().id();

        // Prevents recalculating cases like B-A, since we already calculated A-B.
        // We can not do it for every case because with a more complex graph we could
        // need either something like D-F or F-D to find the smallest one
        if (visitedNodes.has(targetId) && currentNodeId === "A") {
          return;
        }

        if (
          Number(edge.data().weight) + distances[currentNodeId].weight <
          distances[targetId].weight
        ) {
          distances[targetId].weight =
            Number(edge.data().weight) + distances[currentNodeId].weight;

          distances[targetId].edgeId = `${currentNodeId}${targetId}`;
        }
      });

    visitedNodes.add(currentNodeId);
  }

  const sortedDistances = sortBasedOnEdges(distances);

  return sortedDistances;
};

// Sorts based on the first letter of edgeId.
// If the first letter of two edgeIds is the same, the second letter is compared
const sortBasedOnEdges = (distances) => {
  const sortedDistances = Object.entries(distances)
    .sort((distanceA, distanceB) => {
      if (distanceA[1].edgeId === null || distanceB[1].edgeId === null) {
        return 1;
      }

      if (distanceA[1].edgeId[0] > distanceB[1].edgeId[0]) {
        return 1;
      } else if (distanceA[1].edgeId[0] < distanceB[1].edgeId[0]) {
        return -1;
      }
      if (distanceA[1].edgeId[1] > distanceB[1].edgeId[1]) {
        return 1;
      } else if (distanceA[1].edgeId[1] < distanceB[1].edgeId[1]) {
        return -1;
      }

      return 0;
    })
    .reduce(
      (accumulator, value) => ({ ...accumulator, [value[0]]: value[1] }),
      {}
    );

  return sortedDistances;
};

export default Dijkstra;
