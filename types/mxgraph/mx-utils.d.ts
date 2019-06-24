export var mxUtils: {
  /**
 * Function: getXml
 * 
 * Returns the XML content of the specified node. For Internet Explorer,
 * all \r\n\t[\t]* are removed from the XML string and the remaining \r\n
 * are replaced by \n. All \n are then replaced with linefeed, or &#xa; if
 * no linefeed is defined.
 * 
 * Parameters:
 * 
 * node - DOM node to return the XML for.
 * linefeed - Optional string that linefeeds are converted into. Default is
 * &#xa;
 */
  getXml(node: Node, linefeed?: string): string;

  /**
 * Function: setOpacity
 * 
 * Sets the opacity of the specified DOM node to the given value in %.
 * 
 * Parameters:
 * 
 * node - DOM node to set the opacity for.
 * value - Opacity in %. Possible values are between 0 and 100.
 */
   setOpacity(node: Node, value: number): void;
   /**
  * Function: makeDraggable
  * 
  * Configures the given DOM element to act as a drag source for the
  * specified graph. Returns a a new <mxDragSource>. If
  * <mxDragSource.guideEnabled> is enabled then the x and y arguments must
  * be used in funct to match the preview location.
  * 
  * Example:
  * 
  * (code)
  * var funct = function(graph, evt, cell, x, y)
  * {
  *   if (graph.canImportCell(cell))
  *   {
  *     var parent = graph.getDefaultParent();
  *     var vertex = null;
  *     
  *     graph.getModel().beginUpdate();
  *     try
  *     {
  * 	     vertex = graph.insertVertex(parent, null, 'Hello', x, y, 80, 30);
  *     }
  *     finally
  *     {
  *       graph.getModel().endUpdate();
  *     }
  *
  *     graph.setSelectionCell(vertex);
  *   }
  * }
  * 
  * var img = document.createElement('img');
  * img.setAttribute('src', 'editors/images/rectangle.gif');
  * img.style.position = 'absolute';
  * img.style.left = '0px';
  * img.style.top = '0px';
  * img.style.width = '16px';
  * img.style.height = '16px';
  * 
  * var dragImage = img.cloneNode(true);
  * dragImage.style.width = '32px';
  * dragImage.style.height = '32px';
  * mxUtils.makeDraggable(img, graph, funct, dragImage);
  * document.body.appendChild(img);
  * (end)
  * 
  * Parameters:
  * 
  * element - DOM element to make draggable.
  * graphF - <mxGraph> that acts as the drop target or a function that takes a
  * mouse event and returns the current <mxGraph>.
  * funct - Function to execute on a successful drop.
  * dragElement - Optional DOM node to be used for the drag preview.
  * dx - Optional horizontal offset between the cursor and the drag
  * preview.
  * dy - Optional vertical offset between the cursor and the drag
  * preview.
  * autoscroll - Optional boolean that specifies if autoscroll should be
  * used. Default is mxGraph.autoscroll.
  * scalePreview - Optional boolean that specifies if the preview element
  * should be scaled according to the graph scale. If this is true, then
  * the offsets will also be scaled. Default is false.
  * highlightDropTargets - Optional boolean that specifies if dropTargets
  * should be highlighted. Default is true.
  * getDropTarget - Optional function to return the drop target for a given
  * location (x, y). Default is mxGraph.getCellAt.
  */
  makeDraggable(element: any, 
      graphF: any, 
      funct: any, 
      dragElement?: any, 
      dx?: number, 
      dy?: number, 
      autoscroll?: any, 
      scalePreview?: any, 
      highlightDropTargets?: any, 
      getDropTarget?: any): void;

  /**
	 * Function: createXmlDocument
	 * 
	 * Returns a new, empty XML document.
	 */
  createXmlDocument: () => Document;  

  /**
	 * Function: getPrettyXML
	 * 
	 * Returns a pretty printed string that represents the XML tree for the
	 * given node. This method should only be used to print XML for reading,
	 * use <getXml> instead to obtain a string for processing.
	 * 
	 * Parameters:
	 * 
	 * node - DOM node to return the XML for.
	 * tab - Optional string that specifies the indentation for one level.
	 * Default is two spaces.
	 * indent - Optional string that represents the current indentation.
	 * Default is an empty string.
	 */
  getPrettyXml: (node: Node, tab?: string, indent?: string) => string;

  /**
	 * Function: clone
	 * 
	 * Recursively clones the specified object ignoring all fieldnames in the
	 * given array of transient fields. <mxObjectIdentity.FIELD_NAME> is always
	 * ignored by this function.
	 * 
	 * Parameters:
	 * 
	 * obj - Object to be cloned.
	 * transients - Optional array of strings representing the fieldname to be
	 * ignored.
	 * shallow - Optional boolean argument to specify if a shallow clone should
	 * be created, that is, one where all object references are not cloned or,
	 * in other words, one where only atomic (strings, numbers) values are
	 * cloned. Default is false.
	 */
  clone: (obj: {}, transients?: Array<string>, shallow?: boolean) => {};

  /**
	 * Function: isNode
	 * 
	 * Returns true if the given value is an XML node with the node name
	 * and if the optional attribute has the specified value.
	 * 
	 * This implementation assumes that the given value is a DOM node if the
	 * nodeType property is numeric, that is, if isNaN returns false for
	 * value.nodeType.
	 * 
	 * Parameters:
	 * 
	 * value - Object that should be examined as a node.
	 * nodeName - String that specifies the node name.
	 * attributeName - Optional attribute name to check.
	 * attributeValue - Optional attribute value to check.
	 */
  isNode: (value: any, nodeName?: string, attributeName?: string, attributeValue?: any) => boolean;

  /**
	 * Function: setTextContent
	 * 
	 * Sets the text content of the specified node.
	 * 
	 * Parameters:
	 * 
	 * node - DOM node to set the text content for.
	 * text - String that represents the text content.
	 */
  setTextContent: (node: Node, text: string) => void;

  /**
	 * Function: getTextContent
	 * 
	 * Returns the text content of the specified node.
	 * 
	 * Parameters:
	 * 
	 * node - DOM node to return the text content for.
	 */
	getTextContent: (node: Node) => string;
}