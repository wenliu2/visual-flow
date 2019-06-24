export interface TypeAware {
  type: string;
}

export abstract class UserObject implements TypeAware{
  abstract getLabel(): string;
  getPropertyPanelComponent(): ElementType {
    return DefaultPropertyPanel
  }
  abstract type: string;
}

class UserObjectRegistryType{
  registry: Map<string, UserObject> = new Map()

  registerUserObject<T extends UserObject>(name: string, userObject: T) {
    //userObject.onInit();
    this.registry.set(name, userObject)
  }

  get(name: string): UserObject {
    const userObject = this.registry.get(name)
    if ( !userObject ) throw new Error(`UserObject not found for ${name}`)
    return userObject
  }
}

export const UserObjectRegistry = new UserObjectRegistryType()
export * from "./if-user-object"
export * from "./startend-user-object"

export class UserObjectWrapper {
  data!: any

  constructor(data: any){
    this.data = data
  }
}

import { CsvDataSource } from "./data-source"
import { IfUserObject } from "./if-user-object"
import { StartUserObject, EndUserObject } from "./startend-user-object"
import { ElementType } from "react";
import { DefaultPropertyPanel } from "../property-panel/property-panel";

const userObjects: Array<UserObject> = [
  new CsvDataSource(), 
  new IfUserObject(),
  new StartUserObject(),
  new EndUserObject()
]

userObjects.forEach( (uo) => UserObjectRegistry.registerUserObject(uo.type, uo))