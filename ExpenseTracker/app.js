const addTransaction = document.querySelector('.addTransaction');
const balance = document.querySelector('.balance');
const incomeBox = document.querySelector('.incomeBox');
const expenseBox = document.querySelector('.expenseBox');
const historyBox = document.querySelector('.historyBox');

const showInUi = () => {
    historyBox.innerHTML = ``
    const localInfo = JSON.parse(localStorage.getItem('information'));
    let allAmounts = [];
    let positiveAmounts = 0;
    let negativeAmounts = 0;

    localInfo.forEach(info => {
        allAmounts.push(info.amount);
        if (Math.sign(info.amount) === -1) {
            historyBox.innerHTML += `
            <div class="inHistoryBoxNegative" key="${info.key}">
                <p class="historyPara">${info.text}</p>
                <p class="historyNumber">${info.amount}</p>
                <i class="far fa-trash-alt"></i>
            </div
            `
        }else if (Math.sign(info.amount) === 1) {
            historyBox.innerHTML += `
            <div class="inHistoryBoxPositive" key="${info.key}">
                <p class="historyPara">${info.text}</p>
                <p class="historyNumber">${info.amount}</p>
                <i class="far fa-trash-alt"></i>
            </div
            `
        }
        
    })
    allAmounts.forEach(amount => {
        if (Math.sign(amount) === 1) {
            positiveAmounts += amount
        }
        else if (Math.sign(amount) === -1) {
            negativeAmounts += Math.abs(amount)
        }
    })
    
    incomeBox.innerHTML = `
        <p class="incomeTitle">Income</p>
        <p class="income">$${positiveAmounts}</p>
    `

    expenseBox.innerHTML = `
        <p class="expenseTitle">Expense</p>
        <p class="expense">$${negativeAmounts}</p>
    `

    balance.innerHTML = `
        <p class="balance">$${positiveAmounts - negativeAmounts}</p>
    `
}


addTransaction.addEventListener('submit', (e) => {
    e.preventDefault();

    const textValue = addTransaction.text.value.trim();
    const numberValue = parseInt(addTransaction.negativePositive.value.trim());
    const key = Math.round(Math.random(10000000) * 1000000);

    const localObject = JSON.parse(localStorage.getItem('information'));
    
    const newObject = {text: textValue, amount: numberValue, key: key};

    localObject.push(newObject);

    localStorage.setItem('information', JSON.stringify(localObject))

    showInUi();



    addTransaction.reset();

})

historyBox.addEventListener('click', (e) => {
    if (e.target.classList.contains('far')) {
        const key = e.target.parentElement.getAttribute('key');
        const localObject = JSON.parse(localStorage.getItem('information'));
        const newObject = localObject.filter(object => {
            return object.key != key;
        })

        localStorage.setItem('information', JSON.stringify(newObject));

        showInUi();
    }
})

if (!localStorage.getItem('information')) {
    localStorage.setItem('information', JSON.stringify([]));
}else if (localStorage.getItem('information')) {
    showInUi();
}