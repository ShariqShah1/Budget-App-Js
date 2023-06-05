let monthlyBgt = 0;
let expenses = [];

const bgtInp = document.getElementById("bgt-input");
const addbgtbtn = document.getElementById("add-bgt-btn");
const descInp = document.getElementById("description-input");
const amtInp = document.getElementById("amount-input");
const dateInp = document.getElementById("date-input");
const addExpBtn = document.getElementById("add-expense-btn");
const expenseTableBody = document.getElementById("expense-table-body");
const remainingBgt = document.getElementById("remaining-bgt");

addbgtbtn.addEventListener("click", addBgt);
addExpBtn.addEventListener("click", addExpense);

function addBgt() {
  const budget = parseFloat(bgtInp.value);
  if (!isNaN(budget) && budget > 0) {
    monthlyBgt = budget;
    updateRemainingBgt();
  } else {
    alert("Please enter a valid monthly budget.");
  }
  bgtInp.value = "";
}

function addExpense() {
  const description = descInp.value.trim();
  const amount = parseFloat(amtInp.value);
  const date = dateInp.value;

  if (description === "" || isNaN(amount) || amount <= 0 || date === "") {
    alert("Please enter valid expense details.");
    return;
  }

  const expense = {
    description,
    amount,
    date,
  };

  expenses.push(expense);
  updateExpenseTable();
  updateRemainingBgt();

  descInp.value = "";
  amtInp.value = "";
  dateInp.value = "";
}

function updateExpenseTable() {
  expenseTableBody.innerHTML = "";
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const row = document.createElement("tr");
    const descCel = document.createElement("td");
    const amtCel = document.createElement("td");
    const dateCel = document.createElement("td");
    descCel.textContent = expense.description;
    amtCel.textContent = expense.amount;
    dateCel.textContent = expense.date;
    row.appendChild(descCel);
    row.appendChild(amtCel);
    row.appendChild(dateCel);
    expenseTableBody.appendChild(row);
  }
}

function updateRemainingBgt() {
  const totesExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const remainingBudget = monthlyBgt - totesExpense;
  remainingBgt.textContent = `Remaining Budget: $${remainingBudget.toFixed(2)}`;
}
