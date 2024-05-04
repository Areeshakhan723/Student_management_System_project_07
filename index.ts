#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// Function to generate a random 5-digit student ID
function generateRandomNumber() {
  return Math.floor(10000 + Math.random() * 90000);
}

let balances: number[] = [0];

// prompt user for student name
const studentName = await inquirer.prompt([
  {
    name: "name",
    type: "string",
    message: chalk.greenBright("Enter student Name?"),
    validate: function (value) {
      if (value != "") {
        return true;
      } else {
        return chalk.redBright("Please Enter Student Name!");
      }
    },
  },
]);

// prompt user for student Id
const studentId = await inquirer.prompt([
  {
    name: "uniqueId",
    message: chalk.greenBright("uniqueId"),
    default: generateRandomNumber().toString(),
    validate: function (value) {
      const id = parseInt(value);
      return value.length === 5? true: chalk.redBright("Please Enter a  5-digit number");
    },
  },
]);

console.log(chalk.bold.rgb(255, 4, 129).underline(`\n Hello ${studentName.name}! To Our School Management!`));
console.log(chalk.bold.rgb(255, 4, 129).underline(`\n your Student Id is: ${studentId.uniqueId} \n`));

// prompt user for course selection
const courses = await inquirer.prompt([
  {
    name: "course",
    message: chalk.greenBright("PLease select your course, you want to Enroll!"),
    type: "list",
    choices: [
      "Javascript",
      "Python",
      "Typescript",
      "Tailwind CSS",
      "Web Designing",
      "NodeJS",
    ],
  },
]);

// Define course fees
let coursefee: { [key: string]: number } = {
  "Javascript": 1000,
  "Python": 2000,
  "Typescript": 1500,
  "Tailwind CSS": 2000,
  "Web Designing": 3000,
  "NodeJS": 3000,
};

console.log(chalk.bold.rgb(255, 4, 129).underline(`\n Course: ${courses.course}! \n`));
console.log(chalk.bold.rgb(255, 4, 129).underline(`\n Course Fees: ${coursefee[courses.course]}rs \n`));
console.log(chalk.bold.rgb(255, 4, 129).underline(`\n Balance:${balances}rs \n`));

// prompt the user balace
    let userBalance = await inquirer.prompt([
  {
    name: "balance",
    message: chalk.greenBright("Please enter your balance amount:"),
    type: "input",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      } else {
        return chalk.redBright("Please enter a balance amount. Without it, you won't be able to enroll in this course!");
      }
    },
  },
]);

 // the entered balance amount to be a float
const balanceAmount = parseFloat(userBalance.balance);

// Add the entered balance amount to the balances array
balances.push(balanceAmount); 

console.log(chalk.bold.rgb(255, 4, 129).underline(`\n Your current balance: ${balanceAmount}rs \n`));

// prompt user for payment method
let paymentMethods = await inquirer.prompt([
  {
    name: "payment",
    message: chalk.greenBright("select your payment method"),
    type: "list",
    choices: ["Easy paisa", "Jazz cash"],
  },
  {
    name: "amount",
    message: chalk.greenBright("Please Enter Your Course Fees!"),
    type: "input",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      } else {
        return chalk.redBright("please enter a amount!");
      }
    },
  },
]);

let coursefees = coursefee[courses.course];
let paymentAmount = parseFloat(paymentMethods.amount);

// Check if payment amount matches course fees
if (coursefees === paymentAmount) {
    console.log(chalk.blueBright.underline(`\n Congragulation! You Are Successfully Enrolled In ${courses.course} course! \n`));

  let status = await inquirer.prompt([
    {
      name: "view",
      message: chalk.greenBright("what do you want to next?"),
      type: "list",
      choices: ["student_Information", "Exit"],
    },
  ]);

  // view student information
  if (status.view === "student_Information") {console.log(chalk.bold.blueBright.underline("\n *****Student Information***** \n"));
    console.log(chalk.whiteBright("\u2022") + " Student Name: " + studentName.name);
    console.log(chalk.whiteBright("\u2022") + " Student ID: " + studentId.uniqueId);
    console.log(chalk.whiteBright("\u2022") + " Course: " + courses.course);
    console.log(chalk.whiteBright("\u2022") + " Payment Method: " + paymentMethods.payment );
    console.log(chalk.whiteBright("\u2022") + " Payment Amount: " + paymentMethods.amount);

    // Get the last element of the balances array
    let currentBalance = balances[balances.length - 1];
    let updatedBalance = currentBalance -= paymentAmount;
    balances.push(updatedBalance);

    console.log(chalk.whiteBright("\u2022") + " Balance: " + updatedBalance);
  } else if (status.view === "Exit") {
    console.log(chalk.whiteBright(`Good Bye! see you later!`));
  }
} else {
  console.log(chalk.redBright(`\n Invalid amount, please try again`));
};
