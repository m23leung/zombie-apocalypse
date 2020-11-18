/****************************************************
* Purpose: Main entry to program
*****************************************************/

// Package Imports
import Program from "./src/components/program";

// Initialize program
let program = new Program();

// Print the menu screen details
program.printMessage();

// Parse Input
program.parseInput();