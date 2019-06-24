import { UserObject } from "./user-object"
import { CsvDataSourcePropertyPanel } from "../property-panel/data-source-pp"
import { ElementType } from "react";
export class CsvDataSource extends UserObject{
  getLabel(){
    return `${this.type}`;
  }

  type: string = "CsvDataSource";

  //properties
  //file name
  fileName: string = "";
  //if the first row is header
  hasHeader: boolean = false;

  columns: Array<String> = []

  getPropertyPanelComponent(): ElementType {
    return CsvDataSourcePropertyPanel
  }
  
}

/*
const csvds = new CsvDataSource()
UserObjectRegistry.registerUserObject(csvds.type, csvds)
*/