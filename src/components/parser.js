/************************************************************
* Purpose: Parses user input to invoke appropriate commands
*************************************************************/
import commandList from "../constants/commandList";
import fs from 'fs';

export default class parser {

    /**
     * Processes the command provided by user
     * @param  input
     * @param  zombie
     */   
    parseCommand(input, zombie) {

        const command = input.toUpperCase().trim();
        const [commandType, commandArgs] = command.split(' ');    

                // Trigger the respective command
                switch(commandType) {
                    case commandList.LEFT:
                    case commandList.RIGHT:
                        return [rotateUnit({ 'side': commandType})];

                    case commandList.UNDO:
                        return [undo()];  

                    default:
                        console.log(invalidCommand,':', commandType);
                        return [];                                       
                }    
       
    }
}

/**
 * Checks if the file type extension is .txt
 * @param  path
 */   
export const isFileTypeTxt = function(path) {
    const fileType = path.substr(path.lastIndexOf('.')).toLowerCase();
    
    if (fileType !== '.txt'){ 
        console.log(invalidFileExt);
        return false;
    } else {
        return true;
    }
}

/**
 * Reads the file based on the file path provided 
 * @param  path
 */   
export const parseReadCommand = function(path) {

    if (!isFileTypeTxt(path)) {
        return [];
    }
    
    try {
        return fs.readFileSync(path, 'utf8').split('\n');
    } catch(err) {
        if (err.code === 'ENOENT') {
            console.log(fileNotFound);
        } else {
            console.log(err);
        }
        return [];
    }
    
}