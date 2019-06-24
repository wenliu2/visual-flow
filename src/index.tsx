import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./main.scss"

/*
import { Square } from './square';

import "storm-react-diagrams/src/sass/main.scss"
import "./main.scss"
*/

/*
import {
	DiagramEngine,
	DiagramModel,
	DefaultNodeModel,
	LinkModel,
	DiagramWidget,
	DefaultLinkModel
} from 'storm-react-diagrams';
import { mxgraph } from 'mxgraph';


const mx = require('mxgraph')({
	mxImageBasePath: 'mxgraph/images',
	mxBasePath: 'mxgraph'
});
*/
import { MxGraphEditor } from "./mxgraph-editor"

ReactDOM.render(
	<MxGraphEditor/>,
	document.getElementById('app'),
);
