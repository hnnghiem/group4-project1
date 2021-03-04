let TransactionController = (() => {                    //this controller handles the calculations 
    total = 0, expenses = 0, income = 0;

    return {
        inputEntry(userInput) {
            if (userInput['transtype'] == 'expense') {
                expenses += parseFloat(userInput['amount']);
                total -= parseFloat(userInput['amount'])
            }
            if (userInput['transtype'] == 'income') {
                income +=parseFloat(userInput['amount']);
                total += parseFloat(userInput['amount'])
            }
        },

        getExpensesData() {return expenses;},
        getIncomeData() {return income;},
        getTotalData() {return total;}
    }
})();

let UIController = (() => {                         //this controller handles the changes need to be made once a new transaction is added and display interactive result to users
    return {                                        //basically does : get the user inputs from the new transaction, set the current time, add the transaction into history, make a chart (if have time)
        getInputTransaction() {
            return {
                date: new Date().toLocaleDateString(),
                desc: document.querySelector("#transaction-desc").value,
                amount: parseFloat(document.querySelector("#transaction-amount").value),
                transtype: document.forms.form1.type.value
            }
        },

        currentMonth() {
            let day, month, year, months;

            day = new Date().getDate();
            month = new Date().getMonth();
            year = new Date().getFullYear();
            months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December' ];
            document.querySelector("#current-month").textContent = day + ' ' + months[month] + ' ' + year.toString();
        },

        displayTransaction(transaction) {
            let transactionHTML;
            if (this.getInputTransaction()['transtype'] == 'expense') {
                transactionHTML = "<tr class='expense-row'><td>" + transaction['date'] + "</td><td>" + transaction['desc'] + "</td><td>" + transaction['amount'] + "</td></tr>";
            }
            if (this.getInputTransaction()['transtype'] == 'income') {
                transactionHTML = "<tr class='income-row'><td>" + transaction['date'] + "</td><td>" + transaction['desc'] + "</td><td>" + transaction['amount'] + "</td></tr>";
            }

            document.querySelector("#history-list").insertAdjacentHTML('afterbegin', transactionHTML);
        },

        updateBalance (total) {
            document.querySelector("#month-balance").textContent = "$ " + total;
        },

        chart (expenses = 0, income = 0) {
            let ctx = document.querySelector("#chart");
            let expenseChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Incomes', 'Expenses'],
                    datasets: [{
                        data: [income, expenses ],
                        backgroundColor: [
                            'rgb(48, 157, 35)',
                            'rgb(224, 33, 30)'
                        ],
                        borderWidth: 0.5
                    }]
                },
                options: {
                    legend: {
                        labels: {
                            fontColor: 'black'
                        }
                    }
                }
            });
        }
}})();

/* The Main Controller of the JS file */
((MainController) => {

    let addTransaction = () => {
        let inputtransaction = UIController.getInputTransaction();

        if (inputtransaction['desc'] !== '' && !isNaN(parseFloat(inputtransaction['amount']))) {
            UIController.displayTransaction(inputtransaction);
            TransactionController.inputEntry(inputtransaction);
            UIController.updateBalance(TransactionController.getTotalData());
            UIController.chart(TransactionController.getExpensesData(),TransactionController.getIncomeData())
        }  
    }

    let init = () => {
        console.log('Initializing...');
        document.querySelector('.btn-submit').addEventListener('click', addTransaction);
        UIController.currentMonth();
    }
    init();
})(UIController, TransactionController);
