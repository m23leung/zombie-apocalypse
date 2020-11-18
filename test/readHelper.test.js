/****************************************************
* Purpose: Contains test functions for readHelper
*****************************************************/

import { expect } from 'chai';
import { isFileTypeTxt, parseReadCommand } from '../src/readHelper'; 

describe("readHelper - Read command", function() {
    
    let paths = ["testfiles/example.txt", "testfiles/example2.txt"]

    paths.map( (path) => {

        it(`readHelper - isFileTypeTxt - ${path}`, function() {
            let isTrue = isFileTypeTxt(path);
            expect(isTrue).to.be.equal(true);
        })  

        it(`readHelper - parseReadCommand ${path}`, function() {
            const parseInput = parseReadCommand(path);
            expect(parseInput.length).to.be.equal(4);
        })  
    }) 
    
    paths = [ "testfiles/doesNotExist.poko"]
    paths.map( (path) => {
        it(`readHelper - isFileTypeTxt - ${path}`, function() {
            let isFalse = isFileTypeTxt(path);
            expect(isFalse).to.be.equal(false);
        }) 
    })
});