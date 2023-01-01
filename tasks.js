
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

const List = [hello, exit, help, quit, batata, list, add, remove, edit, check, uncheck];
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

  if (text.length > 1) {
    console.log(text.trim() + '!')
  }
  else {
    console.log("hello!")
  }
}

/**
 * To Create a list.
 */


const fs = require('fs');
const fileName = process.argv[2] || "database.json";
const fileData = fs.readFileSync(fileName)
let tasks = JSON.parse(fileData);



function list() {
  console.log("Here are your current tasks: \n" +
    '-----------------');
  for (let i = 0; i < tasks.length; i++) {
    console.log(
      ` ${i + 1}. ${tasks[i]}`
    )
  }
  console.log("--------------------------")
  const tasksJson = JSON.stringify(tasks);
  process.on("exit", () => {
    fs.writeFileSync(fileName, tasksJson);
  });

}


/**
 * 
 * to add element into list
 */
function add(text) {
  const taskA = text.substring(4)
  tasks.push(taskA)

  console.log("------------------------ \n" +
    `Added "${taskA}" to the task list. \n` +
    "--------------------------");
}



/**
 * 
 * to remove element from the list 
 */
function remove(taskR) {
  const i = parseInt(taskR.substring(7)) - 1;

  if (i < 0 || i >= tasks.length) {

    console.error(`ERROR: Task ${i + 1} not found! \n` +
      "---------------------------");

  }


  else if (isNaN(i)) {
    tasks.pop(i, 1)
    console.log(`Last task removed! \n` +
      "------------------------")

  }

  else {
    tasks.splice(i, 1)
    console.log(`Task ${i + 1} removed! \n` +
      "------------------------");
  }
}

/**
 *  to edit element from the list  
 */

function edit(text) {

  if (text === 'edit') {
    console.error('ERROR: Choose a task to edit! \n' +
      "---------------------")

  }
  else {
    const parts = text.split(" ");
    const i = parseInt(parts[1]) - 1;

    if (i < 0 || i >= tasks.length) {
      console.error("ERROR: Please enter a valid task number.\n" +
        "---------------------");
    }
    else if (tasks[i] = parts.slice(2).join(" ")) {
      console.log(`Task ${i + 1} edited! \n` +
        '----------------------');
    }

    else {
      tasks[tasks.length - 1] = text.substring(5)
      console.log("last task edited.\n" +
        '------------------------------')
    }
  }
}

/**
 *  to check element from the list. 
 * 
 */
function check(text) {
  const i = parseInt(text.substring(6)) - 1;
  if (text === "check") {
    console.error("Error: You didn't enter the number of task! \n " +
      "-------------------------------");
  }
  else if (i < 0 || i >= tasks.length) {
    console.error("Error: the number entered does not exist \n " +
      "-------------------------------");
  }

  else {
    let tick = "\u2714 "
    tasks[i] = (tick + `${tasks[i]} `);
    console.log(`Task ${i + 1} checked! \n` +
      "-------------------------------");
  }
}
/**
 *  to Uncheck element from the list. 
 * 
 */
function uncheck(text) {
  const i = parseInt(text.substring(8)) - 1;
  if (isNaN(i) || i < 0 || i >= tasks.length) {
    console.error("Error: Please enter a valid task number! \n" +
      "--------------------------");
  } else {
    if (tasks[i].startsWith("\u2714 ")) {
      tasks[i] = tasks[i].substring(2, tasks[i].length);
      console.log(`Task ${i + 1} unchecked! \n` +
        "----------------------");
    } else {
      console.log("This task is already unchecked. \n" + "-----------------------");
    }
  }
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
    "1. help: To list all possible commands. \n" +
    "2. hello: To say hello and if you use it with your name it will greets you with your name (ex: (hello 'x') will return 'hello x!')\n" +
    "3. quit or exit: To quit or exit the application.\n" +
    "4. list: To show table list. \n" +
    "5. add :  To add elements into the list. \n" +
    "6. remove: To remove elements from the list.\n" +
    "7. edit :  To edit elements in the list. \n" +
    "8. check : Check the task  \n" +
    "9. uncheck:  Uncheck the task   \n" +
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