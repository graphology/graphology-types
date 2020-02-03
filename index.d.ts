/**
 * Graphology Typings
 * ===================
 *
 * Graphology TypeScript declaration.
 */

/**
 * Miscellaneous types.
 */
type PlainObject = {[name: string]: any};

type NodeKey = string | number;
type EdgeKey = NodeKey;

type GraphType = 'mixed' | 'directed' | 'undirected';

type EdgeKeyGeneratorFunction = (
  undirected?: boolean,
  source?: string,
  target?: string,
  attributes?: PlainObject
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
  PlainObject,
  PlainObject,
  string,
  PlainObject
];

type NodeEntry = [string, PlainObject];
type EdgeEntry = [string, PlainObject, string, string, PlainObject, PlainObject];

type AdjacencyCallback = (
  source: string,
  target: string,
  sourceAttributes: PlainObject,
  targetAttributes: PlainObject,
  edge: string,
  edgeAttributes: PlainObject
) => void;

type NodeIterationCallback = (
  node: string,
  attributes: PlainObject
) => void;

type EdgeIterationCallback = (
  edge: string,
  attributes: PlainObject,
  source: string,
  target: string,
  sourceAttributes: PlainObject,
  targetAttributes: PlainObject
) => void;

type SerializedNode = {
  key: string,
  attributes?: PlainObject
};

type SerializedEdge = {
  key?: string,
  source: string,
  target: string,
  attributes?: PlainObject,
  undirected?: boolean
};

type SerializedGraph = {
  attributes?: PlainObject,
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
  addNode(node: NodeKey, attributes?: PlainObject): string;
  mergeNode(node: NodeKey, attributes?: PlainObject): string;
  addEdge(source: NodeKey, target: NodeKey, attributes?: PlainObject): string;
  mergeEdge(source: NodeKey, target: NodeKey, attributes?: PlainObject): string;
  addDirectedEdge(source: NodeKey, target: NodeKey, attributes?: PlainObject): string;
  mergeDirectedEdge(source: NodeKey, target: NodeKey, attributes?: PlainObject): string;
  addUndirectedEdge(source: NodeKey, target: NodeKey, attributes?: PlainObject): string;
  mergeUndirectedEdge(source: NodeKey, target: NodeKey, attributes?: PlainObject): string;
  addEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: PlainObject): string;
  mergeEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: PlainObject): string;
  addDirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: PlainObject): string;
  mergeDirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: PlainObject): string;
  addUndirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: PlainObject): string;
  mergeUndirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: PlainObject): string;
  dropNode(node: NodeKey): void;
  dropEdge(edge: EdgeKey): void;
  clear(): void;
  clearEdges(): void;

  // Graph attribute methods
  getAttribute(name: string): any;
  getAttributes(): PlainObject;
  hasAttribute(name: string): boolean;
  setAttribute(name: string, value: any): this;
  updateAttribute(name: string, updater: (value: any) => any): this;
  removeAttribute(name: string): this;
  replaceAttributes(attributes: PlainObject): this;
  mergeAttributes(attributes: PlainObject): this;

  // Node attribute methods
  getNodeAttribute(node: NodeKey, name: string): any;
  getNodeAttributes(node: NodeKey): PlainObject;
  hasNodeAttribute(node: NodeKey, name: string): boolean;
  setNodeAttribute(node: NodeKey, name: string, value: any): this;
  updateNodeAttribute(node: NodeKey, name: string, updater: (value: any) => any): this;
  removeNodeAttribute(node: NodeKey, name: string): this;
  replaceNodeAttributes(node: NodeKey, attributes: PlainObject): this;
  mergeNodeAttributes(node: NodeKey, attributes: PlainObject): this;

  // Edge attribute methods
  getEdgeAttribute(edge: EdgeKey, name: string): any;
  getEdgeAttributes(edge: EdgeKey): PlainObject;
  hasEdgeAttribute(edge: EdgeKey, name: string): boolean;
  setEdgeAttribute(edge: EdgeKey, name: string, value: any): this;
  updateEdgeAttribute(edge: EdgeKey, name: string, updater: (value: any) => any): this;
  removeEdgeAttribute(edge: EdgeKey, name: string): this;
  replaceEdgeAttributes(edge: EdgeKey, attributes: PlainObject): this;
  mergeEdgeAttributes(edge: EdgeKey, attributes: PlainObject): this;

  getEdgeAttribute(source: NodeKey, target: NodeKey, name: string): any;
  getEdgeAttributes(source: NodeKey, target: NodeKey): PlainObject;
  hasEdgeAttribute(source: NodeKey, target: NodeKey, name: string): boolean;
  setEdgeAttribute(source: NodeKey, target: NodeKey, name: string, value: any): this;
  updateEdgeAttribute(source: NodeKey, target: NodeKey, name: string, updater: (value: any) => any): this;
  removeEdgeAttribute(source: NodeKey, target: NodeKey, name: string): this;
  replaceEdgeAttributes(source: NodeKey, target: NodeKey, attributes: PlainObject): this;
  mergeEdgeAttributes(source: NodeKey, target: NodeKey, attributes: PlainObject): this;

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
  toJSON(): SerializedGraph;
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
