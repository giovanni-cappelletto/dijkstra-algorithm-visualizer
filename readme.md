# Dijkstra's Algorithm Visualizer

A tool to understand how does Dijkstra's algorithm works by reading or visualizing it.

## How to use the program

Currently, you can use Dijkstra's Algorithm Visualizer in two modes: the Classic mode and the Euclidean one.

### How to use the program | Classic mode

By choosing Classic mode, you need to specify graph's nodes and edges in this format: _<firstNodeName><secondNodeName>: <edgeLength>_. For example, a valid input could be: _AB: 5, CD: 7, AC: 2, BC: 4, BD: 9_.

### How to use the program | Euclidean mode

By choosing Euclidean mode, you create nodes as they were points in a cartesian coordinate system. Then, the program will calculate automatically the distances between those points, which are the edges.
In order to create points in Euclidean mode, fill the "Nodes Coordinates" input with a string in this format: _<firstNodeName>(xCoordinate, yCoordinate)_. For example, a valid input could be: _A(-1, 2) B(4, 1) C(-2, 6) D(3, 1) F(4, 5)_.
Without specifying edges, the program will assume that all nodes are linked together. If you want only particular edges, please fill the "Edges" input like so: _<firstNodeName>-<secondNodeName>_. For example: _A-B, B-C, C-D_.
