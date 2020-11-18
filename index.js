/****************************************************
* Purpose: Main entry to program
*****************************************************/

// Package Imports
import Program from "./src/components/program";
import { parseReadCommand } from "./src/readHelper";

// Initialize program
let program = new Program();

// Print the menu screen details
program.printMessage();

// Parse Input
program.parseInput();