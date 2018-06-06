// https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/graph/__test__/Graph.test.js
import Graph from "./graph";
import Vertex from "./graph-vertex";
import Edge from "./graph-edge";

describe("Graph", () => {
  it("should add vertices to graph", () => {
    const graph = new Graph();

    const vertexA = new Vertex("A");
    const vertexB = new Vertex("B");

    graph.addVertex(vertexA).addVertex(vertexB);

    expect(graph.toString()).toBe("A,B");
    expect(graph.getVertexByKey(vertexA.getKey())).toEqual(vertexA);
    expect(graph.getVertexByKey(vertexB.getKey())).toEqual(vertexB);
  });

  it("should add edges to undirected graph", () => {
    const graph = new Graph();

    const vertexA = new Vertex("A");
    const vertexB = new Vertex("B");

    const edgeAB = new Edge(vertexA, vertexB);

    graph.addEdge(edgeAB);

    expect(graph.getAllVertices().length).toBe(2);
    expect(graph.getAllVertices()[0]).toEqual(vertexA);
    expect(graph.getAllVertices()[1]).toEqual(vertexB);

    const graphVertexA = graph.findVertexByKey(vertexA.getKey());
    const graphVertexB = graph.findVertexByKey(vertexB.getKey());

    expect(graph.toString()).toBe("A,B");
    expect(graphVertexA).toBeDefined();
    expect(graphVertexB).toBeDefined();

    expect(graph.findVertexByKey("not existing")).toBeNull();

    expect(graphVertexA.getNeighbors().length).toBe(1);
    expect(graphVertexA.getNeighbors()[0]).toEqual(vertexB);
    expect(graphVertexA.getNeighbors()[0]).toEqual(graphVertexB);

    expect(graphVertexB.getNeighbors().length).toBe(1);
    expect(graphVertexB.getNeighbors()[0]).toEqual(vertexA);
    expect(graphVertexB.getNeighbors()[0]).toEqual(graphVertexA);
  });

  it("should add edges to directed graph", () => {
    const graph = new Graph(true);

    const vertexA = new Vertex("A");
    const vertexB = new Vertex("B");

    const edgeAB = new Edge(vertexA, vertexB);

    graph.addEdge(edgeAB);

    const graphVertexA = graph.findVertexByKey(vertexA.getKey());
    const graphVertexB = graph.findVertexByKey(vertexB.getKey());

    expect(graph.toString()).toBe("A,B");
    expect(graphVertexA).toBeDefined();
    expect(graphVertexB).toBeDefined();

    expect(graphVertexA.getNeighbors().length).toBe(1);
    expect(graphVertexA.getNeighbors()[0]).toEqual(vertexB);
    expect(graphVertexA.getNeighbors()[0]).toEqual(graphVertexB);

    expect(graphVertexB.getNeighbors().length).toBe(0);
  });

  it("should find edge by vertices in undirected graph", () => {
    const graph = new Graph();

    const vertexA = new Vertex("A");
    const vertexB = new Vertex("B");
    const vertexC = new Vertex("C");

    const edgeAB = new Edge(vertexA, vertexB, 10);

    graph.addEdge(edgeAB);

    const graphEdgeAB = graph.findEdge(vertexA, vertexB);
    const graphEdgeBA = graph.findEdge(vertexB, vertexA);
    const graphEdgeAC = graph.findEdge(vertexB, vertexC);

    expect(graphEdgeAC).toBeNull();
    expect(graphEdgeAB).toEqual(edgeAB);
    expect(graphEdgeBA).toEqual(edgeAB);
    expect(graphEdgeAB.weight).toBe(10);
  });

  it("should find edge by vertices in directed graph", () => {
    const graph = new Graph(true);

    const vertexA = new Vertex("A");
    const vertexB = new Vertex("B");
    const vertexC = new Vertex("C");

    const edgeAB = new Edge(vertexA, vertexB, 10);

    graph.addEdge(edgeAB);

    const graphEdgeAB = graph.findEdge(vertexA, vertexB);
    const graphEdgeBA = graph.findEdge(vertexB, vertexA);
    const graphEdgeAC = graph.findEdge(vertexB, vertexC);

    expect(graphEdgeAC).toBeNull();
    expect(graphEdgeBA).toBeNull();
    expect(graphEdgeAB).toEqual(edgeAB);
    expect(graphEdgeAB.weight).toBe(10);
  });

  it("should return vertex neighbors", () => {
    const graph = new Graph(true);

    const vertexA = new Vertex("A");
    const vertexB = new Vertex("B");
    const vertexC = new Vertex("C");

    const edgeAB = new Edge(vertexA, vertexB);
    const edgeAC = new Edge(vertexA, vertexC);

    graph.addEdge(edgeAB).addEdge(edgeAC);

    const neighbors = graph.getNeighbors(vertexA);

    expect(neighbors.length).toBe(2);
    expect(neighbors[0]).toEqual(vertexB);
    expect(neighbors[1]).toEqual(vertexC);
  });

  it("should throw an error when trying to add edge twice", () => {
    function addSameEdgeTwice() {
      const graph = new Graph(true);

      const vertexA = new Vertex("A");
      const vertexB = new Vertex("B");

      const edgeAB = new Edge(vertexA, vertexB);

      graph.addEdge(edgeAB).addEdge(edgeAB);
    }

    expect(addSameEdgeTwice).toThrow();
  });

  it("should return the list of all added edges", () => {
    const graph = new Graph(true);

    const vertexA = new Vertex("A");
    const vertexB = new Vertex("B");
    const vertexC = new Vertex("C");

    const edgeAB = new Edge(vertexA, vertexB);
    const edgeBC = new Edge(vertexB, vertexC);

    graph.addEdge(edgeAB).addEdge(edgeBC);

    const edges = graph.getAllEdges();

    expect(edges.length).toBe(2);
    expect(edges[0]).toEqual(edgeAB);
    expect(edges[1]).toEqual(edgeBC);
  });

  it("should calculate total graph weight for default graph", () => {
    const graph = new Graph();

    const vertexA = new Vertex("A");
    const vertexB = new Vertex("B");
    const vertexC = new Vertex("C");
    const vertexD = new Vertex("D");

    const edgeAB = new Edge(vertexA, vertexB);
    const edgeBC = new Edge(vertexB, vertexC);
    const edgeCD = new Edge(vertexC, vertexD);
    const edgeAD = new Edge(vertexA, vertexD);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeAD);

    expect(graph.getWeight()).toBe(0);
  });

  it("should calculate total graph weight for weighted graph", () => {
    const graph = new Graph();

    const vertexA = new Vertex("A");
    const vertexB = new Vertex("B");
    const vertexC = new Vertex("C");
    const vertexD = new Vertex("D");

    const edgeAB = new Edge(vertexA, vertexB, 1);
    const edgeBC = new Edge(vertexB, vertexC, 2);
    const edgeCD = new Edge(vertexC, vertexD, 3);
    const edgeAD = new Edge(vertexA, vertexD, 4);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeAD);

    expect(graph.getWeight()).toBe(10);
  });

  it("should be possible to delete edges from graph", () => {
    const graph = new Graph();

    const vertexA = new Vertex("A");
    const vertexB = new Vertex("B");
    const vertexC = new Vertex("C");

    const edgeAB = new Edge(vertexA, vertexB);
    const edgeBC = new Edge(vertexB, vertexC);
    const edgeAC = new Edge(vertexA, vertexC);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeAC);

    expect(graph.getAllEdges().length).toBe(3);

    graph.deleteEdge(edgeAB);

    expect(graph.getAllEdges().length).toBe(2);
    expect(graph.getAllEdges()[0].getKey()).toBe(edgeBC.getKey());
    expect(graph.getAllEdges()[1].getKey()).toBe(edgeAC.getKey());
  });

  it("should should throw an error when trying to delete not existing edge", () => {
    function deleteNotExistingEdge() {
      const graph = new Graph();

      const vertexA = new Vertex("A");
      const vertexB = new Vertex("B");
      const vertexC = new Vertex("C");

      const edgeAB = new Edge(vertexA, vertexB);
      const edgeBC = new Edge(vertexB, vertexC);

      graph.addEdge(edgeAB);
      graph.deleteEdge(edgeBC);
    }

    expect(deleteNotExistingEdge).toThrowError();
  });

  it("should be possible to reverse graph", () => {
    const vertexA = new Vertex("A");
    const vertexB = new Vertex("B");
    const vertexC = new Vertex("C");
    const vertexD = new Vertex("D");

    const edgeAB = new Edge(vertexA, vertexB);
    const edgeAC = new Edge(vertexA, vertexC);
    const edgeCD = new Edge(vertexC, vertexD);

    const graph = new Graph(true);
    graph
      .addEdge(edgeAB)
      .addEdge(edgeAC)
      .addEdge(edgeCD);

    expect(graph.toString()).toBe("A,B,C,D");
    expect(graph.getAllEdges().length).toBe(3);
    expect(graph.getNeighbors(vertexA).length).toBe(2);
    expect(graph.getNeighbors(vertexA)[0].getKey()).toBe(vertexB.getKey());
    expect(graph.getNeighbors(vertexA)[1].getKey()).toBe(vertexC.getKey());
    expect(graph.getNeighbors(vertexB).length).toBe(0);
    expect(graph.getNeighbors(vertexC).length).toBe(1);
    expect(graph.getNeighbors(vertexC)[0].getKey()).toBe(vertexD.getKey());
    expect(graph.getNeighbors(vertexD).length).toBe(0);

    graph.reverse();

    expect(graph.toString()).toBe("A,B,C,D");
    expect(graph.getAllEdges().length).toBe(3);
    expect(graph.getNeighbors(vertexA).length).toBe(0);
    expect(graph.getNeighbors(vertexB).length).toBe(1);
    expect(graph.getNeighbors(vertexB)[0].getKey()).toBe(vertexA.getKey());
    expect(graph.getNeighbors(vertexC).length).toBe(1);
    expect(graph.getNeighbors(vertexC)[0].getKey()).toBe(vertexA.getKey());
    expect(graph.getNeighbors(vertexD).length).toBe(1);
    expect(graph.getNeighbors(vertexD)[0].getKey()).toBe(vertexC.getKey());
  });

  it("should return vertices indices", () => {
    const vertexA = new Vertex("A");
    const vertexB = new Vertex("B");
    const vertexC = new Vertex("C");
    const vertexD = new Vertex("D");

    const edgeAB = new Edge(vertexA, vertexB);
    const edgeBC = new Edge(vertexB, vertexC);
    const edgeCD = new Edge(vertexC, vertexD);
    const edgeBD = new Edge(vertexB, vertexD);

    const graph = new Graph();
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeBD);

    const verticesIndices = graph.getVerticesIndices();
    expect(verticesIndices).toEqual({
      A: 0,
      B: 1,
      C: 2,
      D: 3
    });
  });
});