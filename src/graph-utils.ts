import { mxGraph, mxToolbar, mxCell, mxUtils } from "mxgraph"
import { UserObject, IfUserObject, UserObjectWrapper } from "./user-object/user-object"

export const GraphUtils = {
  convertValueToString: function(cell: mxCell){
    const cellValue = cell.value
    if ( cellValue && cellValue.data && cellValue.data.getLabel  ) {
      /*
      const typeCellValue = <UserObjectWrapper>cellValue;
      if ( (<IfUserObject>typeCellValue).data.getLabel ){
      }
      */

      return cellValue.data.getLabel()
    }
    return "Unknown Label";
  } // --convertValueToString

}
