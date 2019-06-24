import { TypeAware } from "./user-object"
export class SimplePredict implements TypeAware{
  condition!: string;
  type = "simple-predict"

  constructor(condition: string) {
    this.condition = condition;
  }
}

export class Predict1 extends SimplePredict{
  type = "predict1"
  flag!: string
  constructor(condition: string, flag: string){
    super(condition)
    this.flag = flag;
  }
}