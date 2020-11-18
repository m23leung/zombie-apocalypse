/**
*  Prints program output
**/  
export const printUnitPositions = (state) => {
    console.log("--------------------------");
    console.log(`zombies' positions:`);
    printPositions(state.zombies);
    console.log(`creatures' positions:`);
    printPositions(state.creatures);
    console.log("--------------------------");
  }
  
  /**
  *  Prints unit positions out. Helper function
  **/    
  export const printPositions = (unitList) => {
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