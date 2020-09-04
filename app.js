//Random User API
//

//select html elements for JS manipulation
const mainEl = document.querySelector("#main");
const addUserBtn = document.querySelector("#add-user");
const doubleBtn = document.querySelector("#double");
const showMillionairesBtn = document.querySelector("#show-millionaires");
const sortBtn = document.querySelector("#sort");
const calculateWealthBtn = document.querySelector("#calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

//   console.log(data);

const user = data.results[0]

const newUser = {
    name: `${user.name.first} ${user.name.last}`, 
    money: Math.floor(Math.random() * 1000000)
}
console.log(newUser);
}
