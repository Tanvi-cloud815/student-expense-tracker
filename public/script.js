const API = "/expenses";

async function loadExpenses() {
    const res = await fetch(API);
    const expenses = await res.json();

    const list = document.getElementById("expense-list");
    const totalEl = document.getElementById("total");
    const countEl = document.getElementById("count");

    list.innerHTML = "";

    let total = 0;

    expenses.forEach(expense => {
        total += Number(expense.amount);

        const div = document.createElement("div");
        div.className = "expense";

        div.innerHTML = `
            <div>
                <strong>${expense.title}</strong><br>
                ${expense.category} - ₹${expense.amount}<br>
                📅 ${expense.date || "No Date"}
            </div>

            <button class="delete-btn"
            onclick="deleteExpense(${expense.id})">
            Delete
            </button>
        `;

        list.appendChild(div);
    });

    totalEl.innerText = total;
    countEl.innerText = expenses.length;
}

async function addExpense() {

    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    if(!title || !amount || !date){
        alert("Fill all fields");
        return;
    }

    await fetch(API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            title,
            amount,
            category,
            date
        })
    });

    document.getElementById("title").value="";
    document.getElementById("amount").value="";
    document.getElementById("date").value="";

    loadExpenses();
}

async function deleteExpense(id){

    await fetch(`${API}/${id}`,{
        method:"DELETE"
    });

    loadExpenses();
}

document.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addExpense();
    }
});

loadExpenses();
