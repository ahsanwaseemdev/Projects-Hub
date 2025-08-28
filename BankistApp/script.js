"Use strict";

// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
  <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">Rs.${mov}</div>
        </div>
  `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);
// for (const [i, account] of accounts.entries()) {
//   const accmov = account.movements;
//   const totalBalance = calcPrintBalance(accmov);
//   console.log(totalBalance);
// }
const calcPrintBalance = function (acc) {
  balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  acc.balance = balance;
  labelBalance.textContent = `Rs.${acc.balance}`;
};

const upDateUl = function (acc) {
  //Display Movements
  displayMovements(acc.movements);
  //Display Balance
  calcPrintBalance(acc);
  //Display Summary
  calcDisplaySummary(acc);
};
//Maximum Value
//console.log(account1.movements);
const max = account1.movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, account1.movements[0]);
//Pipeline
const eurToUSD = 1.1;
const totalUsdDeposite = account1.movements
  .filter((mov) => mov < 0)
  .map((mov, i, arr) => {
    return mov * eurToUSD;
  })
  .reduce((acc, mov) => acc + mov, 0);
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov, i, arr) => acc + mov, 0);

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov, i, arr) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}Pkr`;
  labelSumOut.textContent = `${Math.abs(outcomes)}Pkr`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposite) => (deposite * acc.interestRate) / 100)
    .filter((mov, i, arr) => mov >= 1)
    .reduce((acc, curr, i, arr) => {
      return acc + curr;
    }, 0);
  labelSumInterest.textContent = `${interest}Pkr`;
};
//.find Method Gives the first Elemnt of the array which passed the condition and Also Search the array

// const Firstwithdrawal = account1.movements.find((mov) => mov < 0);
// console.log(Firstwithdrawal);
// const account = accounts.find((acc) => acc.owner == "Jessica Davis");
// console.log(account);
////////////////////////////////////////////
//Events Handler lOGIN Feature
let currentAccount = account1;
btnLogin.addEventListener("click", function (e) {
  //prevent form froms submitting
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UL and Message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    upDateUl(currentAccount);
    // Clear Input Fields
    inputLoginUsername.value = "";
    inputLoginPin.value = "";

    // Optionally remove focus from pin field
    inputLoginPin.blur();
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const recieverAcc = accounts.find((acc) => {
    return acc.username == inputTransferTo.value;
  });
  const amount = Number(inputTransferAmount.value);
  console.log(recieverAcc, amount);

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    //Doing Transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
    upDateUl(currentAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value == currentAccount.username &&
    Number(inputClosePin.value) == currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username == currentAccount.username
    );
    // Delete Account
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
    //Clear INPUT Fields
    inputClosePin.value = inputCloseUsername.value = " ";
    inputClosePin.blur();
  } else {
    console.log(`Wrong `);
  }
});
//LOan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);

    upDateUl(currentAccount);
    inputLoanAmount.value = "";
  } else if (
    amount > currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    labelWelcome.textContent;
    const message = `<div
      style="
        
         font-size: 12px;
        color: red;
        font-family: 'Courier New', Courier, monospace;
        text-align: center;
      "
    >
      Amount Greater than 10% of Deposite Amount!
    </div>
      `;
    const loanerror = document.querySelector(".operation--loan");
    loanerror.insertAdjacentHTML("beforeend", message);
  }
});
//Sorting
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/*
//Make All movements into 1 array with flat
const accountMovement = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(accountMovement);

//  Flat Map work with 1 level just
const accountMovement2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(accountMovement2);

//sorting Strings
const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort());
console.log(owners);

//Numbers, Sorting just Good work in Strings
console.log(account1.movements);
console.log(account1.movements.sort());
// Return <0, A,B (Keep Order)
//Return >0 B,A  (Switch Order)
account1.movements.sort((a, b) => {
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
});
console.log(account1.movements);

//Another Method
account2.movements.sort((a, b) => a - b);
console.log(account2.movements);
*/

labelBalance.addEventListener("click", function () {
  const movementsUl = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.replace("Rs.", " "))
  );
  console.log(movementsUl);
});

const bankDeposite = accounts
  .flatMap((acc) => acc.movements)
  .filter((acc) => acc > 0)
  .reduce((ac, curr) => ac + curr, 0);
//console.log(bankDeposite);
//2.
// const numDeposites1000 =
//   accounts.flatMap((acc) => acc.movements).filter((mov) => mov >= 1000).length -
//   1;
// console.log(numDeposites1000);

////////////////////////////////////////////////
const numDeposites1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, curr) => (curr >= 1000 ? count + 1 : count), 0);
//console.log(numDeposites1000);
///////////
const { deposit, withdrawal } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposit += cur) : (sums.withdrawal += cur);
      sums[cur > 0 ? "deposit" : "withdrawal"] += cur;
      return sums;
    },
    { deposit: 0, withdrawal: 0 }
  );
console.log(deposit, withdrawal);
////////////////////////////////////////////////////
//4.
const converTitleCase = function (title) {
  const capitzalize = (str) => str[0].toUpperCase() + str.slice(1);
  const expecptions = [
    "a",
    "an",
    "the",
    "but",
    "or",
    "on",
    "in",
    "with",
    "and",
  ];
  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (expecptions.includes(word) ? word : capitzalize(word)))
    .join(" ");
  return capitzalize(titleCase);
};
console.log(converTitleCase("this is a nice title"));
console.log(converTitleCase("this is a LONG title"));
console.log(converTitleCase("this is another title with an Example"));
