import React, { Component } from "react"
import { PropertyPanelInput } from "./property-panel"
import { CsvDataSource } from "../user-object/data-source"

export class CsvDataSourcePropertyPanel extends Component<PropertyPanelInput> {
  csvDataSource!: CsvDataSource

  constructor(props: PropertyPanelInput){
    super(props)
    this.csvDataSource = props.userObject as CsvDataSource
  }

  render(){
    return <div>CsvDataSource</div>
  }
}