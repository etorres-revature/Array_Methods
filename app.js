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

  //console.log(data);

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

  //format number as money
  //https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
  function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

//double eveyone's money
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2}
    });

    updateDOM();
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

//sort users by most money
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

//filter to display only millionaires in DOM
function showMillionaires() {
data = data.filter(user => user.money > 1000000);

updateDOM();
}

//calculate total wealth
function calculateTotalWealth() {
const totalWealth = data.reduce((acc, user) => (acc += user.money), 0);

// console.log(formatMoney(totalWealth));

const totalWealthEl = document.createElement("div");
totalWealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(totalWealth)}</strong></h3>`
mainEl.appendChild(totalWealthEl);
}

//update DOM with new user;
function updateDOM(providedData = data) {
  //clear main div
  mainEl.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(
      item.money
    )}`;
    mainEl.appendChild(element);
  });
}

//even listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateTotalWealth);
