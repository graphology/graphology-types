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

type EdgeKeyGeneratorFunction<EdgeAttributes extends Attributes = Attributes> = (
  undirected: boolean,
  source: string,
  target: string,
  attributes: EdgeAttributes
) => EdgeKey;

type GraphOptions<EdgeAttributes extends Attributes = Attributes> = {
  allowSelfLoops?: boolean,
  edgeKeyGenerator?: EdgeKeyGeneratorFunction<EdgeAttributes>,
  multi?: boolean,
  type?: GraphType
};

type AdjacencyEntry<NodeAttributes extends Attributes = Attributes, EdgeAttributes extends Attributes = Attributes> = [
  string,
  string,
  NodeAttributes,
  NodeAttributes,
  string,
  EdgeAttributes
];

type NodeEntry<NodeAttributes extends Attributes = Attributes> = [string, NodeAttributes];
type EdgeEntry<NodeAttributes extends Attributes = Attributes, EdgeAttributes extends Attributes = Attributes> = [string, EdgeAttributes, string, string, NodeAttributes, NodeAttributes];

type AdjacencyCallback<NodeAttributes extends Attributes = Attributes, EdgeAttributes extends Attributes = Attributes> = (
  source: string,
  target: string,
  sourceAttributes: NodeAttributes,
  targetAttributes: NodeAttributes,
  edge: string,
  edgeAttributes: EdgeAttributes
) => void;

type NodeIterationCallback<NodeAttributes extends Attributes = Attributes> = (
  node: string,
  attributes: NodeAttributes
) => void;

type EdgeIterationCallback<NodeAttributes extends Attributes = Attributes, EdgeAttributes extends Attributes = Attributes> = (
  edge: string,
  attributes: EdgeAttributes,
  source: string,
  target: string,
  sourceAttributes: NodeAttributes,
  targetAttributes: NodeAttributes
) => void;

type SerializedNode<NodeAttributes extends Attributes = Attributes> = {
  key: string,
  attributes?: NodeAttributes
};

type SerializedEdge<EdgeAttributes extends Attributes = Attributes> = {
  key?: string,
  source: string,
  target: string,
  attributes?: EdgeAttributes,
  undirected?: boolean
};

type SerializedGraphOptions = {
  allowSelfLoops?: boolean,
  multi?: boolean,
  type?: GraphType
};

type SerializedGraph<NodeAttributes extends Attributes = Attributes, EdgeAttributes extends Attributes = Attributes, GraphAttributes extends Attributes = Attributes> = {
  attributes?: GraphAttributes,
  options?: SerializedGraphOptions,
  nodes: Array<SerializedNode<NodeAttributes>>,
  edges: Array<SerializedEdge<EdgeAttributes>>
};

/**
 * Main interface.
 */
declare abstract class AbstractGraph<NodeAttributes extends Attributes = Attributes, EdgeAttributes extends Attributes = Attributes, GraphAttributes extends Attributes = Attributes> extends EventEmitter implements Iterable<AdjacencyEntry<NodeAttributes, EdgeAttributes>> {

  // Constructor
  constructor(options?: GraphOptions<EdgeAttributes>);

  // Members
  order: number;
  size: number;
  directedSize: number;
  undirectedSize: number;
  type: GraphType;
  multi: boolean;
  allowSelfLoops: boolean;
  implementation: string;
  selfLoopCount: number;
  directedSelfLoopCount: number;
  undirectedSelfLoopCount: number;

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
  isUndirected(edge: EdgeKey): boolean;
  isDirected(edge: EdgeKey): boolean;
  isSelfLoop(edge: EdgeKey): boolean;
  hasExtremity(edge: EdgeKey, node: NodeKey): boolean;
  hasGeneratedKey(edge: EdgeKey): boolean;
  neighbors(source: NodeKey, target: NodeKey): boolean;
  undirectedNeighbors(source: NodeKey, target: NodeKey): boolean;
  directedNeighbors(source: NodeKey, target: NodeKey): boolean;
  inNeighbors(source: NodeKey, target: NodeKey): boolean;
  outNeighbors(source: NodeKey, target: NodeKey): boolean;
  inboundNeighbors(source: NodeKey, target: NodeKey): boolean;
  outboundNeighbors(source: NodeKey, target: NodeKey): boolean;

  // Mutation methods
  addNode(node: NodeKey, attributes?: NodeAttributes): string;
  mergeNode(node: NodeKey, attributes?: NodeAttributes): string;
  addEdge(source: NodeKey, target: NodeKey, attributes?: EdgeAttributes): string;
  mergeEdge(source: NodeKey, target: NodeKey, attributes?: EdgeAttributes): string;
  addDirectedEdge(source: NodeKey, target: NodeKey, attributes?: EdgeAttributes): string;
  mergeDirectedEdge(source: NodeKey, target: NodeKey, attributes?: EdgeAttributes): string;
  addUndirectedEdge(source: NodeKey, target: NodeKey, attributes?: EdgeAttributes): string;
  mergeUndirectedEdge(source: NodeKey, target: NodeKey, attributes?: EdgeAttributes): string;
  addEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: EdgeAttributes): string;
  mergeEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: EdgeAttributes): string;
  addDirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: EdgeAttributes): string;
  mergeDirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: EdgeAttributes): string;
  addUndirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: EdgeAttributes): string;
  mergeUndirectedEdgeWithKey(edge: EdgeKey, source: NodeKey, target: NodeKey, attributes?: EdgeAttributes): string;
  dropNode(node: NodeKey): void;
  dropEdge(edge: EdgeKey): void;
  dropEdge(source: NodeKey, target: NodeKey): void;
  clear(): void;
  clearEdges(): void;

  // Graph attribute methods
  getAttribute(name: string): any;
  getAttributes(): GraphAttributes;
  hasAttribute(name: string): boolean;
  setAttribute(name: string, value: any): this;
  updateAttribute(name: string, updater: (value: any) => any): this;
  removeAttribute(name: string): this;
  replaceAttributes(attributes: GraphAttributes): this;
  mergeAttributes(attributes: GraphAttributes): this;

  // Node attribute methods
  getNodeAttribute(node: NodeKey, name: string): any;
  getNodeAttributes(node: NodeKey): NodeAttributes;
  hasNodeAttribute(node: NodeKey, name: string): boolean;
  setNodeAttribute(node: NodeKey, name: string, value: any): this;
  updateNodeAttribute(node: NodeKey, name: string, updater: (value: any) => any): this;
  removeNodeAttribute(node: NodeKey, name: string): this;
  replaceNodeAttributes(node: NodeKey, attributes: NodeAttributes): this;
  mergeNodeAttributes(node: NodeKey, attributes: NodeAttributes): this;

  // Edge attribute methods
  getEdgeAttribute(edge: EdgeKey, name: string): any;
  getEdgeAttributes(edge: EdgeKey): EdgeAttributes;
  hasEdgeAttribute(edge: EdgeKey, name: string): boolean;
  setEdgeAttribute(edge: EdgeKey, name: string, value: any): this;
  updateEdgeAttribute(edge: EdgeKey, name: string, updater: (value: any) => any): this;
  removeEdgeAttribute(edge: EdgeKey, name: string): this;
  replaceEdgeAttributes(edge: EdgeKey, attributes: EdgeAttributes): this;
  mergeEdgeAttributes(edge: EdgeKey, attributes: EdgeAttributes): this;

  getEdgeAttribute(source: NodeKey, target: NodeKey, name: string): any;
  getEdgeAttributes(source: NodeKey, target: NodeKey): EdgeAttributes;
  hasEdgeAttribute(source: NodeKey, target: NodeKey, name: string): boolean;
  setEdgeAttribute(source: NodeKey, target: NodeKey, name: string, value: any): this;
  updateEdgeAttribute(source: NodeKey, target: NodeKey, name: string, updater: (value: any) => any): this;
  removeEdgeAttribute(source: NodeKey, target: NodeKey, name: string): this;
  replaceEdgeAttributes(source: NodeKey, target: NodeKey, attributes: EdgeAttributes): this;
  mergeEdgeAttributes(source: NodeKey, target: NodeKey, attributes: EdgeAttributes): this;

  // Iteration methods
  [Symbol.iterator](): IterableIterator<AdjacencyEntry<NodeAttributes, EdgeAttributes>>;
  forEach(callback: AdjacencyCallback<NodeAttributes, EdgeAttributes>): void;
  adjacency(): IterableIterator<AdjacencyEntry<NodeAttributes, EdgeAttributes>>;

  nodes(): Array<string>;
  forEachNode(callback: NodeIterationCallback<NodeAttributes>): void;
  nodeEntries(): IterableIterator<NodeEntry<NodeAttributes>>;

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
  forEachEdge(callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachEdge(node: NodeKey, callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachEdge(source: NodeKey, target: NodeKey, callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachUndirectedEdge(callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachUndirectedEdge(node: NodeKey, callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachUndirectedEdge(source: NodeKey, target: NodeKey, callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachDirectedEdge(callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachDirectedEdge(node: NodeKey, callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachDirectedEdge(source: NodeKey, target: NodeKey, callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachInEdge(callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachInEdge(node: NodeKey, callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachInEdge(source: NodeKey, target: NodeKey, callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachOutEdge(callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachOutEdge(node: NodeKey, callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachOutEdge(source: NodeKey, target: NodeKey, callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachInboundEdge(callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachInboundEdge(node: NodeKey, callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachInboundEdge(source: NodeKey, target: NodeKey, callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachOutboundEdge(callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachOutboundEdge(node: NodeKey, callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  forEachOutboundEdge(source: NodeKey, target: NodeKey, callback: EdgeIterationCallback<NodeAttributes, EdgeAttributes>): void;
  edgeEntries(): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  edgeEntries(node: NodeKey): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  edgeEntries(source: NodeKey, target: NodeKey): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  undirectedEdgeEntries(): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  undirectedEdgeEntries(node: NodeKey): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  undirectedEdgeEntries(source: NodeKey, target: NodeKey): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  directedEdgeEntries(): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  directedEdgeEntries(node: NodeKey): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  directedEdgeEntries(source: NodeKey, target: NodeKey): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  inEdgeEntries(): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  inEdgeEntries(node: NodeKey): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  inEdgeEntries(source: NodeKey, target: NodeKey): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  outEdgeEntries(): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  outEdgeEntries(node: NodeKey): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  outEdgeEntries(source: NodeKey, target: NodeKey): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  inboundEdgeEntries(): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  inboundEdgeEntries(node: NodeKey): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  inboundEdgeEntries(source: NodeKey, target: NodeKey): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  outboundEdgeEntries(): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  outboundEdgeEntries(node: NodeKey): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;
  outboundEdgeEntries(source: NodeKey, target: NodeKey): IterableIterator<EdgeEntry<NodeAttributes, EdgeAttributes>>;

  neighbors(node: NodeKey): Array<string>;
  undirectedNeighbors(node: NodeKey): Array<string>;
  directedNeighbors(node: NodeKey): Array<string>;
  inNeighbors(node: NodeKey): Array<string>;
  outNeighbors(node: NodeKey): Array<string>;
  inboundNeighbors(node: NodeKey): Array<string>;
  outboundNeighbors(node: NodeKey): Array<string>;
  forEachNeighbor(node: NodeKey, callback: NodeIterationCallback<NodeAttributes>): void;
  forEachUndirectedNeighbor(node: NodeKey, callback: NodeIterationCallback<NodeAttributes>): void;
  forEachDirectedNeighbor(node: NodeKey, callback: NodeIterationCallback<NodeAttributes>): void;
  forEachInNeighbor(node: NodeKey, callback: NodeIterationCallback<NodeAttributes>): void;
  forEachOutNeighbor(node: NodeKey, callback: NodeIterationCallback<NodeAttributes>): void;
  forEachInboundNeighbor(node: NodeKey, callback: NodeIterationCallback<NodeAttributes>): void;
  forEachOutboundNeighbor(node: NodeKey, callback: NodeIterationCallback<NodeAttributes>): void;
  neighborEntries(node: NodeKey): IterableIterator<NodeEntry<NodeAttributes>>;
  undirectedNeighborEntries(node: NodeKey): IterableIterator<NodeEntry<NodeAttributes>>;
  directedNeighborEntries(node: NodeKey): IterableIterator<NodeEntry<NodeAttributes>>;
  inNeighborEntries(node: NodeKey): IterableIterator<NodeEntry<NodeAttributes>>;
  outNeighborEntries(node: NodeKey): IterableIterator<NodeEntry<NodeAttributes>>;
  inboundNeighborEntries(node: NodeKey): IterableIterator<NodeEntry<NodeAttributes>>;
  outboundNeighborEntries(node: NodeKey): IterableIterator<NodeEntry<NodeAttributes>>;

  // Serialization methods
  exportNode(node: NodeKey): SerializedNode<NodeAttributes>;
  exportEdge(edge: EdgeKey): SerializedEdge<EdgeAttributes>;
  export(): SerializedGraph<NodeAttributes, EdgeAttributes, GraphAttributes>;
  importNode(data: SerializedNode<NodeAttributes>, merge?: boolean): this;
  importEdge(data: SerializedEdge<EdgeAttributes>, merge?: boolean): this;
  import(data: SerializedGraph<NodeAttributes, EdgeAttributes, GraphAttributes>, merge?: boolean): this;
  import(graph: AbstractGraph<NodeAttributes, EdgeAttributes, GraphAttributes>, merge?: boolean): this;

  // Utils
  nullCopy(): this;
  emptyCopy(): this;
  copy(): this;
  upgradeToMixed(): this;
  upgradeToMulti(): this;

  // Well-known methods
  toJSON(): SerializedGraph<NodeAttributes, EdgeAttributes, GraphAttributes>;
  toString(): string;
  inspect(): any;

  static from<NodeAttributes extends Attributes = Attributes, EdgeAttributes extends Attributes = Attributes, GraphAttributes extends Attributes = Attributes>(data: SerializedGraph<NodeAttributes, EdgeAttributes, GraphAttributes>): AbstractGraph<NodeAttributes, EdgeAttributes, GraphAttributes>;
  static from<NodeAttributes extends Attributes = Attributes, EdgeAttributes extends Attributes = Attributes, GraphAttributes extends Attributes = Attributes>(graph: AbstractGraph<NodeAttributes, EdgeAttributes, GraphAttributes>): AbstractGraph<NodeAttributes, EdgeAttributes, GraphAttributes>;
}

interface IGraphConstructor<NodeAttributes extends Attributes = Attributes, EdgeAttributes extends Attributes = Attributes, GraphAttributes extends Attributes = Attributes> {
  new(options?: GraphOptions<GraphAttributes>): AbstractGraph<NodeAttributes, EdgeAttributes, GraphAttributes>;
}

type GraphConstructor<NodeAttributes extends Attributes = Attributes, EdgeAttributes extends Attributes = Attributes, GraphAttributes extends Attributes = Attributes> = IGraphConstructor<NodeAttributes, EdgeAttributes, GraphAttributes>;

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
