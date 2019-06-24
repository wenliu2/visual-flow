import React, { Component } from "react"
import { PropertyPanelInput } from "./property-panel"

export class StartPropertyPanel extends Component<PropertyPanelInput> {
  render(){
    const { userObject } = this.props
    console.log(userObject)
    return <div>Start Property Panel, {JSON.stringify(userObject)}</div>
  }
}

export class EndPropertyPanel extends Component<PropertyPanelInput> {
  render(){
    return <div>End Property Panel</div>
  }
}