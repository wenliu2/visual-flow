import { UserObject } from "./user-object"
import { SimplePredict, Predict1 } from "./simple-predict";
export class IfUserObject extends UserObject {
  type: string = "If"
  predict: SimplePredict = new SimplePredict("true");
  predict1: Predict1 = new Predict1("false", "flag-yes");
  description: string = "If user object.";

  getLabel(){
    return "If" + "(" + this.predict.condition + ")"
  }
}

/*
const f = IfUserObject

const ifUO = new IfUserObject()
UserObjectRegistry.registerUserObject(ifUO.type, ifUO)
*/