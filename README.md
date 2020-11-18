# Zombie Apocalypse

## Contents
- [Description](#description)
- [Technology Stack](#technology-stack)
- [Get Started](#get-started)
- [Design and Architecture](#design-and-architecture)
- [Conclusion](#conclusion)

<img src="zombie.png" alt="zombie" width="415" height="515"/>

## Description
Zombie Apocalypse is a program that takes in commands from ther terminal. It walks around the world and infects creatures, whom will become zombies if touched.

At the beginning of the program, a single zombie awakes and begins to move around thegrid following a sequence of movements. Valid movements are Up, Down, Left, Right. The movement sequence is represented by a string of single character movements, e.g. RDRU
(Right, Down, Right, Up). Zombies can move through the edge of the grid, appearing on the directly opposite side. 

As a zombie moves, if it ends up on the same square as a creature, the creature is transformed into another zombie. The creatures are aware of the zombie’s presence but are so frightened that they never move.

Once a zombie has completed its movement, the first newly created zombie moves using the same sequence as the original zombie,then the second newly created zombie moves, and so on, in order of infection. Each zombie performs the same sequence of moves. Once all zombies have completed moving, the final positions of all zombies and creatures should be output, then the program ends.

## Technology Stack
- Javascript
- Redux
- Mocha / Chai

## Get Started
Note: Please make sure to have node.js installed.

1. Navigate to the root directory and run:
> npm install

2. Now run the application with:
> npm start

3. You can run the test suite by:
> npm test

## Design and Architecture
- I have developed this program with an OOP approach, where ES6 classes are used to preserve encapsulation. Redux was used to manage the state of the zombie and creatures's location on the board. It can also be used to store the previous state and other useful properties. By using the store and action reducers, we are able to execute the appropriate commands.

- It can be argued that an OOP approach will be more memory consuming/performance heavy than going a purely functional programming approach. As a result, I tried to not create any unnecessary classes and minimized the amount of object creation instances.

## Conclusion
- If I were to add more features, I would...
