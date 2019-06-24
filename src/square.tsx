import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  LinkModel,
  DiagramWidget,
  DefaultLinkModel,
} from 'storm-react-diagrams';

@observer
export class Square extends React.Component {
  @observable engine: DiagramEngine = new DiagramEngine();

  componentWillMount() {
    // 1) setup the diagram engine
    this.engine.installDefaultFactories();

    // 2) setup the diagram model
    const model = new DiagramModel();

		//3-A) create a default node
		var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
		let port1 = node1.addOutPort("Out");
    node1.setPosition(100, 100);

		//3-B) create another default node
		let node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
		let port2 = node2.addInPort("In");
		node2.addInPort("In2");
		node2.setPosition(400, 100);

		// link the ports
		let link1: DefaultLinkModel = (port1.link(port2) as DefaultLinkModel);
    link1.addLabel("Hello World!");
    link1.addLabel("Hello World - 2!");
    
    //link1.labels[0].type = "connect";

		//4) add the models to the root graph
		model.addAll(node1, node2, link1);

		//5) load model into engine
    this.engine.setDiagramModel(model);
  }

  dumpClickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    console.log(e);
    e.preventDefault();
    const diagramModel = this.engine.getDiagramModel()
    console.log(diagramModel.serializeDiagram())

  }

  render() {
    return (
      <div>
        <a href="#" onClick={this.dumpClickHandler}>dump</a>
			  <DiagramWidget className="srd-demo-canvas" diagramEngine={this.engine} />
      </div>
    );
  }
}
