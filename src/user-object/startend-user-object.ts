import { UserObject, UserObjectRegistry } from "./user-object"
import { ElementType } from "react";
import { DefaultPropertyPanel } from "../property-panel/property-panel";
import { StartPropertyPanel, EndPropertyPanel } from "../property-panel/startend-pp";
export class StartUserObject extends UserObject {
  getLabel = () => "Start";  
  type: string = "Start";
  getPropertyPanelComponent(): ElementType {
    return StartPropertyPanel
  }
}

export class EndUserObject extends UserObject {
  getLabel = () => "End";  
  type: string = "End";
  getPropertyPanelComponent(): ElementType {
    return EndPropertyPanel
  }
}