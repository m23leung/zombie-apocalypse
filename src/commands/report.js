/*******************************
* Purpose: Report command 
********************************/
import { command } from "./command";

export default class report extends command {
  
  constructor(state, action, steps) {
    super(state, action);
  }

  execute() {
      this.printUnitPositions(this.state);   
      return this;
  }

  /**
  *  Prints unit positions out.
  * @param  state
  **/      
  printUnitPositions(state) {
    console.log("--------------------------");
    console.log(`zombies' positions:`);
    this.printPositions(state.zombies);
    console.log(`creatures' positions:`);
    this.printPositions(state.creatures);
    console.log("--------------------------");
  }
  
  /**
  *  Prints unit positions out. Helper function
  * @param  unitList
  **/    
  printPositions(unitList) {
    let output = '';
  
    if (unitList.length < 1) {
      output = 'none';
    } else {
      for (let i=0; i < unitList.length; i++) {
        output += `(${unitList[i].x},${unitList[i].y})`;
      }
    }
    console.log(output);
  }
}