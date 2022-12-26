
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */

const List = [hello, exit, help, quit, batata,];
function onDataReceived(text) {
  text = text.trim();

  List.forEach(function (input) {
    if (text.startsWith(input.name)) {
      input(text);
    }
  });
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"')
}

/**
 * Says hello
 *
 * @returns {void}
 */

function batata() {
  console.log(
    "--------------------\n" +
    "batata!\n" +
    "-----------------------")
}


function hello(text) {
  console.log(
    "--------------------\n" +
    `Hello${text.substring(5)}! \n` +
    "-----------------------"
  );
}


/**
 *  Showing the all the possible commands
 * 
 *  @returns {void}
 */
function help() {

  console.log(
    "Commands You Can Use!:\n\n" +
    "--------------------\n" +
    " help. \n" +
    " hello.\n" +
    " quit or exit.\n" +
    "-------------------------"
  );
}


/**
 * Exits the application
 *
 * @returns {void}
 */

function quit() {
  console.log('Quitting now, goodbye!')
  process.exit();
}

function exit() {
  console.log('quitting now, goodbye!')
  process.exit();
}






// The following line starts the application
startApp("Mgo Yeghiaian")
