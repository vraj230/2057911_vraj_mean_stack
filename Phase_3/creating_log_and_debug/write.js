const { debug } = require("console");
let fs = require("fs");
let readline = require("readline-sync");


let first = readline.question("Enter your first name: ");
let last = readline.question("Enter your last name: ");
debugger;
let gen = readline.question("Enter your gender: ");
let id = readline.questionEMail("Enter your email-id: ");
debugger;
let people = JSON.parse(fs.readFileSync("person.json").toString());

let person = {first_name: first, last_name: last, gender: gen, email: id};
person["time"] = Date.now();
debugger;
people.push(person);

fs.writeFileSync("person.json", JSON.stringify(people));
debugger;
console.log("log records updates")

