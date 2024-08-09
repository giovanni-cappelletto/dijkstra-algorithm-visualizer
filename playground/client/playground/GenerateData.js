class GenerateData {
  constructor(mode, input, linksSize) {
    this.mode = mode;
    this.input = input;
    this.nodes = [];
    this.links = [];
    this.linksSize = linksSize;

    this.findNodes();
    this.generateData();
  }
  findNodes() {
    const links = this.input.split(", ");
    let tmpNodes = "";
    let tmpCounter = 0;

    for (let i = 0; i < links.length; i++) {
      this.links.push({
        source: `node${links[i][0]}`,
        target: `node${links[i][1]}`,
        value: this.linksSize,
      });

      for (let j = 0; j < 2; j++) {
        if (tmpNodes.includes(links[i][j])) {
          continue;
        }

        this.nodes.push({ id: `node${links[i][j]}`, group: tmpCounter });
        tmpCounter++;
        tmpNodes += links[i][j];
      }
    }
  }
  generateData() {
    const data = {
      nodes: this.nodes,
      links: this.links,
    };

    return JSON.stringify(data);
  }
}

export default GenerateData;

// {
//     "nodes": [
//       { "id": "test", "group": 1 },
//       { "id": "Napoleon", "group": 2 }
//     ],
//     "links": [{ "source": "Napoleon", "target": "test", "value": 1 }]
//   }
