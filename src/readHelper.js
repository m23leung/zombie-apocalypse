import fs from 'fs';
import errorMessages from "./constants/errorMessages";

/**
 * Reads the file based on the file path provided 
 * @param  path
 */   
export const parseReadCommand = function(path) {

    if (!isFileTypeTxt(path)) {
        process.exit(0);
    }
    
    try {
        return fs.readFileSync(path, 'utf8').split('\n');
    } catch(err) {
        if (err.code === 'ENOENT') {
            console.log(errorMessages.fileNotFound);
            process.exit(0);
        } else {
            console.log(err);
            process.exit(0);
        }
        return [];
    }
    
}

/**
 * Checks if the file type extension is .txt
 * @param  path
 */   
export const isFileTypeTxt = function(path) {
    const fileType = path.substr(path.lastIndexOf('.')).toLowerCase();
    
    if (fileType !== '.txt'){ 
        console.log(errorMessages.invalidFileExt);
        return false;
    } else {
        return true;
    }
}