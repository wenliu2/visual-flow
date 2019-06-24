import React, {Component, ReactType} from "react";
import ReactDOM from "react-dom"
import { mxGraph, mxToolbar, mxCell, mxUtils } from "mxgraph"
import { mx } from "../mxgraph-editor"
import { UserObject, UserObjectWrapper } from "../user-object/user-object";
import { StartPropertyPanel, EndPropertyPanel } from "./startend-pp"

type DefaultProps = Readonly<typeof defaultProps>
type Props = {
  title: string,
  graph: mxGraph,
  selectedCell: mxCell|null
} & Partial<DefaultProps>

const defaultProps = {
  componentName: "property-panel"
}

const initialState = {
}

type States = typeof initialState

export class PropertyPanel extends Component<Props, States>{
  state = initialState
  static defaultProps = defaultProps

  render() {
    const {selectedCell} = this.props

    function comp():JSX.Element {
      if ( selectedCell && selectedCell.value && selectedCell.value.constructor.name == 'UserObjectWrapper') {
      let uow: UserObjectWrapper = selectedCell.value as UserObjectWrapper
        const Comp: ReactType = uow.data.getPropertyPanelComponent()
        return <Comp userObject={uow.data} setUserObject={(uo: UserObject)=>uow.data = uo}/>
      }
      //no cell selected or not a UserObjectWrapper
      return <div>No cell selected.</div>
    }

    return (
      <div className="property-panel">{comp()}</div>
    )
  }
}

export class DefaultPropertyPanel extends Component<PropertyPanelInput>{
  render(){
    return <div>Default Property Panel</div>
  }
}

export type PropertyPanelInput = {
  userObject: UserObject;
  setUserObject: (userObject: UserObject) => void;
}

/*
const propertyPanelRegistry: Map<String, Component> = new Map<String, Component>()
function registerPropertyPanel(type: String, propertyPanel: Component) {
  propertyPanelRegistry.set(type, propertyPanel)
}
*/