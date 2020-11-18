/****************************************************
* Purpose: Stores the validation error messages
*****************************************************/

let errorMessages = {
    invalidPlacement: "You cannot place me outside the world",
    invalidDirection: "That is an invalid direction",
    notNumber: "Input is not a number",
    invalidCoordinates: "Invalid Coordinates ",
    invalidFileExt: "Can only read text files",
    invalidArguments: "Invalid arguments",
    fileNotFound: "Cannot find file"
};

export default Object.freeze(errorMessages);