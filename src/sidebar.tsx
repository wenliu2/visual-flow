import React, {Component} from "react";
import ReactDOM from "react-dom"
import { mxGraph, mxToolbar, mxCell, mxUtils } from "mxgraph"
import { mx } from "./mxgraph-editor"
import { UserObjectRegistry, UserObjectWrapper } from "./user-object/user-object" 

type DefaultProps = Readonly<typeof defaultProps>
type Props = {
  title: string,
  graph: mxGraph
} & Partial<DefaultProps>

const defaultProps = {
  componentName: "sidebar"
}

type ShortcutVertexConfig = {
  img: string,
  shapeWidth: number,
  shapeHeight: number,
  style: string,
  type: string
}

const shortcutVertexs: Array<ShortcutVertexConfig> = [
  {img: "resources/images/ellipse.gif", shapeWidth: 40, shapeHeight: 40, style: "shape=ellipse", type: "Start"},
  {img: "resources/images/ellipse.gif", shapeWidth: 40, shapeHeight: 40, style: "shape=ellipse", type: "End"},
  {img: "resources/images/rounded.gif", shapeWidth: 100, shapeHeight: 40, style: "shape=rectangle;round=1", type: "CsvDataSource"},
]

export class Sidebar extends Component<Props>{
  static defaultProps = defaultProps
  toolbar!: mxToolbar

  componentDidMount(){
    const { graph } = this.props
    console.log("Sidebar - didMount")
    const container = ReactDOM.findDOMNode(this.refs.divToolbar)
    this.toolbar = new mx.mxToolbar(container)
    shortcutVertexs.forEach( cfg => this.addVertex(cfg) )
  }

  addToolbarItem = (graph: mxGraph, toolbar: mxToolbar, prototype: mxCell, image: string) => {
		// Function that is executed when the image is dropped on
		// the graph. The cell argument points to the cell under
		// the mousepointer if there is one.
		const dropAction = (graph: mxGraph, evt: any, cell: mxCell, x: number, y: number) => {
			graph.stopEditing(false);

			var vertex = graph.getModel().cloneCell(prototype);
			vertex.geometry.x = x;
			vertex.geometry.y = y;
				
			graph.addCell(vertex);
			graph.setSelectionCell(vertex);
		}
		
		// Creates the image which is used as the drag icon (preview)
		let img = toolbar.addMode(null, image, (evt: any, cell: any) => {
      /*
			var pt = graph.getPointForEvent(evt);
      funct(graph, evt, cell, pt.x, pt.y);
      */
    });

    let msg = { img, enabled: false }
		
		// Disables dragging if element is disabled. This is a workaround
		// for wrong event order in IE. Following is a dummy listener that
    // is invoked as the last listener in IE.
    /*
		mx.mxEvent.addListener(img, 'mousedown', function(evt: any){
      // do nothing
      console.log("mouse down 1")
    });
    */
		
		// This listener is always called first before any other listener
		// in all browsers.
		mx.mxEvent.addListener(img, 'mousedown', function(evt: any) {
      console.log("mouse down 2")
			if (msg.enabled == false){
				mx.mxEvent.consume(evt);
      }
    });
					
		mx.mxUtils.makeDraggable(img, graph, dropAction);
		return msg;
  }

  addVertex = (vertexConfig: ShortcutVertexConfig) => {
    const { img: icon, shapeWidth: w, shapeHeight: h, style, type } = vertexConfig
    const { graph } = this.props;
    
    const userObject = UserObjectRegistry.get(type)
    const uow = new UserObjectWrapper(mx.mxUtils.clone(userObject))

	  let vertex = new mx.mxCell(uow, new mx.mxGeometry(0, 0, w, h), style);
    vertex.setVertex(true);
				
	  let msg = this.addToolbarItem(graph, this.toolbar, vertex, icon);
		msg.enabled = true;
					
		graph.getSelectionModel().addListener(mx.mxEvent.CHANGE, function(){
	    var tmp = graph.isSelectionEmpty();
	    mx.mxUtils.setOpacity(msg.img, (tmp) ? 100 : 20);
		  msg.enabled = tmp;
    });
	};

  render() {
    const { componentName, title } = this.props
    return <div className="sidebar item" ref="divToolbar"></div>  
  }
}