/**
 * Graphology Typings
 * ===================
 *
 * Graphology TypeScript declaration.
 */

/**
 * Event Emitter typings for convience.
 * @note Taken from here: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/events/index.d.ts
 */
type Listener = (...args: any[]) => void;

declare class EventEmitter {
  static listenerCount(emitter: EventEmitter, type: string | number): number;
  static defaultMaxListeners: number;

  eventNames(): Array<string | number>;
  setMaxListeners(n: number): this;
  getMaxListeners(): number;
  emit(type: string | number, ...args: any[]): boolean;
  addListener(type: string | number, listener: Listener): this;
  on(type: string | number, listener: Listener): this;
  once(type: string | number, listener: Listener): this;
  prependListener(type: string | number, listener: Listener): this;
  prependOnceListener(type: string | number, listener: Listener): this;
  removeListener(type: string | number, listener: Listener): this;
  off(type: string | number, listener: Listener): this;
  removeAllListeners(type?: string | number): this;
  listeners(type: string | number): Listener[];
  listenerCount(type: string | number): number;
  rawListeners(type: string | number): Listener[];
}

/**
 * Miscellaneous types.
 */
type Attributes = {[key: string]: any};

type NodeKey = string | number;
type EdgeKey = NodeKey;

type GraphType = 'mixed' | 'directed' | 'undirected';

type EdgeKeyGeneratorFunction = (
  undirected: boolean,
  source: string,
  target: string,
  attributes: Attributes
) => EdgeKey;

type GraphOptions = {
  allowSelfLoops?: boolean
  edgeKeyGenerator?: EdgeKeyGeneratorFunction,
  multi?: boolean,
  type?: GraphType
};

type AdjacencyEntry = [
  string,
  string,
  Attributes,
  Attributes,
  string,
  Attributes
];

type NodeEntry = [string, Attributes];
type EdgeEntry = [string, Attributes, string, string, Attributes, Attributes];

type AdjacencyCallback = (
  source: string,
  target: string,
  sourceAttributes: Attributes,
  targetAttributes: Attributes,
  edge: string,
  edgeAttributes: Attributes
) => void;

type NodeIterationCallback = (
  node: string,
  attributes: Attributes
) => void;

type EdgeIterationCallback = (
  edge: string,
  attributes: Attributes,
  source: string,
  target: string,
  sourceAttributes: Attributes,
  targetAttributes: Attributes
) => void;

type SerializedNode = {
  key: string,
  attributes?: Attributes
};

type SerializedEdge = {
  key?: string,
  source: string,
  target: string,
  attributes?: Attributes,
  undirected?: boolean
};

type SerializedGraph = {
  attributes?: Attributes,
  nodes: Array<SerializedNode>,
  edges: Array<SerializedEdge>
};

/**
 * Main interface.
 */
declare abstract class AbstractGraph extends EventEmitter implements Iterable<AdjacencyEntry> {

  // Constructor
  constructor(options?: GraphOptions);

  // Members
  order: number;
  size: number;
  directedSize: number;
  undirectedSize: number;
  type: GraphType;
  multi: boolean;
  allowSelfLoops: boolean;

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
  neighbors(source: NodeKey, target: NodeKey): boolean;
  undirectedNeighbors(source: NodeKey, target: NodeKey): boolean;
  directedNeighbors(source: NodeKey, target: NodeKey): boolean;
  inNeighbors(source: NodeKey, target: NodeKey): boolean;
  outNeighbors(source: NodeKey, target: NodeKey): boolean;
  inboundNeighbors(source: NodeKey, target: NodeKey): boolean;
  outboundNeighbors(source: NodeKey, target: NodeKey): boolean;

  // Mutation methods
  addNode(node: NodeKey, attributes?: Attributes): string;
  mergeNode(node: NodeKey, attributes?: Attributes): string;
  addEdge(source: NodeKey, target: NodeKey, attributes?: Attributes): string;
  mergeEdge(source: NodeKey, target: NodeKey, attributes?: Attributes): string;
  addDirectedEdge(source: NodeKey, target: NodeKey, attributes?: Attributes): string;
  mergeDirectedEdge(source: NodeKey, target: NodeKey, attributes?: Attributes): string;
  addUndirectedEdge(source: NodeKey, target: NodeKey, attributes?: Attributes): string;
  mergeUndirectedEdge(source: NodeKey, target: NodeKey, attributes?: Attributes): string;
  addEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: Attributes): string;
  mergeEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: Attributes): string;
  addDirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: Attributes): string;
  mergeDirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: Attributes): string;
  addUndirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: Attributes): string;
  mergeUndirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: Attributes): string;
  dropNode(node: NodeKey): void;
  dropEdge(edge: EdgeKey): void;
  dropEdge(source: NodeKey, target: NodeKey): void;
  clear(): void;
  clearEdges(): void;

  // Graph attribute methods
  getAttribute(name: string): any;
  getAttributes(): Attributes;
  hasAttribute(name: string): boolean;
  setAttribute(name: string, value: any): this;
  updateAttribute(name: string, updater: (value: any) => any): this;
  removeAttribute(name: string): this;
  replaceAttributes(attributes: Attributes): this;
  mergeAttributes(attributes: Attributes): this;

  // Node attribute methods
  getNodeAttribute(node: NodeKey, name: string): any;
  getNodeAttributes(node: NodeKey): Attributes;
  hasNodeAttribute(node: NodeKey, name: string): boolean;
  setNodeAttribute(node: NodeKey, name: string, value: any): this;
  updateNodeAttribute(node: NodeKey, name: string, updater: (value: any) => any): this;
  removeNodeAttribute(node: NodeKey, name: string): this;
  replaceNodeAttributes(node: NodeKey, attributes: Attributes): this;
  mergeNodeAttributes(node: NodeKey, attributes: Attributes): this;

  // Edge attribute methods
  getEdgeAttribute(edge: EdgeKey, name: string): any;
  getEdgeAttributes(edge: EdgeKey): Attributes;
  hasEdgeAttribute(edge: EdgeKey, name: string): boolean;
  setEdgeAttribute(edge: EdgeKey, name: string, value: any): this;
  updateEdgeAttribute(edge: EdgeKey, name: string, updater: (value: any) => any): this;
  removeEdgeAttribute(edge: EdgeKey, name: string): this;
  replaceEdgeAttributes(edge: EdgeKey, attributes: Attributes): this;
  mergeEdgeAttributes(edge: EdgeKey, attributes: Attributes): this;

  getEdgeAttribute(source: NodeKey, target: NodeKey, name: string): any;
  getEdgeAttributes(source: NodeKey, target: NodeKey): Attributes;
  hasEdgeAttribute(source: NodeKey, target: NodeKey, name: string): boolean;
  setEdgeAttribute(source: NodeKey, target: NodeKey, name: string, value: any): this;
  updateEdgeAttribute(source: NodeKey, target: NodeKey, name: string, updater: (value: any) => any): this;
  removeEdgeAttribute(source: NodeKey, target: NodeKey, name: string): this;
  replaceEdgeAttributes(source: NodeKey, target: NodeKey, attributes: Attributes): this;
  mergeEdgeAttributes(source: NodeKey, target: NodeKey, attributes: Attributes): this;

  // Iteration methods
  [Symbol.iterator](): IterableIterator<AdjacencyEntry>;
  forEach(callback: AdjacencyCallback): void;
  adjacency(): IterableIterator<AdjacencyEntry>;

  nodes(): Array<string>;
  forEachNode(callback: NodeIterationCallback): void;
  nodeEntries(): IterableIterator<NodeEntry>;

  edges(): Array<string>;
  edges(node: NodeKey): Array<string>;
  edges(source: NodeKey, target: NodeKey): Array<string>;
  undirectedEdges(): Array<string>;
  undirectedEdges(node: NodeKey): Array<string>;
  undirectedEdges(source: NodeKey, target: NodeKey): Array<string>;
  directedEdges(): Array<string>;
  directedEdges(node: NodeKey): Array<string>;
  directedEdges(source: NodeKey, target: NodeKey): Array<string>;
  inEdges(): Array<string>;
  inEdges(node: NodeKey): Array<string>;
  inEdges(source: NodeKey, target: NodeKey): Array<string>;
  outEdges(): Array<string>;
  outEdges(node: NodeKey): Array<string>;
  outEdges(source: NodeKey, target: NodeKey): Array<string>;
  inboundEdges(): Array<string>;
  inboundEdges(node: NodeKey): Array<string>;
  inboundEdges(source: NodeKey, target: NodeKey): Array<string>;
  outboundEdges(): Array<string>;
  outboundEdges(node: NodeKey): Array<string>;
  outboundEdges(source: NodeKey, target: NodeKey): Array<string>;
  forEachEdge(callback: EdgeIterationCallback): void;
  forEachEdge(node: NodeKey, callback: EdgeIterationCallback): void;
  forEachEdge(source: NodeKey, target: NodeKey, callback: EdgeIterationCallback): void;
  forEachUndirectedEdge(callback: EdgeIterationCallback): void;
  forEachUndirectedEdge(node: NodeKey, callback: EdgeIterationCallback): void;
  forEachUndirectedEdge(source: NodeKey, target: NodeKey, callback: EdgeIterationCallback): void;
  forEachDirectedEdge(callback: EdgeIterationCallback): void;
  forEachDirectedEdge(node: NodeKey, callback: EdgeIterationCallback): void;
  forEachDirectedEdge(source: NodeKey, target: NodeKey, callback: EdgeIterationCallback): void;
  forEachInEdge(callback: EdgeIterationCallback): void;
  forEachInEdge(node: NodeKey, callback: EdgeIterationCallback): void;
  forEachInEdge(source: NodeKey, target: NodeKey, callback: EdgeIterationCallback): void;
  forEachOutEdge(callback: EdgeIterationCallback): void;
  forEachOutEdge(node: NodeKey, callback: EdgeIterationCallback): void;
  forEachOutEdge(source: NodeKey, target: NodeKey, callback: EdgeIterationCallback): void;
  forEachInboundEdge(callback: EdgeIterationCallback): void;
  forEachInboundEdge(node: NodeKey, callback: EdgeIterationCallback): void;
  forEachInboundEdge(source: NodeKey, target: NodeKey, callback: EdgeIterationCallback): void;
  forEachOutboundEdge(callback: EdgeIterationCallback): void;
  forEachOutboundEdge(node: NodeKey, callback: EdgeIterationCallback): void;
  forEachOutboundEdge(source: NodeKey, target: NodeKey, callback: EdgeIterationCallback): void;
  edgeEntries(): Iterator<EdgeEntry>;
  edgeEntries(node: NodeKey): Iterator<EdgeEntry>;
  edgeEntries(source: NodeKey, target: NodeKey): Iterator<EdgeEntry>;
  undirectedEdgeEntries(): Iterator<EdgeEntry>;
  undirectedEdgeEntries(node: NodeKey): Iterator<EdgeEntry>;
  undirectedEdgeEntries(source: NodeKey, target: NodeKey): Iterator<EdgeEntry>;
  directedEdgeEntries(): Iterator<EdgeEntry>;
  directedEdgeEntries(node: NodeKey): Iterator<EdgeEntry>;
  directedEdgeEntries(source: NodeKey, target: NodeKey): Iterator<EdgeEntry>;
  inEdgeEntries(): Iterator<EdgeEntry>;
  inEdgeEntries(node: NodeKey): Iterator<EdgeEntry>;
  inEdgeEntries(source: NodeKey, target: NodeKey): Iterator<EdgeEntry>;
  outEdgeEntries(): Iterator<EdgeEntry>;
  outEdgeEntries(node: NodeKey): Iterator<EdgeEntry>;
  outEdgeEntries(source: NodeKey, target: NodeKey): Iterator<EdgeEntry>;
  inboundEdgeEntries(): Iterator<EdgeEntry>;
  inboundEdgeEntries(node: NodeKey): Iterator<EdgeEntry>;
  inboundEdgeEntries(source: NodeKey, target: NodeKey): Iterator<EdgeEntry>;
  outboundEdgeEntries(): Iterator<EdgeEntry>;
  outboundEdgeEntries(node: NodeKey): Iterator<EdgeEntry>;
  outboundEdgeEntries(source: NodeKey, target: NodeKey): Iterator<EdgeEntry>;

  neighbors(node: NodeKey): Array<string>;
  undirectedNeighbors(node: NodeKey): Array<string>;
  directedNeighbors(node: NodeKey): Array<string>;
  inNeighbors(node: NodeKey): Array<string>;
  outNeighbors(node: NodeKey): Array<string>;
  inboundNeighbors(node: NodeKey): Array<string>;
  outboundNeighbors(node: NodeKey): Array<string>;
  forEachNeighbor(node: NodeKey, callback: NodeIterationCallback): void;
  forEachUndirectedNeighbor(node: NodeKey, callback: NodeIterationCallback): void;
  forEachDirectedNeighbor(node: NodeKey, callback: NodeIterationCallback): void;
  forEachInNeighbor(node: NodeKey, callback: NodeIterationCallback): void;
  forEachOutNeighbor(node: NodeKey, callback: NodeIterationCallback): void;
  forEachInboundNeighbor(node: NodeKey, callback: NodeIterationCallback): void;
  forEachOutboundNeighbor(node: NodeKey, callback: NodeIterationCallback): void;
  neighborEntries(node: NodeKey): Iterator<NodeEntry>;
  undirectedNeighborEntries(node: NodeKey): Iterator<NodeEntry>;
  directedNeighborEntries(node: NodeKey): Iterator<NodeEntry>;
  inNeighborEntries(node: NodeKey): Iterator<NodeEntry>;
  outNeighborEntries(node: NodeKey): Iterator<NodeEntry>;
  inboundNeighborEntries(node: NodeKey): Iterator<NodeEntry>;
  outboundNeighborEntries(node: NodeKey): Iterator<NodeEntry>;

  // Serialization methods
  exportNode(node: NodeKey): SerializedNode;
  exportEdge(edge: EdgeKey): SerializedEdge;
  export(): SerializedGraph;
  importNode(data: SerializedNode, merge?: boolean): this;
  importEdge(data: SerializedEdge, merge?: boolean): this;
  import(data: SerializedGraph, merge?: boolean): this;
  import(graph: AbstractGraph, merge?: boolean): this;

  // Utils
  nullCopy(): this;
  emptyCopy(): this;
  copy(): this;
  upgradeToMixed(): this;
  upgradeToMulti(): this;

  // Well-known methods
  toJSON(): SerializedGraph;
  toString(): string;
  inspect(): any;

  static from(data: SerializedGraph): AbstractGraph;
  static from(graph: AbstractGraph): AbstractGraph;
}

interface IGraphConstructor {
  new(options?: GraphOptions): AbstractGraph;
}

type GraphConstructor = IGraphConstructor;

export {
  AbstractGraph,
  Attributes,
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
  SerializedGraph,
  GraphConstructor
};

export default AbstractGraph;
