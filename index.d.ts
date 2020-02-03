/**
 * Graphology Typings
 * ===================
 *
 * Graphology TypeScript declaration.
 */

/**
 * Miscellaneous types.
 */
type NodeKey = string | number;
type EdgeKey = NodeKey;

type GraphType = 'mixed' | 'directed' | 'undirected';

type EdgeKeyGeneratorFunction = (
  undirected?: boolean,
  source?: string,
  target?: string,
  attributes?: object
) => EdgeKey;

type GraphOptions = {
  allowSelfLoops: boolean
  edgeKeyGenerator: EdgeKeyGeneratorFunction,
  multi: boolean,
  type: GraphType
};

type AdjacencyEntry = [
  string,
  string,
  object,
  object,
  string,
  object
];

type NodeEntry = [string, object];
type EdgeEntry = [string, object, string, string, object, object];

type AdjacencyCallback = (
  source: string,
  target: string,
  sourceAttributes: object,
  targetAttributes: object,
  edge: string,
  edgeAttributes: object
) => void;

type NodeIterationCallback = (
  node: string,
  attributes: object
) => void;

type EdgeIterationCallback = (
  edge: string,
  attributes: object,
  source: string,
  target: string,
  sourceAttributes: object,
  targetAttributes: object
) => void;

type SerializedNode = {
  key: string,
  attributes?: object
};

type SerializedEdge = {
  key?: string,
  source: string,
  target: string,
  attributes?: object,
  undirected?: boolean
};

type SerializedGraph = {
  attributes?: object,
  nodes: Array<SerializedNode>,
  edges: Array<SerializedEdge>
};

/**
 * Main interface.
 */
interface IGraph extends Iterable<AdjacencyEntry> {

  // Constructor
  constructor(options?: GraphOptions);

  // Read methods
  hasNode(node: NodeKey): boolean;
  hasDirectedEdge(source: NodeKey, target: NodeKey): boolean;
  hasUndirectedEdge(source: NodeKey, target: NodeKey): boolean;
  hasEdge(source: NodeKey, target: NodeKey): boolean;
  directedEdge(source: NodeKey, target: NodeKey): string | undefined;
  undirectedEdge(source: NodeKey, target: NodeKey): string | undefined;
  edge(source: NodeKey, target: NodeKey): string | undefined;
  inDegree(node: NodeKey, selfLoops?: boolean): number;
  outDegree(node: NodeKey, selfLoops?: boolean): number;
  directedDegree(node: NodeKey, selfLoops?: boolean): number;
  undirectedDegree(node: NodeKey, selfLoops?: boolean): number;
  degree(node: NodeKey, selfLoops?: boolean): number;
  source(edge: EdgeKey): string;
  target(edge: EdgeKey): string;
  extremities(edge: EdgeKey): [string, string];
  opposite(node: NodeKey, edge: EdgeKey): string;
  undirected(edge: EdgeKey): boolean;
  directed(edge: EdgeKey): boolean;
  selfLoop(edge: EdgeKey): boolean;

  // Mutation methods
  addNode(node: NodeKey, attributes?: object): string;
  mergeNode(node: NodeKey, attributes?: object): string;
  addEdge(source: NodeKey, target: NodeKey, attributes?: object): string;
  mergeEdge(source: NodeKey, target: NodeKey, attributes?: object): string;
  addDirectedEdge(source: NodeKey, target: NodeKey, attributes?: object): string;
  mergeDirectedEdge(source: NodeKey, target: NodeKey, attributes?: object): string;
  addUndirectedEdge(source: NodeKey, target: NodeKey, attributes?: object): string;
  mergeUndirectedEdge(source: NodeKey, target: NodeKey, attributes?: object): string;
  addEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: object): string;
  mergeEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: object): string;
  addDirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: object): string;
  mergeDirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: object): string;
  addUndirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: object): string;
  mergeUndirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: object): string;
  dropNode(node: NodeKey): void;
  dropEdge(edge: EdgeKey): void;
  clear(): void;
  clearEdges(): void;

  // Graph attribute methods
  getAttribute(name: string): any;
  getAttributes(): object;
  hasAttribute(name: string): boolean;
  setAttribute(name: string, value: any): this;
  updateAttribute(name: string, updater: (value: any) => any): this;
  removeAttribute(name: string): this;
  replaceAttributes(attributes: object): this;
  mergeAttributes(attributes: object): this;

  // Node attribute methods
  getNodeAttribute(node: NodeKey, name: string): any;
  getNodeAttributes(node: NodeKey): object;
  hasNodeAttribute(node: NodeKey, name: string): boolean;
  setNodeAttribute(node: NodeKey, name: string, value: any): this;
  updateNodeAttribute(node: NodeKey, name: string, updater: (value: any) => any): this;
  removeNodeAttribute(node: NodeKey, name: string): this;
  replaceNodeAttributes(node: NodeKey, attributes: object): this;
  mergeNodeAttributes(node: NodeKey, attributes: object): this;

  // Edge attribute methods
  getEdgeAttribute(edge: EdgeKey, name: string): any;
  getEdgeAttributes(edge: EdgeKey): object;
  hasEdgeAttribute(edge: EdgeKey, name: string): boolean;
  setEdgeAttribute(edge: EdgeKey, name: string, value: any): this;
  updateEdgeAttribute(edge: EdgeKey, name: string, updater: (value: any) => any): this;
  removeEdgeAttribute(edge: EdgeKey, name: string): this;
  replaceEdgeAttributes(edge: EdgeKey, attributes: object): this;
  mergeEdgeAttributes(edge: EdgeKey, attributes: object): this;

  getEdgeAttribute(source: NodeKey, target: NodeKey, name: string): any;
  getEdgeAttributes(source: NodeKey, target: NodeKey): object;
  hasEdgeAttribute(source: NodeKey, target: NodeKey, name: string): boolean;
  setEdgeAttribute(source: NodeKey, target: NodeKey, name: string, value: any): this;
  updateEdgeAttribute(source: NodeKey, target: NodeKey, name: string, updater: (value: any) => any): this;
  removeEdgeAttribute(source: NodeKey, target: NodeKey, name: string): this;
  replaceEdgeAttributes(source: NodeKey, target: NodeKey, attributes: object): this;
  mergeEdgeAttributes(source: NodeKey, target: NodeKey, attributes: object): this;

  // Iteration methods
  [Symbol.iterator](): IterableIterator<AdjacencyEntry>;
  forEach(callback: AdjacencyCallback): void;
  adjacency(): IterableIterator<AdjacencyEntry>;
  nodes(): Array<string>;
  forEachNode(callback: NodeIterationCallback): void;
  nodeEntries(): IterableIterator<NodeEntry>;

  // Serialization methods
  exportNode(node: NodeKey): SerializedNode;
  exportEdge(edge: EdgeKey): SerializedEdge;
  export(): SerializedGraph;
  importNode(data: SerializedNode, merge?: boolean): this;
  importEdge(data: SerializedEdge, merge?: boolean): this;
  import(data: SerializedGraph, merge?: boolean): this;

  // Utils
  emptyCopy(): this;
  copy(): this;
  upgradeToMixed(): this;
  upgradeToMulti(): this;

  // Well-known methods
  toJSON(): object;
  toString(): string;
  inspect(): any;
}

type Graph = IGraph;

export {
  Graph,
  NodeKey,
  EdgeKey,
  GraphType,
  EdgeKeyGeneratorFunction,
  GraphOptions,
  AdjacencyEntry,
  NodeEntry,
  EdgeEntry,
  AdjacencyCallback,
  NodeIterationCallback,
  EdgeIterationCallback,
  SerializedNode,
  SerializedEdge,
  SerializedGraph
};

export default IGraph;
