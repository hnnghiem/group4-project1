let ExpenseController = (() => {                    //this controller handles the calculations 
    total = 0, expenses = 0;

    return {
        inputEntry(userInput) {
            expenses += parseFloat(userInput);
            total -= parseFloat(userInput)
        },

        getExpensesData() {return expenses;},
        getTotalData() {return total;}
    }
})();

let UIController = (() => {                         //this controller handles the changes need to be made once a new transaction is added and display interactive result to users
    return {                                        //basically does : get the user inputs from the new transaction, set the current time, add the transaction into history, make a chart (if have time)
        getInputTransaction() {
            return {
                date: new Date().toLocaleDateString(),
                desc: document.querySelector("#transaction-desc").value,
                amount: parseFloat(document.querySelector("#transaction-amount").value)
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
            transactionHTML = "<tr><td>" + transaction['date'] + "</td><td>" + transaction['desc'] + "</td><td>" + transaction['amount'] + "</td></tr>";

            document.querySelector("#history-list").insertAdjacentHTML('beforeend', transactionHTML);
        },

        updateBalance (total) {
            document.querySelector("#month-balance").textContent = "$ " + total;
        }
}})();

/* The Main Controller of the JS file */
((MainController) => {

    let setupEventListeners = () => {
        document.querySelector('.btn-submit').addEventListener('click', addTransaction)
    };
    let addTransaction = () => {
        let inputtransaction = UIController.getInputTransaction();

        if (inputtransaction['desc'] !== '' && !isNaN(parseFloat(inputtransaction['amount']))) {
            UIController.displayTransaction(inputtransaction);
            ExpenseController.inputEntry(parseFloat(inputtransaction['amount']));
            UIController.updateBalance(ExpenseController.getTotalData());
        }  
    }

    let init = () => {
        console.log('Initializing...')
        setupEventListeners(); 
        UIController.currentMonth();
    }

    init();
})(UIController, ExpenseController);
