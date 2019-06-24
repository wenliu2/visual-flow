import * as React from "react";
import * as ReactDOM from "react-dom"
import * as M from "mxgraph";
import MxGraphFactory from "mxgraph"

import "./mxgraph-editor.scss"
import { Sidebar } from "./sidebar";
import { PropertyPanel } from "./property-panel/property-panel"
import { GraphUtils } from "./graph-utils"
import connectorGif from "../resources/images/connector.gif"
import { UserObjectWrapper } from "./user-object/user-object"

export const mx = MxGraphFactory({
  mxLoadResources: true,
  mxLoadStylesheets: true,
})

type States = {
  graphLoaded: boolean,
  selectedCell: M.mxCell | null
}

const initialState: States = {
  graphLoaded: false,
  selectedCell: null
}

const initializeMxGraph = () => {
  initConstraints()
  userObjectWrapperCodec()
}

function initConstraints(){
  // Overridden to define per-shape connection points
  mx.mxGraph.prototype.getAllConnectionConstraints = (terminal: any, source: any) => {
	  if (terminal != null && terminal.shape != null) {
		  if (terminal.shape.stencil != null) { return terminal.shape.stencil.constraints; }
		  else if (terminal.shape.constraints != null) { return terminal.shape.constraints; }
	  }

	  return null;
  };

  //add default constraints into the shape
  mx.mxShape.prototype.constraints = [
    new mx.mxConnectionConstraint(new mx.mxPoint(0.25, 0), true),
    new mx.mxConnectionConstraint(new mx.mxPoint(0.5, 0), true),
    new mx.mxConnectionConstraint(new mx.mxPoint(0.75, 0), true),
    new mx.mxConnectionConstraint(new mx.mxPoint(0, 0.25), true),
    new mx.mxConnectionConstraint(new mx.mxPoint(0, 0.5), true),
    new mx.mxConnectionConstraint(new mx.mxPoint(0, 0.75), true),
    new mx.mxConnectionConstraint(new mx.mxPoint(1, 0.25), true),
    new mx.mxConnectionConstraint(new mx.mxPoint(1, 0.5), true),
    new mx.mxConnectionConstraint(new mx.mxPoint(1, 0.75), true),
    new mx.mxConnectionConstraint(new mx.mxPoint(0.25, 1), true),
    new mx.mxConnectionConstraint(new mx.mxPoint(0.5, 1), true),
    new mx.mxConnectionConstraint(new mx.mxPoint(0.75, 1), true)];

  // Edges have no connection points
  mx.mxPolyline.prototype.constraints = [];
}

/**
 * register codec for UserObjectWrapper
 */
function userObjectWrapperCodec(){
  const codec = new mx.mxObjectCodec(new UserObjectWrapper(null));

  codec.encode = function(enc, obj){
    const node = enc.document.createElement('UserData');
    const cdata:CDATASection = enc.document.createCDATASection(JSON.stringify(obj))
    node.appendChild(cdata)
  	return node;
  };

  codec.decode = function(dec, node, into){
    const obj = JSON.parse(mx.mxUtils.getTextContent(node));
    obj.constructor = UserObjectWrapper;
  
  	return obj;
  };

  mx.mxCodecRegistry.register(codec);
}

initializeMxGraph()


// MxGraphEditor component
export class MxGraphEditor extends React.Component<{}, States> {
  state = initialState
  graph!: M.mxGraph
  model!: M.mxGraphModel

  constructor(props: {}){
    super(props)
    this.dumpGraphDataHandler.bind(this);
  }
  // helper functions
  loadGraph = () => {
    let container = ReactDOM.findDOMNode(this.refs.divGraph)

    // Disables the built-in context menu
    mx.mxEvent.disableContextMenu(container);

    this.model = new mx.mxGraphModel();
    this.graph = new mx.mxGraph(container as Element, this.model);
    var parent = this.graph.getDefaultParent();
    this.setState({graphLoaded: true})

    // Enables new connections in the graph
    this.graph.setConnectable(true);
    this.graph.setMultigraph(false);

    this.graph.convertValueToString = GraphUtils.convertValueToString;

    var keyHandler = new mx.mxKeyHandler(this.graph);
    var rubberband = new mx.mxRubberband(this.graph);

    this.graph.getSelectionModel().addListener(mx.mxEvent.CHANGE, (sender: any, evt: any) => {
		  this.selectionChanged();
    });
  }

  selectionChanged() {
    let mxCell = this.graph.getSelectionCell()
    this.setState({selectedCell: mxCell})
  }

  // event functions
  dumpGraphDataHandler = (e: any) =>{
    e.preventDefault()

    const enc = new mx.mxCodec(null);
    const xmlNode = enc.encode(this.model);

    //Use getXML rather than getPrettyXml method here, which can't serilize CDATA section correctly.
    //that should be a bug.
    console.log("xml:", mx.mxUtils.getXml(xmlNode))
  }

  // overrided functions
  componentDidMount() {
    console.log("MxGraphEditor - DidMount")
    this.loadGraph()
  }

  render() {
    const { graphLoaded, selectedCell } = this.state
    return (
      <div className="editor">
        <div className="toolbar">
          <a href="#" onClick={(e) => this.dumpGraphDataHandler(e)}>Dump graph data</a>
        </div>
        <div className="mxgraph-container">
          { graphLoaded && <Sidebar title="Title of Sidebar" graph={this.graph}></Sidebar> }
          <div ref="divGraph" className="editor item"></div>
          { graphLoaded && <PropertyPanel title="Property" graph={this.graph} selectedCell={selectedCell}></PropertyPanel> }
        </div>
      </div>
    )
  }
}