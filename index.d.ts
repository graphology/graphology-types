declare module "graphology" {
  import { Iterator } from "obliterator";

  interface IGraph {
    constructor(options?: any);
    hasNode(node: any): boolean;
    hasDirectedEdge(source: any, target: any): boolean;
    hasUndirectedEdge(source: any, target: any): boolean;
    hasEdge(source: any, target: any): boolean;
    directedEdge(source: any, target: any): any | undefined;
    undirectedEdge(source: any, target: any): any | undefined;
    edge(source: any, target: any): any | undefined;
    inDegree(node: any, selfLoops?: boolean): number;
    outDegree(node: any, selfLoops?: boolean): number;
    directedDegree(node: any, selfLoops?: boolean): number;
    undirectedDegree(node: any, selfLoops?: boolean): number;
    degree(node: any, selfLoops?: boolean): number;
    source(edge: any): any;
    target(edge: any): any;
    extremities(edge: any): any[];
    opposite(node, edge: any): any;
    undirected(edge: any): boolean;
    directed(edge: any): boolean;
    selfLoop(edge: any): boolean;
    addNode(node: any, attributes?: object): any;
    mergeNode(node: any, attributes?: object): any;
    dropNode(node: any): void;
    dropEdge(edge: any): void;
    clear(): void;
    clearEdges(): void;
    getAttribute(name: string): any;
    getAttributes(): any;
    hasAttribute(name: string): boolean;
    setAttribute(name: string, value: any): Graph;
    updateAttribute(name: string, updater: (value: any) => any): Graph;
    removeAttribute(name: string): Graph;
    replaceAttributes(attributes: object): Graph;
    mergeAttributes(attributes: object): Graph;
    getNodeAttribute(node: any, name: string);
    getNodeAttributes(node: any): object;
    hasNodeAttribute(node: any, name: string): boolean;
    setNodeAttribute(node: any, name: string, value: any): Graph;
    updateNodeAttribute(node: any, name: string, updater: (value: any) => any): Graph;
    removeNodeAttribute(node: any, name: string): Graph;
    replaceNodeAttributes(node: any, attributes: object): Graph;
    mergeNodeAttributes(node: any, attributes: object): Graph;
    forEach(
      callback: (
        sourceDataKey: any,
        targetDatakey: any,
        sourceDataAttributes: object,
        targetDataAttributes: object,
        key: any,
        edgeDataAttributes: object,
      ) => any,
    ): void;
    adjacency(): Iterator;
    nodes(): any[];
    forEachNode(callback: (key: string, attributes: object) => void): void;
    nodeEntries(): Iterator;
    exportNode(node: any): any;
    exportEdge(edge: any): any;
    export(): { attributes: any; nodes: any[]; edges: any[] };
    importNode(data: any, merge?: boolean): Graph;
    importEdge(data: any, merge?: boolean): Graph;
    import(data: any, merge?: boolean): Graph;
    emptyCopy(): Graph;
    copy(): Graph;
    upgradeToMixed(): Graph;
    upgradeToMulti(): Graph;
    clearIndex(): Graph;
    toJSON(): object;
    toString(): string;
    inspect(): any;
    addEdge(source: any, target: any, attributes?: object): any;
    mergeEdge(source: any, target: any, attributes?: object): any;
    addDirectedEdge(source: any, target: any, attributes?: object): any;
    mergeDirectedEdge(source: any, target: any, attributes?: object): any;
    addUndirectedEdge(source: any, target: any, attributes?: object): any;
    mergeUndirectedEdge(source: any, target: any, attributes?: object): any;
    addEdgeWithKey(edge: any, source: any, target: any, attributes?: object): any;
    mergeEdgeWithKey(edge: any, source: any, target: any, attributes?: object): any;
    addDirectedEdgeWithKey(edge: any, source: any, target: any, attributes?: object): any;
    mergeDirectedEdgeWithKey(edge: any, source: any, target: any, attributes?: object): any;
    addUndirectedEdgeWithKey(edge: any, source: any, target: any, attributes?: object): any;
    mergeUndirectedEdgeWithKey(edge: any, source: any, target: any, attributes?: object): any;
  }

  interface Graph extends IGraph {}
  interface DirectedGraph extends IGraph {}
  interface UndirectedGraph extends IGraph {}
  interface MultiDirectedGraph extends IGraph {}
  interface MultiUndirectedGraph extends IGraph {}

  export class Graph implements Graph {}
  export class DirectedGraph implements DirectedGraph {}
  export class UndirectedGraph implements UndirectedGraph {}
  export class MultiDirectedGraph implements MultiDirectedGraph {}
  export class MultiUndirectedGraph implements MultiUndirectedGraph {}
}
